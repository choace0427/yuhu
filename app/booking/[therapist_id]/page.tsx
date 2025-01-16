"use client";

import { supabase } from "@/supabase";
import { range, useDisclosure } from "@mantine/hooks";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Flex,
  LoadingOverlay,
  Modal,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useAuthStore } from "@/app/_store/authStore";

export default function BookingPage(params: any) {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [therapistId, setTherapistId] = useState(params.params.therapist_id);

  console.log("========", therapistId);

  const CalendarComponent = () => {
    const [value, setValue] = useState<Date | null>(null);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    let [selectedTimeRanges, setSelectedTimeRanges] = useState<any[]>([]);
    let [showTimeRanges, setShowTimeRanges] = useState(false);
    let [isSubmitting, setIsSubmitting] = useState(false);
    const [newBooking, setNewBooking] = useState("");

    const [bookingData, setBookingData] = useState<any>(null);
    const [myselectedTimeRanges, setMySelectedTimeRanges] = useState([]);

    const [opened, { open, close }] = useDisclosure(false);

    const timeRanges = Array.from({ length: 24 }, (_, index) => ({
      label: `${index.toString().padStart(2, "0")} ~ ${(index + 1)
        .toString()
        .padStart(2, "0")}`,
      value: index,
    }));

    const handleTimeRangeClick = (range: any) => {
      setMySelectedTimeRanges((prev: any) =>
        prev.includes(range)
          ? prev.filter((r: any) => r !== range)
          : [...prev, range]
      );
    };

    const handleChangeDate = async (date: any) => {
      setValue(date);
      setLoading(true);

      try {
        const { data: bookingData, error } = await supabase
          .from("booking_list")
          .select("*")
          .eq("therapist_id", therapistId)
          .eq("b_date->>date", dayjs(date).format("YYYY-MM-DD"));

        if (error) throw new Error(error.message);

        if (!bookingData || bookingData.length === 0) {
          setShowTimeRanges(false);
          setSelectedTimeRanges([]);
          setMessage("");
          setNewBooking("");
          setBookingData(null);
          setMySelectedTimeRanges([]);
          setLoading(false);
        }

        const nb_data = bookingData.find(
          (data: any) => data.customer_id === userInfo?.id
        );
        const oth_data = bookingData.filter(
          (data: any) => data.customer_id !== userInfo?.id
        );

        const joinedRanges = oth_data.flatMap((data: any) => data.b_date.range);
        setSelectedTimeRanges(joinedRanges);

        if (nb_data) {
          setMessage(nb_data.booking_message);
          setMySelectedTimeRanges(nb_data.b_date.range);
          setNewBooking(nb_data.booking_id);
        } else {
          setMessage("");
          setMySelectedTimeRanges([]);
          setNewBooking("");
        }

        setShowTimeRanges(true);
      } catch (error) {
        console.log("Error:", error);
        setShowTimeRanges(false);
        setSelectedTimeRanges([]);
        setMessage("");
        setNewBooking("");
        setBookingData(null);
        setMySelectedTimeRanges([]);
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = async (newBooking: any) => {
      if (!value || myselectedTimeRanges.length === 0) {
        toast.error("Please select a date and at least one time range.");
        return;
      }

      const { data, error } = await supabase
        .from("booking_list")
        .select("*")
        .eq("therapist_id", therapistId)
        .eq("customer_id", userInfo?.id)
        .eq("b_date->>date", dayjs(value).format("YYYY-MM-DD"));

      if (error) {
        console.log("errro", error);
        return;
      }

      if (data && data.length > 0) {
        try {
          const { data, error } = await supabase
            .from("booking_list")
            .update({
              booking_message: message,
              booking_status: "upcoming",
              b_date: {
                date: dayjs(value).format("YYYY-MM-DD"),
                range: myselectedTimeRanges,
              },
            })
            .eq("booking_id", newBooking);

          if (error) {
            toast.error("Failed to submit booking");
            return;
          }

          toast.success("Booking updated successfully!");
          setMessage("");
          setShowTimeRanges(false);
          setMySelectedTimeRanges([]);
          onclose;

          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                sender_id: userInfo?.id,
                receiver_id: therapistId,
                content: `${userInfo?.name} has rescheduled their appointment with you.`,
                status: "",
              },
            ]);
          if (notificationError) {
            return;
          }

          setTimeout(() => {
            router.push("/booking/list");
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const { error: insertError } = await supabase
            .from("booking_list")
            .insert({
              therapist_id: therapistId,
              booking_message: message,
              booking_date: value,
              booking_status: "upcoming",
              customer_id: userInfo?.id,
              b_date: {
                date: dayjs(value).format("YYYY-MM-DD"),
                range: myselectedTimeRanges,
              },
            });

          if (insertError) {
            toast.error("Failed to submit booking");
            return;
          }

          toast.success("Booking submitted successfully!");
          setMessage("");
          setShowTimeRanges(false);
          setMySelectedTimeRanges([]);
          onclose;

          const { error: notificationError } = await supabase
            .from("notifications")
            .insert([
              {
                sender_id: userInfo?.id,
                receiver_id: therapistId,
                content: `${userInfo?.name} has booked an appointment with you.`,
                status: "",
              },
            ]);
          if (notificationError) {
            return;
          }

          // setTimeout(() => {
          //   router.push("/booking/list");
          // }, 1000);
        } catch (error) {
          console.log("error", error);
        }
      }

      setIsSubmitting(true);
      //   if (newBooking === "") {
      //     try {
      //       const { data, error } = await supabase.from("booking_list").insert({
      //         therapist_id: params.searchParams.therapist,
      //         booking_message: message,
      //         booking_date: value,
      //         booking_status: "upcoming",
      //         customer_id: userInfo.id,
      //         b_date: {
      //           date: dayjs(value).format("YYYY-MM-DD"),
      //           range: selectedTimeRanges,
      //         },
      //       });

      //       if (error) {
      //         toast.error("Failed to submit booking");
      //         return;
      //       }
      //       toast.success("Booking submitted successfully!");
      //       setMessage("");
      //       setShowTimeRanges(false);
      //       setSelectedTimeRanges([]);
      //       onclose;

      //       const { error: notificationError } = await supabase
      //         .from("notifications")
      //         .insert([
      //           {
      //             sender_id: userInfo?.id,
      //             receiver_id: params.searchParams.therapist,
      //             content: `${userInfo?.name} has booked an appointment with you.`,
      //             status: "",
      //           },
      //         ]);
      //       if (notificationError) {
      //         return;
      //       }

      //       setTimeout(() => {
      //         router.push("/booking/list");
      //       }, 1000);
      //     } catch (error) {
      //       console.log("error", error);
      //     }
      //   } else {
      //     try {
      //       const { data, error } = await supabase
      //         .from("booking_list")
      //         .update({
      //           booking_message: message,
      //           booking_status: "upcoming",
      //           b_date: {
      //             date: dayjs(value).format("YYYY-MM-DD"),
      //             range: selectedTimeRanges,
      //           },
      //         })
      //         .eq("booking_id", newBooking);

      //       if (error) {
      //         toast.error("Failed to submit booking");
      //         return;
      //       }

      //       toast.success("Booking updated successfully!");
      //       setMessage("");
      //       setShowTimeRanges(false);
      //       setSelectedTimeRanges([]);
      //       onclose;

      //       const { error: notificationError } = await supabase
      //         .from("notifications")
      //         .insert([
      //           {
      //             sender_id: userInfo?.id,
      //             receiver_id: params.searchParams.therapist,
      //             content: `${userInfo?.name} has rescheduled their appointment with you.`,
      //             status: "",
      //           },
      //         ]);
      //       if (notificationError) {
      //         return;
      //       }

      //       setTimeout(() => {
      //         router.push("/booking/list");
      //       }, 1000);
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
    };

    return (
      <div className="flex gap-20 mx-auto">
        <Modal opened={opened} onClose={close} title="Booking">
          <Textarea
            label="Message"
            placeholder="Enter your message to therapist"
            minRows={6}
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Flex justify={"space-between"} gap={"md"} mt={"md"}>
            <Button color="red" variant="outline" onClick={close} fullWidth>
              Close
            </Button>
            <Button
              fullWidth
              loading={isSubmitting}
              onClick={() => handleSubmit(newBooking)}
              className="!bg-[#46A7B0]"
            >
              Booking Now
            </Button>
          </Flex>
        </Modal>
        <div className="flex flex-col">
          <Card shadow="md" withBorder radius={"sm"}>
            <DatePicker
              value={value}
              defaultDate={new Date()}
              onChange={(value) => {
                handleChangeDate(value);
              }}
              minDate={new Date()}
              highlightToday
            />
          </Card>
          {showTimeRanges && (
            <Button
              onClick={open}
              disabled={isSubmitting}
              className={`mt-4 py-2 px-6 font-bold text-white !bg-[#46A7B0] rounded ${
                isSubmitting ? "cursor-not-allowed" : ""
              }`}
            >
              Confirm
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4 relative">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          {timeRanges.map((range, index) => (
            <Button
              key={index}
              size="md"
              variant="outline"
              disabled={selectedTimeRanges?.some((r: any) => r === range.value)}
              className={`${
                selectedTimeRanges?.some((r: any) => r === range.value)
                  ? " !bg-gray-500 !text-white !border-gray-500"
                  : myselectedTimeRanges?.some((r: any) => r === range.value)
                  ? "!bg-[#46A7B0] !text-white"
                  : " border hover:!text-white hover:!bg-[#46A7B0]"
              } font-bold !border-[#46A7B0] !text-black`}
              onClick={() => handleTimeRangeClick(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="mx-auto max-w-7xl w-full justify-between pt-10 pb-20">
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-8 w-full lg:px-10 md:px-8 px-6">
            <span className="lg:text-5xl md:text-4xl text-3xl text-black Poppins-font text-center">
              Request an Appointment
            </span>
            <CalendarComponent />
          </div>
        </div>
      </div>
    </>
  );
}
