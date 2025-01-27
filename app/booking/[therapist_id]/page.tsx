"use client";

import { supabase } from "@/supabase";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useAuthStore } from "@/app/_store/authStore";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { userInfo } from "os";
import { IconCalendar, IconCreditCard } from "@tabler/icons-react";

export default function BookingPage(params: any) {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [value, setValue] = useState<Date | null>(null);

  const [therapistId, setTherapistId] = useState(params.params.therapist_id);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  let [selectedTimeRanges, setSelectedTimeRanges] = useState<any[]>([]);
  let [showTimeRanges, setShowTimeRanges] = useState(false);
  let [isSubmitting, setIsSubmitting] = useState(false);
  const [newBooking, setNewBooking] = useState("");

  const [bookingId, setBookingId] = useState("");

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
        .eq("b_date->>date", dayjs(date).format("YYYY-MM-DD"))
        .neq("booking_status", "cancelled");
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
    setIsSubmitting(true);
    if (!value || myselectedTimeRanges.length === 0) {
      toast.error("Please select a date and at least one time range.");
      return;
    }

    const { data, error } = await supabase
      .from("booking_list")
      .select("*")
      .eq("therapist_id", therapistId)
      .eq("customer_id", userInfo?.id)
      .eq("b_date->>date", dayjs(value).format("YYYY-MM-DD"))
      .neq("booking_status", "cancelled");

    if (error) {
      console.log("errro", error);
      return;
    }

    if (data && data.length > 0) {
      try {
        const { data: updateBookingData, error } = await supabase
          .from("booking_list")
          .update({
            booking_message: message,
            booking_status: "upcoming",
            b_date: {
              date: dayjs(value).format("YYYY-MM-DD"),
              range: myselectedTimeRanges || [],
            },
          })
          .eq("booking_id", newBooking)
          .select();

        if (error) {
          toast.error("Failed to submit booking1");
          return;
        }

        toast.success("Booking updated successfully!");
        setBookingId(updateBookingData[0].booking_id);
        setMessage("");
        setShowTimeRanges(false);
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

        setIsSubmitting(false);
        return updateBookingData[0].booking_id;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data: insertBookingData, error: insertError } = await supabase
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
          })
          .select();

        if (insertError) {
          console.log(insertError);
          return;
        }
        setBookingId(insertBookingData[0].booking_id);
        toast.success("Booking submitted successfully!");
        setMessage("");
        setShowTimeRanges(false);
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
          console.log(notificationError);
        }
        setIsSubmitting(false);
        return insertBookingData[0].booking_id;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Request an Appointment
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Select your preferred date and time
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl w-full justify-between pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card shadow="sm" p="xl" radius="md" withBorder>
                <DatePickerInput
                  label="Select Date"
                  placeholder="Pick a date"
                  value={value}
                  onChange={(value) => {
                    handleChangeDate(value);
                  }}
                  minDate={new Date()}
                  size="lg"
                  className="mb-8"
                  leftSection={<IconCalendar className="w-5 h-5" />}
                  required
                />
                <div className="relative">
                  <Text size="lg" fw={500} className="mb-4">
                    Available Time Slots
                  </Text>
                  <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                  />
                  <SimpleGrid cols={4} spacing="md">
                    {timeRanges.map((range, index) => (
                      <>
                        <Button
                          key={index}
                          size="md"
                          fullWidth
                          variant="outline"
                          disabled={selectedTimeRanges?.some(
                            (r: any) => r === range.value
                          )}
                          className={`${
                            selectedTimeRanges?.some(
                              (r: any) => r === range.value
                            )
                              ? " !bg-gray-500 !text-white !border-gray-500"
                              : myselectedTimeRanges?.some(
                                  (r: any) => r === range.value
                                )
                              ? "!bg-[#46A7B0] !text-white"
                              : " border hover:!text-white hover:!bg-[#46A7B0]"
                          } font-bold !border-[#46A7B0] !text-black`}
                          onClick={() => handleTimeRangeClick(range.value)}
                        >
                          {range.label}
                        </Button>
                      </>
                    ))}
                  </SimpleGrid>
                </div>
              </Card>
            </div>
            <div>
              <Card shadow="sm" p="xl" radius="md" withBorder>
                <Text size="xl" fw={600} mb="lg">
                  Payment Details
                </Text>

                <Stack gap="md">
                  <div className="space-y-2">
                    <Elements stripe={stripePromise}>
                      <div className="border-t pt-4 mt-4">
                        <Stack gap="xs">
                          {/* <Group>
                            <Text>Session Fee</Text>
                            <Text>${userInfo?.price / 100}.00</Text>
                          </Group> */}
                          <Group>
                            <Text>Date</Text>
                            <Text>
                              {value ? dayjs(value).format("YYYY-MM-DD") : "-"}
                            </Text>
                          </Group>
                          <Group align="start">
                            <Text>Time</Text>
                            <Box>
                              {myselectedTimeRanges
                                ? myselectedTimeRanges?.map((item, index) => {
                                    return (
                                      <Text>
                                        {item}-{item + 1}
                                      </Text>
                                    );
                                  })
                                : "-"}
                            </Box>
                          </Group>
                          <Divider />
                          {/* <Group className="border-t pt-4 mt-2">
                            <Text fw={600}>Total</Text>
                            <Text fw={600}>
                              $
                              {userInfo?.hourly_rate *
                                myselectedTimeRanges.length || 0}
                              .00
                            </Text>
                          </Group> */}
                        </Stack>
                      </div>
                      <Text size="sm" fw={500} mt={"sm"}>
                        Card Number
                      </Text>
                      <Paymentcomponent
                        therapistId={therapistId}
                        times={myselectedTimeRanges}
                        newBooking={newBooking}
                        handleSubmit={handleSubmit}
                        bookingId={bookingId}
                        myselectedTimeRanges={myselectedTimeRanges}
                      />
                    </Elements>
                  </div>

                  {/* <Button
                  onClick={handlePayment}
                  loading={isLoading}
                  leftSection={<CreditCard className="w-5 h-5" />}
                  size="lg"
                  fullWidth
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="mt-4"
                >
                  Create Payment Method
                </Button> */}

                  <Button variant="outline" color="red" fullWidth>
                    Cancel Booking
                  </Button>
                </Stack>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Paymentcomponent = ({
  therapistId,
  times,
  newBooking,
  handleSubmit,
  myselectedTimeRanges,
}: any) => {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();
  const cardElement = elements?.getElement(CardNumberElement);
  const stripe = useStripe();

  const handlePayment = async () => {
    const bookingId = await handleSubmit(newBooking);
    if (!stripe) {
      toast.error("Stripe failed to initialize");
      return;
    }

    if (!userInfo || !userInfo.stripe_customer_id) {
      toast.error("User information is incomplete");
      return;
    }

    if (!cardElement) {
      toast.error("Credit card element is not available");
      return;
    }

    if (!myselectedTimeRanges) return;

    setIsLoading(true);

    try {
      // Fetch therapist data
      const { data: therapistData, error: therapistError } = await supabase
        .from("therapist_list")
        .select()
        .eq("id", therapistId)
        .single();

      if (therapistError || !therapistData) {
        throw new Error("Failed to fetch therapist hourly rate");
      }

      const hourlyRate = therapistData.hourly_rate;

      // Create payment method
      const { paymentMethod, error: pmError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // Attach payment method to customer
      const attachResponse = await fetch("/api/attach-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          customerId: userInfo.stripe_customer_id,
        }),
      });

      if (!attachResponse.ok) {
        throw new Error("Failed to attach payment method");
      }

      // Create payment intent
      const amount = hourlyRate * (times?.length || 0);
      const response = await fetch("/api/payment-intent-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          customerId: userInfo.stripe_customer_id,
        }),
      });

      const paymentIntentResult = await response.json();

      if (paymentIntentResult.error) {
        throw new Error(paymentIntentResult.error);
      }

      const clientSecret = paymentIntentResult.clientSecret;

      // Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Insert transaction record into the database
      const { error: insertTransactionError } = await supabase
        .from("transaction_list")
        .insert([
          {
            transaction_id: paymentIntent?.id,
            customer_id: userInfo.id,
            status: paymentIntent?.status,
            booking_id: bookingId,
            therapist_id: therapistId,
          },
        ]);

      if (insertTransactionError) {
        throw new Error("Failed to save transaction to the database");
      }

      // toast.success("Payment successful");
      setTimeout(() => {
        router.push("/booking/list");
      }, 1000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-6">
        <div className="space-y-4">
          <div className="rounded-md border border-input  p-3">
            <CardNumberElement
              options={{
                showIcon: true,
                iconStyle: "default",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md border border-input p-3">
              <CardExpiryElement />
            </div>
            <div className="rounded-md border border-input p-3">
              <CardCvcElement />
            </div>
          </div>
        </div>
        <Button
          onClick={handlePayment}
          loading={isLoading}
          leftSection={<IconCreditCard className="w-5 h-5" />}
          size="sm"
          mt={"lg"}
          fullWidth
          // disabled={!}
          className="mt-4"
        >
          Booking Now
        </Button>
      </div>
    </>
  );
};
