"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import dayjs from "dayjs";
import {
  IconBell,
  IconCalendarEvent,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Group,
  Paper,
  rem,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";

export default function NotifcationsPage() {
  const { userInfo } = useAuthStore();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [othersNotifications, setOthersNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [tabs, setTabs] = useState("booking");

  const getBookingNotications = async () => {
    setLoading(true);
    if (userInfo) {
      try {
        const { data: bookingNotificationData, error } = await supabase.rpc(
          "get_new_notifications",
          {
            input_therapist_id: userInfo?.id,
            input_role: userInfo?.role,
          }
        );
        if (error) {
          console.error("Error fetching chat members:", error);
        } else {
          setNotifications(bookingNotificationData);
        }
      } catch (err) {
        console.error("Error executing RPC:", err);
      }
      setLoading(false);
    }
  };

  const getOtherNotifications = async () => {
    setLoading(true);
    if (userInfo) {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("receiver_id", userInfo?.id)
          .eq("status", "");
        if (error) {
          console.error("Error fetching chat members:", error);
        } else {
          setOthersNotifications(data);
        }
      } catch (err) {
        console.error("Error executing RPC:", err);
      }
      setLoading(false);
    }
  };

  const handleAccept = async (booking_id: any) => {
    try {
      const { data, error } = await supabase
        .from("booking_list")
        .update({ booking_status: "accept" })
        .eq("booking_id", booking_id)
        .select();

      if (error) {
        console.error("Error updating booking:", error);
      } else {
        setNotifications(data);
        toast.success("You accepted the booking!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleDecline = async (booking_id: any, customer_id: any) => {
    try {
      const { data, error } = await supabase
        .from("booking_list")
        .update({ booking_status: "cancelled" })
        .eq("booking_id", booking_id)
        .select();

      if (error) {
        console.error("Error updating booking:", error);
      } else {
        const { data: transactionData, error: transactionError } =
          await supabase
            .from("transaction_list")
            .select()
            .eq("booking_id", booking_id);

        if (transactionError) {
          console.error("Error fetching bookings:", transactionError);
        } else {
          const response = await fetch("/api/refund-create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntent: transactionData[0].transaction_id,
            }),
          });

          const { refund } = await response.json();

          const { error: insertTransactionError } = await supabase
            .from("transaction_list")
            .insert({
              transaction_id: refund?.id,
              customer_id: customer_id,
              therapist_id: userInfo?.id,
              status: "refunded",
              booking_id: booking_id,
            });

          if (insertTransactionError) {
            throw new Error("Failed to save transaction to the database");
          }
          console.log("Booking declined successfully:", data);
          toast.success("You declined the booking!");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleRemoveOtherNotifications = async (id: any) => {
    const { error } = await supabase
      .from("notifications")
      .update({ status: "delete" })
      .eq("notification_id", id)
      .select();
    if (error) {
      console.log("error", error);
      return;
    }
  };

  useEffect(() => {
    if (tabs === "booking") getBookingNotications();
    if (tabs === "others") getOtherNotifications();
  }, [userInfo, tabs]);

  useEffect(() => {
    if (userInfo) {
      const notificationRealtime = supabase
        .channel("notifications-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "booking_list",
            filter: `therapist_id=eq.${userInfo?.id}`,
          },

          getBookingNotications
        )
        .subscribe();

      const othersnotificationsRealtime = supabase
        .channel("othernotifications-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `receiver_id=eq.${userInfo?.id}`,
          },
          getOtherNotifications
        )
        .subscribe();

      return () => {
        notificationRealtime.unsubscribe();
        othersnotificationsRealtime.unsubscribe();
      };
    }
  }, [userInfo, tabs]);

  return (
    <AppShell>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Tabs
          color="teal"
          defaultValue="booking"
          onChange={(value: any) => setTabs(value)}
        >
          <Tabs.List>
            <Tabs.Tab
              value="booking"
              leftSection={<IconCalendarEvent style={{ width: rem(16) }} />}
            >
              Booking
            </Tabs.Tab>
            <Tabs.Tab
              value="others"
              color="blue"
              leftSection={<IconBell style={{ width: rem(16) }} />}
            >
              Notifications
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="booking" pt="xs">
            <Stack mt="xl">
              <Title order={2} mb="md">
                Active Bookings
              </Title>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Paper withBorder p="md" radius="md">
                    <Group justify="space-between" align="center">
                      <Group gap="sm">
                        <Skeleton circle height={40} />
                        <Box>
                          <Skeleton height={16} width={120} mb={6} />
                          <Skeleton height={12} width={80} />
                        </Box>
                      </Group>
                      <Group gap="xs">
                        <Skeleton circle height={24} />
                        <Skeleton circle height={24} />
                      </Group>
                    </Group>
                  </Paper>
                ))
              ) : notifications.length > 0 ? (
                notifications.map((item: any, index) => (
                  <Paper key={index} shadow="xs" p="md" withBorder>
                    <Group justify="space-between">
                      <Group>
                        <Avatar
                          size={"lg"}
                          radius={"xl"}
                          src={item?.avatar}
                          name={item?.name}
                        />
                        <div>
                          <Title order={4}>{item?.name}</Title>
                          <Text size="sm" c="dimmed">
                            {item?.booking_date
                              ? new Date(
                                  item?.booking_date
                                ).toLocaleDateString()
                              : "Date not available"}
                          </Text>
                        </div>
                      </Group>
                      <Group>
                        <ActionIcon
                          variant="light"
                          color="green"
                          size="lg"
                          aria-label="Accept"
                          onClick={() => handleAccept(item?.booking_id)}
                        >
                          <IconCheck style={{ width: rem(20) }} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="lg"
                          aria-label="Decline"
                          onClick={() =>
                            handleDecline(item?.booking_id, item?.customer_id)
                          }
                        >
                          <IconX style={{ width: rem(20) }} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Paper>
                ))
              ) : (
                <div className="text-center min-h-[400px] flex items-center justify-center text-black">
                  No New Booking
                </div>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="others" pt="xs">
            <Stack mt="xl">
              <Title order={2} mb="md">
                Recent Notifications
              </Title>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Paper key={index} withBorder p="md" radius="md">
                    <Stack gap="xs">
                      <Skeleton height={16} width="70%" />
                      <Skeleton height={12} width={100} />
                    </Stack>
                  </Paper>
                ))
              ) : othersNotifications.length > 0 ? (
                othersNotifications.map((item: any, index) => (
                  <Paper key={index} shadow="xs" p="md" withBorder>
                    <Text size="sm" mb={4}>
                      {item?.content}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {dayjs(item?.created_at).format("YYYY-MM-DD HH:MM A")}
                    </Text>
                    {/* onClick={() =>
                            handleRemoveOtherNotifications(item.notification_id)
                          } */}
                  </Paper>
                ))
              ) : (
                <div className="text-center min-h-[400px] flex items-center justify-center text-black">
                  No New Notifications
                </div>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </div>
    </AppShell>
  );
}
