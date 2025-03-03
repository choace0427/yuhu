"use client";

import { useState, useEffect } from "react";
import {
  AppShell,
  Container,
  Text,
  Grid,
  Paper,
  Button,
  Group,
  Badge,
  Tooltip,
  Card,
  Stack,
  Box,
  Divider,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconInfoCircle, IconCreditCard } from "@tabler/icons-react";
import { useAuthStore } from "../_store/authStore";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { createClient } from "@/app/utils/supabase/client";

const timeSlots = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 4) + 9;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
});

export default function CustomerBooking(props: any) {
  const { therapistId } = props;
  const supabase = createClient();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<number[]>([]);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchAvailability();
    fetchBookings();
  }, [selectedDate]);
  const { userInfo } = useAuthStore();
  const fetchAvailability = async () => {
    const { data, error } = await supabase
      .from("therapist_available_times")
      .select("time_slots")
      .eq("therapist_id", therapistId)
      .eq("date", selectedDate.toISOString().split("T")[0])
      .single();

    if (error) {
      console.error("Error fetching availability:", error);
      setAvailableSlots([]);
    } else if (data) {
      setAvailableSlots(data.time_slots || []);
    } else {
      setAvailableSlots([]);
    }
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("booking_list")
      .select("b_date")
      .eq("therapist_id", therapistId)
      .eq("b_date->>date", selectedDate.toISOString().split("T")[0]);

    if (error) {
      console.error("Error fetching bookings:", error);
      setBookedSlots([]);
    } else if (data) {
      const bookedRanges = data.flatMap((booking) => booking.b_date.range);
      setBookedSlots(bookedRanges);
    } else {
      setBookedSlots([]);
    }
  };

  const getSlotStatus = (time: string) => {
    const slotIndex = timeSlots.indexOf(time) + 1;
    if (bookedSlots.includes(slotIndex)) return "booked";
    if (availableSlots.includes(time)) return "available";
    return "unavailable";
  };

  const toggleTimeSlot = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].sort()
    );
  };

  const handleSubmit = async () => {
    // setIsSubmitting(true);
    if (selectedTimes.length === 0) {
      toast.error("Please select a date and at least one time range.");
      return;
    }

    const slotIndices = selectedTimes.map(
      (time) => timeSlots.indexOf(time) + 1
    );
    const { data, error } = await supabase
      .from("booking_list")
      .upsert({
        customer_id: userInfo?.id,
        therapist_id: therapistId,
        booking_status: "upcoming",
        b_date: {
          date: selectedDate.toISOString().split("T")[0],
          range: slotIndices,
        },
      })
      .select();

    if (error) {
      console.error("Error booking appointment:", error);
      setNotification({
        type: "error",
        message: "Failed to book appointment. Please try again.",
      });
    } else {
      setNotification({
        type: "success",
        message: "Appointment booked successfully!",
      });
      fetchBookings();
      setSelectedTimes([]);

      return data[0].booking_id;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  return (
    <AppShell>
      <Container size="lg">
        <Grid>
          <Grid.Col span={8}>
            <Paper shadow="sm" p="md" withBorder>
              <Text size="lg" fw={500} mb="md">
                {selectedTherapist
                  ? `Available slots for ${selectedDate.toDateString()}`
                  : "Select a therapist to view available slots"}
              </Text>
              <DatePickerInput
                value={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                minDate={today}
                mb={"lg"}
              />
              <Grid>
                {timeSlots.map((time) => {
                  const status = getSlotStatus(time);
                  return (
                    <Grid.Col span={3} key={time}>
                      <Tooltip
                        label={
                          status === "booked"
                            ? "This slot is already booked"
                            : ""
                        }
                      >
                        <Button
                          variant={
                            selectedTimes.includes(time) ? "filled" : "light"
                          }
                          color={
                            status === "booked"
                              ? "red"
                              : status === "available"
                              ? "blue"
                              : ""
                          }
                          onClick={() =>
                            status === "available" && toggleTimeSlot(time)
                          }
                          fullWidth
                          disabled={status === "unavailable"}
                        >
                          {time}
                        </Button>
                      </Tooltip>
                    </Grid.Col>
                  );
                })}
              </Grid>
              <Group mt="md" gap="xs">
                <Badge color="blue">Available</Badge>
                <Badge color="red">Booked</Badge>
                <Badge color="gray">Unavailable</Badge>
                <Tooltip label="Slots may be unavailable due to therapist's schedule or existing bookings">
                  <IconInfoCircle size={18} style={{ cursor: "pointer" }} />
                </Tooltip>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="sm" p="xl" radius="md" withBorder>
              <Text size="xl" fw={600} mb="lg">
                Payment Details
              </Text>

              <Stack gap="md">
                <div className="space-y-2">
                  <Elements stripe={stripePromise}>
                    <div className="border-t pt-4 mt-4">
                      <Stack gap="xs">
                        <Group>
                          <Text>Date</Text>
                          <Text>
                            {selectedDate
                              ? dayjs(selectedDate).format("YYYY-MM-DD")
                              : "-"}
                          </Text>
                        </Group>
                        <Group align="start">
                          <Text>Time</Text>
                          <Box>{selectedTimes.join(", ")}</Box>
                        </Group>
                      </Stack>
                    </div>
                    <Divider />
                    <Text size="sm" fw={500} mt={"sm"}>
                      Card Number
                    </Text>
                    <Paymentcomponent
                      therapistId={therapistId}
                      times={selectedTimes}
                      // newBooking={newBooking}
                      handleSubmit={handleSubmit}
                      // bookingId={bookingId}
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
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}

const Paymentcomponent = ({
  therapistId,
  times,
  // newBooking,
  handleSubmit,
}: any) => {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const elements = useElements();
  const cardElement = elements?.getElement(CardNumberElement);
  const stripe = useStripe();
  const supabase = createClient();

  const handlePayment = async () => {
    const bookingId = await handleSubmit();
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

    if (!times) return;

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
      const amount = hourlyRate * (times?.length / 4 || 0);
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
