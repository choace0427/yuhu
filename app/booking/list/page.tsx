"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { supabase } from "@/supabase";
import { Divider, Image, Loader } from "@mantine/core";
import {
  IconMessage,
  IconCalendar,
  IconMoneybag,
  IconTarget,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingList() {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  // const { therapistId, setTherapistId } = useTherapistContext();
  const [type, setType] = useState("all");

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
      if (type === "all") {
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
          setAllData(data);
        }
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
          .eq("booking_status", type)
          .eq("customer_id", userInfo?.id);
        if (error) {
          console.error("Error fetching bookings:", error);
        } else {
          setBookingList(data);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [type, userInfo]);

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
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col w-full items-center bg-[#46A7B0] py-10">
        <div className="flex flex-row max-w-7xl w-full items-center justify-between">
          <div
            className={`w-[400px] h-[210px] ${
              type === "upcoming" && "border-[#60E2EE] border-[4px]"
            }  flex flex-row rounded-md bg-[#FFFFFF] p-4`}
            onClick={() => setType("upcoming")}
          >
            <div className="flex flex-col gap-2">
              <span className="text-black Poppins-font text-2xl font-bold">
                Upcoming
              </span>
              <span className="text-black Poppins-font text-sm">
                You have{" "}
                {
                  allData.filter(
                    (item: any) => item.booking_status === "upcoming"
                  ).length
                }{" "}
                upcoming massage sessions
              </span>
              <span className="Poppins-font text-[#60E2EE] text-3xl">
                {
                  allData.filter(
                    (item: any) => item.booking_status === "upcoming"
                  ).length
                }
              </span>
            </div>
            <Image
              src="/img/booking_pending.png"
              alt="signup"
              width={178}
              height={178}
            />
          </div>
          <div
            className={`w-[400px] h-[210px] ${
              type === "accept" && "border-[#60E2EE] border-[4px]"
            }  flex flex-row rounded-md bg-[#FFFFFF] p-4`}
            onClick={() => setType("accept")}
          >
            <div className="flex flex-col gap-2">
              <span className="text-black Poppins-font text-2xl font-bold">
                Accepted
              </span>
              <span className="text-black Poppins-font text-sm">
                You have{" "}
                {
                  allData.filter(
                    (item: any) => item.booking_status === "accept"
                  ).length
                }{" "}
                past massage sessions
              </span>
              <span className="Poppins-font text-[#60E2EE] text-3xl">
                {
                  allData.filter(
                    (item: any) => item.booking_status === "accept"
                  ).length
                }
              </span>
            </div>
            <Image
              src="/img/booking_past.png"
              alt="signup"
              width={178}
              height={178}
            />
          </div>
          <div
            className={`w-[400px] h-[210px] ${
              type === "cancelled" && "border-[#60E2EE] border-[4px]"
            }  flex flex-row rounded-md bg-[#FFFFFF] p-4`}
            onClick={() => setType("cancelled")}
          >
            <div className="flex flex-col gap-2">
              <span className="text-black Poppins-font text-2xl font-bold">
                Cancelled
              </span>
              <span className="text-black Poppins-font text-sm">
                You have{" "}
                {
                  allData.filter(
                    (item: any) => item.booking_status === "cancelled"
                  ).length
                }{" "}
                cancelled massage sessions
              </span>
              <span className="Poppins-font text-[#60E2EE] text-3xl">
                {
                  allData.filter(
                    (item: any) => item.booking_status === "cancelled"
                  ).length
                }
              </span>
            </div>
            <Image
              className="w-[178px] h-[150px] items-center"
              src="/img/booking_cancel.png"
              alt="signup"
              width={178}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#777777]/10 w-full py-10">
        <BookingTable
          data={type === "all" ? allData : bookingList}
          handleCancel={handleCancel}
          handleChat={handleChat}
        />
      </div>
    </div>
  );
}

const BookingTable = (props: any) => {
  const { data, loading, handleCancel, handleChat } = props;

  return (
    <div className="rounded-sm px-3 py-2 bg-white max-w-7xl max-h-[600px] w-full mx-auto overflow-y-auto">
      {loading ? (
        <div className="w-full flex justify-center py-10 items-center">
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        data.map((item: any, key: number) => {
          return (
            <div
              key={key}
              className="bg-[#F0F8F9] mt-2 py-3 px-3 flex gap-4 justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <IconUser color="#46A7B0" size={"1.2rem"} />
                <p className="text-[#777777]">
                  Practitioner:{" "}
                  <span className="font-semibold text-black">
                    {item?.users?.name}
                  </span>
                </p>
              </div>
              <Divider orientation="vertical" className="h-6" />
              <div className="flex gap-2 items-center">
                <IconCalendar size={"1.2rem"} color="#46A7B0" />
                <p className="text-[#777777]">
                  Booked On:{" "}
                  <span className="font-semibold text-black">
                    {item?.booking_date}
                  </span>
                </p>
              </div>
              <Divider orientation="vertical" className="h-6" />
              <div className="flex gap-2 items-center">
                <IconTarget size={"1.2rem"} color="#46A7B0" />
                <p className="text-[#777777]">
                  Status:{" "}
                  <span className={`font-semibold text-[#46A7B0]`}>
                    {"Active"}
                  </span>
                </p>
              </div>
              <Divider orientation="vertical" className="h-6" />
              <div className="flex gap-2 items-center">
                <IconMoneybag size={"1.2rem"} color="#46A7B0" />
                <p className="text-[#777777]">
                  Total Amount:{" "}
                  <span className="font-semibold text-black">
                    ${item?.users?.hourly_rate || "XXX"}
                  </span>
                </p>
              </div>
              {item?.booking_status === "cancelled" && (
                <p className="font-semibold text-red-400">Booking Cancelled</p>
              )}
              {item?.booking_status === "upcoming" ? (
                <button
                  className="bg-[#46A7B0] text-white flex gap-1 items-center px-2 py-1 rounded"
                  onClick={() => handleCancel(item.booking_id)}
                >
                  <IconX color="white" size={"1rem"} />
                  Cancel Booking
                </button>
              ) : item.booking_status === "accept" ? (
                <button
                  className="bg-[#46A7B0] text-white flex gap-1 items-center px-2 py-1 rounded"
                  onClick={() => handleChat(item?.therapist_id)}
                >
                  <IconMessage size={"1rem"} color="white" />
                  Chat
                </button>
              ) : null}
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 py-10">No Booking Data</p>
      )}
    </div>
  );
};
