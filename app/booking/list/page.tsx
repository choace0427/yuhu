"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { supabase } from "@/supabase";
import {
  Card,
  Divider,
  Title,
  Image,
  Loader,
  Flex,
  Stack,
  Text,
  Paper,
  Group,
  Badge,
  Button,
  Container,
  Avatar,
  Box,
} from "@mantine/core";
import {
  IconMessage,
  IconCalendar,
  IconMoneybag,
  IconTarget,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingList() {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  // const { therapistId, setTherapistId } = useTherapistContext();
  const [type, setType] = useState("upcoming");

  const [bookingList, setBookingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);

  const handleCancel = async (booking_id: string) => {
    const { data, error } = await supabase
      .from("booking_list")
      .update({ booking_status: "cancelled" })
      .eq("booking_id", booking_id)
      .select();
    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      const { data, error } = await supabase
        .from("booking_list")
        .select(
          `
             *,
              users (
                *
              )
            `
        )
        .eq("customer_id", userInfo.id);
      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        setAllData(data);
      }
    }
  };

  const handleChat = async (therapist_id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("room")
      .select("*")
      .eq("therapist_id", therapist_id)
      .eq("customer_id", userInfo.id)
      .single();

    if (error || !data) {
      const { data: newRoom, error: insertError } = await supabase
        .from("room")
        .insert([
          {
            therapist_id: therapist_id,
            customer_id: userInfo.id,
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(insertError.message);
      } else {
        setLoading(false);
        router.push(`/chat/${newRoom.rooms_id}`);
      }
    } else {
      setLoading(false);
      router.push(`/chat/${data.rooms_id}`);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    if (userInfo && userInfo.id) {
      const { data, error } = await supabase
        .from("booking_list")
        .select(
          `
           *,
            users (
              *
            )
          `
        )
        .eq("customer_id", userInfo?.id);
      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        setBookingList(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [userInfo]);

  useEffect(() => {
    const bookingListRealtime = supabase
      .channel("booking_list-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "booking_list",
          filter: `customer_id=eq.${userInfo?.id}`,
        },
        (payload) => {
          console.log("Database change detected:", payload);
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      bookingListRealtime.unsubscribe();
    };
  }, [userInfo?.id]);

  return (
    <Container size="xl" py="xl" my={"lg"}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          shadow="sm"
          padding="xl"
          radius="md"
          withBorder
          onClick={() => setType("upcoming")}
          className={`${type === "upcoming" && "!border-teal-700"}`}
        >
          <Flex>
            <Stack gap="xs">
              <Title order={3}>Upcoming</Title>
              <Text size="sm" c="dimmed">
                You have{" "}
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "upcoming"
                  ).length
                }{" "}
                upcoming massage sessions
              </Text>
              <Text size="48px" fw={700} className="text-teal-500">
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "upcoming"
                  ).length
                }
              </Text>
            </Stack>
            <Image
              src="/img/booking_pending.png"
              alt="signup"
              className="!w-[140px] !h-[140px]"
            />
          </Flex>
        </Card>

        <Card
          shadow="sm"
          padding="xl"
          radius="md"
          withBorder
          onClick={() => setType("accept")}
          className={`${type === "accept" && "!border-teal-700"}`}
        >
          <Flex>
            <Stack gap="xs">
              <Title order={3}>Accepted</Title>
              <Text size="sm" c="dimmed">
                You have{" "}
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "accept"
                  ).length
                }{" "}
                past massage sessions
              </Text>
              <Text size="48px" fw={700} className="text-teal-500">
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "accept"
                  ).length
                }
              </Text>
            </Stack>
            <Image
              src="/img/booking_past.png"
              alt="signup"
              className="!w-[140px] !h-[140px]"
            />
          </Flex>
        </Card>

        <Card
          shadow="sm"
          padding="xl"
          radius="md"
          withBorder
          onClick={() => setType("cancelled")}
          className={`${type === "cancelled" && "!border-teal-700"}`}
        >
          <Flex>
            <Stack gap="xs">
              <Title order={3}>Cancelled</Title>
              <Text size="sm" c="dimmed">
                You have{" "}
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "cancelled"
                  ).length
                }{" "}
                cancelled massage sessions
              </Text>
              <Text size="48px" fw={700} className="text-teal-500">
                {
                  bookingList.filter(
                    (item: any) => item.booking_status === "cancelled"
                  ).length
                }
              </Text>
            </Stack>
            <Image
              src="/img/booking_cancel.png"
              className="!w-[140px] !h-[140px]"
              alt="signup"
            />
          </Flex>
        </Card>
      </div>
      {loading ? (
        <Paper withBorder p={"sm"} shadow="md">
          <Flex justify={"center"} w={"100%"}>
            <Loader size={"sm"} color="teal" my={"xl"} mx={"auto"} />
          </Flex>
        </Paper>
      ) : bookingList &&
        bookingList?.length > 0 &&
        bookingList.filter((item: any) => item.booking_status === type).length >
          0 ? (
        bookingList
          .filter((item: any) => item.booking_status === type)
          .map((item, index) => {
            return (
              <Paper shadow="sm" radius="md" p="md" withBorder key={index}>
                <Group gap="apart" align="center" justify="space-between">
                  <Group gap="xl">
                    <Group gap="xs">
                      <Avatar
                        src={item?.users?.avatar_url}
                        name={item?.users?.name}
                        size={"lg"}
                      />
                      <Stack gap={4}>
                        <Text size="md" fw={500}>
                          {item?.users?.name}
                        </Text>
                        <Badge color="teal" variant="light" radius="sm">
                          Active
                        </Badge>
                      </Stack>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500} c="dimmed">
                        Booking Message:
                      </Text>
                      <Text size="sm">
                        {item?.booking_message?.length > 35
                          ? `${item.booking_message.slice(0, 35)}...`
                          : item?.booking_message}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500} c="dimmed">
                        Booked On:
                      </Text>
                      <Text size="sm">
                        {dayjs(item?.booking_date).format("YYYY-MM-DD")}
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <Text size="sm" fw={500} c="dimmed">
                        Therapist Hourly Rate:
                      </Text>
                      <Text size="sm">
                        $ {item?.users?.hourly_rate || 100} / hr
                      </Text>
                    </Group>
                  </Group>
                  {item?.booking_status === "cancelled" && (
                    <p className="font-semibold text-red-400">
                      Booking Cancelled
                    </p>
                  )}
                  {item?.booking_status === "upcoming" ? (
                    <Button
                      color="red"
                      variant="light"
                      radius={"md"}
                      onClick={() => handleCancel(item.booking_id)}
                    >
                      Cancel Booking
                    </Button>
                  ) : item.booking_status === "accept" ? (
                    <Button
                      variant="light"
                      color="teal"
                      leftSection={<IconMessage size={16} />}
                      radius="md"
                      onClick={() => handleChat(item?.therapist_id)}
                    >
                      Chat
                    </Button>
                  ) : null}
                </Group>
              </Paper>
            );
          })
      ) : (
        <Paper withBorder p={"sm"} shadow="md">
          <Text my={"xl"} ta="center">
            No data
          </Text>
        </Paper>
      )}
    </Container>
  );
}
