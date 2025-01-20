"use client";

import { useAuthStore } from "@/app/_store/authStore";
import ReviewPage from "@/app/components/review/ReviewLeft";
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
  Drawer,
  Modal,
  Textarea,
  Rating,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useStripe } from "@stripe/react-stripe-js";
import {
  IconMessage,
  IconCalendar,
  IconMoneybag,
  IconTarget,
  IconUser,
  IconX,
  IconPaywall,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ReviewForm {
  rating: number;
  review: string;
}

export default function BookingList() {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  // const { therapistId, setTherapistId } = useTherapistContext();
  const [type, setType] = useState("upcoming");

  const [bookingList, setBookingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);

  const [opened, { open, close }] = useDisclosure(false);

  const handleCancel = async (booking_id: string) => {
    const { error } = await supabase
      .from("booking_list")
      .update({ booking_status: "cancelled" })
      .eq("booking_id", booking_id)
      .select();
    if (error) {
      toast.error("Failed to update booking");
      return;
    }
    const { data: transactionData, error: transactionError } = await supabase
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
          customer_id: userInfo.id,
          status: "refunded",
          booking_id: booking_id,
        });

      if (insertTransactionError) {
        throw new Error("Failed to save transaction to the database");
      }

      const { data, error } = await supabase
        .from("booking_list")
        .select(
          `
             *,
              customers_list (
                *
              )
            `
        )
        .eq("id", userInfo.id);
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
            therapist_list (
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

  const [selectedBook, setSelectedBook] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReviewForm>({
    initialValues: {
      rating: 0,
      review: "",
    },
    validate: {
      rating: (value) => (value === 0 ? "Please select a rating" : null),
      review: (value) =>
        value.length < 10 ? "Review must be at least 10 characters" : null,
    },
  });

  const handleSubmit = async (values: ReviewForm) => {
    setSubmitted(true);
    const { error } = await supabase.from("review_list").insert({
      customer_id: userInfo?.id,
      therapist_id: selectedBook?.therapist_id,
      rating: values.rating,
      review_content: values.review,
      booking_id: selectedBook?.booking_id,
    });
    if (error) {
      form.setValues({ rating: 0, review: "" });
      toast.error("Failed to submit review");
      return;
    }

    const { error: bookingError } = await supabase
      .from("booking_list")
      .update({ booking_status: "completed" })
      .eq("booking_id", selectedBook?.booking_id)
      .select();

    if (bookingError) {
      toast.error("Failed to update booking");
      return;
    }

    const { data: CardData, error: CardError } = await supabase
      .from("credit_card")
      .select()
      .eq("user_id", selectedBook?.therapist_id);
    if (CardError) {
      console.log("error", CardError);
      return;
    }

    const response = await fetch("/api/transfer-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount:
          selectedBook?.therapist_list?.hourly_rate *
          selectedBook?.b_date?.range?.length,
        currency: "eur",
        destination: CardData[0]?.account_id,
      }),
    });
    const { transfer } = await response.json();

    if (transfer) {
      const { error: insertTransactionError } = await supabase
        .from("transaction_list")
        .insert([
          {
            transaction_id: transfer?.id,
            customer_id: userInfo.id,
            status: "transfered",
            booking_id: selectedBook?.booking_id,
          },
        ]);

      if (insertTransactionError) {
        throw new Error("Failed to save transaction to the database");
      }
    }

    const { data: customerData, error: customerError } = await supabase
      .from("booking_list")
      .select(
        `
           *,
            customers_list (
              *
            )
          `
      )
      .eq("customer_id", userInfo.id);
    if (customerError) {
      console.error("Error fetching bookings:", error);
    } else {
      setAllData(customerData);
    }

    form.setValues({ rating: 0, review: "" });
    toast.success("Successfully review submit");
    setSubmitted(false);
    close();
  };

  const handleReviewSubmit = (bookData: any) => {
    setSelectedBook(bookData);
    open();
  };

  return (
    <Container size="xl" py="xl" my={"lg"}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          shadow="sm"
          padding="xl"
          radius="md"
          withBorder
          onClick={() => setType("upcoming")}
          className={`${
            type === "upcoming" && "!border-teal-700"
          }  hover:cursor-pointer`}
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
          className={`${
            type === "accept" && "!border-teal-700"
          }  hover:cursor-pointer`}
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
          className={`${
            type === "cancelled" && "!border-teal-700"
          } hover:cursor-pointer`}
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
              <Paper
                shadow="sm"
                radius="md"
                p="md"
                withBorder
                key={index}
                mt={"sm"}
              >
                <Group gap="apart" align="center" justify="space-between">
                  <Group gap="xl">
                    <Group gap="xs">
                      <Avatar
                        src={item?.therapist_list?.avatar_url}
                        name={item?.therapist_list?.name}
                        size={"lg"}
                      />
                      <Stack gap={4}>
                        <Text size="md" fw={500}>
                          {item?.therapist_list?.name}
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
                        ${item?.therapist_list?.hourly_rate || 100}/hr
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
                    <Flex gap={"sm"}>
                      <Button
                        radius="md"
                        variant="light"
                        leftSection={<IconMoneybag size={16} />}
                        onClick={() => handleReviewSubmit(item)}
                      >
                        Complete
                      </Button>
                      <Button
                        variant="light"
                        color="teal"
                        leftSection={<IconMessage size={16} />}
                        radius="md"
                        onClick={() => handleChat(item?.therapist_id)}
                      >
                        Chat
                      </Button>
                    </Flex>
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
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={3}>Share Your Experience</Title>}
        size="lg"
        centered
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="xl">
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Overall Rating
              </Text>
              <Rating size="xl" count={5} {...form.getInputProps("rating")} />
              {form.errors.rating && (
                <Text size="xs" c="red">
                  {form.errors.rating}
                </Text>
              )}
            </Stack>

            <Textarea
              label="Your Review"
              placeholder="Tell us about your experience..."
              minRows={5}
              autosize
              maxRows={10}
              {...form.getInputProps("review")}
            />

            <Group justify="flex-end">
              <Button
                variant="light"
                onClick={() => {
                  form.setValues({ rating: 0, review: "" });
                  close();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" loading={submitted}>
                Submit Review
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
}
