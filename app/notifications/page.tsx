"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import dayjs from "dayjs";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ActionIcon, Card, Divider, Flex, Loader, Tabs } from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";

export default function NotifcationsPage() {
  const { userInfo } = useAuthStore();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [othersNotifications, setOthersNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [tabs, setTabs] = useState("booking");

  const getNewNotications = async () => {
    setLoading(true);
    if (userInfo) {
      try {
        const { data: therapist_list, error } = await supabase.rpc(
          "get_new_notifications",
          {
            input_therapist_id: userInfo.id,
          }
        );

        if (error) {
          console.error("Error fetching chat members:", error);
        } else {
          setNotifications(therapist_list);
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

  const handleDecline = async (booking_id: any) => {
    try {
      const { data, error } = await supabase
        .from("booking_list")
        .update({ booking_status: "cancelled" })
        .eq("booking_id", booking_id)
        .select();

      if (error) {
        console.error("Error updating booking:", error);
      } else {
        console.log("Booking declined successfully:", data);
        toast.success("You declined the booking!");
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
    if (tabs === "booking") getNewNotications();
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
          (payload) => {
            console.log("Database change detected:", payload);
            getNewNotications();
          }
        )
        .subscribe();

      return () => {
        notificationRealtime.unsubscribe();
      };
    }
  }, [userInfo, tabs]);

  useEffect(() => {
    const othersnotificationsRealtime = supabase
      .channel("notifications-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `receiver_id=eq.${userInfo?.id}`,
        },
        (payload) => {
          console.log("Database change detected:", payload);
          getOtherNotifications();
        }
      )
      .subscribe();

    return () => {
      othersnotificationsRealtime.unsubscribe();
    };
  }, []);

  return (
    <div className="px-20 py-16 w-full max-w-[1000px] mx-auto min-h-[400px]">
      <Tabs
        color="teal"
        defaultValue="booking"
        onChange={(value: any) => setTabs(value)}
        styles={{
          list: {
            width: "fit-content",
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="booking">Booking</Tabs.Tab>
          <Tabs.Tab value="others" color="blue">
            Others
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="booking" pt="xs">
          <Flex direction={"column"} gap={"md"}>
            {notifications.length > 0 ? (
              notifications.map((item: any, index) => (
                <Card shadow="md" radius={"sm"} p={"md"} w={"100%"} key={index}>
                  <Flex align={"center"} justify={"space-between"}>
                    <div className="flex items-center gap-4">
                      <img
                        src={item?.avatar || "/placeholder-avatar.png"}
                        alt={item?.name || "Unknown name"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold">Booking Invitation</div>
                        <div className="">{item?.name || "Unknown"}</div>
                        <div className="text-sm">
                          {item?.booking_date
                            ? new Date(item?.booking_date).toLocaleDateString()
                            : "Date not available"}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ActionIcon
                        variant="outline"
                        radius={"xl"}
                        className="!text-[#46A7B0] border-[#46A7B0]"
                        onClick={() => handleAccept(item?.booking_id)}
                      >
                        <IconCheck size={"1rem"} color="#46A7B0" />
                      </ActionIcon>
                      <ActionIcon
                        variant="outline"
                        radius={"xl"}
                        color="red"
                        onClick={() => handleDecline(item?.booking_id)}
                      >
                        <IconX size={"1rem"} />
                      </ActionIcon>
                    </div>
                  </Flex>
                </Card>
              ))
            ) : (
              <div className="text-center min-h-[400px] flex items-center justify-center text-black">
                No New Booking
              </div>
            )}
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="others" pt="xs">
          {othersNotifications.length > 0 ? (
            othersNotifications.map((item: any, index) => (
              <div key={index} className="ml-4 mt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[16px] font-semibold flex items-center">
                      New Notications:{" "}
                      <span className="text-[#46A7B0] text-[20px] ml-2">
                        {item?.content}
                      </span>
                    </p>
                    <span className=" text-[12px]">
                      {dayjs(item?.created_at).format("YYYY-MM-DD HH:MM A")}
                    </span>
                  </div>
                  <IconX
                    size={"1.4rem"}
                    color="black"
                    className="hover:cursor-pointer mt-2"
                    onClick={() =>
                      handleRemoveOtherNotifications(item.notification_id)
                    }
                  />
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <div className="text-center min-h-[400px] flex items-center justify-center text-black">
              No New Notifications
            </div>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
