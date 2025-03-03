"use client";

import { useState, useEffect } from "react";
import {
  Title,
  Text,
  Grid,
  Paper,
  Button,
  Group,
  Notification,
  LoadingOverlay,
  SimpleGrid,
  Flex,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useAuthStore } from "../_store/authStore";
import dayjs from "dayjs";
import { createClient } from "@/app/utils/supabase/client";

const timeSlots = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 4) + 9;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
});

export default function TherapistAvailability() {
  const { userInfo } = useAuthStore();
  const supabase = createClient();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.id) fetchAvailability();
  }, [userInfo?.id, selectedDate]);

  const fetchAvailability = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("therapist_available_times")
      .select("time_slots")
      .eq("therapist_id", userInfo?.id)
      .eq("date", selectedDate.toISOString().split("T")[0])
      .single();

    if (error) {
      console.error("Error fetching availability:", error);
      setAvailableSlots([]);
      setIsExistingRecord(false);
    } else if (data) {
      setAvailableSlots(data.time_slots);
      setIsExistingRecord(true);
    } else {
      setAvailableSlots([]);
      setIsExistingRecord(false);
    }
    setLoading(false);
  };

  const toggleTimeSlot = (time: string) => {
    setAvailableSlots((prevSlots) => {
      if (!Array.isArray(prevSlots)) {
        console.warn("prevSlots is not an array, resetting to an empty array.");
        return [time];
      }

      if (prevSlots.includes(time)) {
        return prevSlots.filter((slot) => slot !== time);
      } else {
        return [...prevSlots, time];
      }
    });
  };

  const isWithinWorkingHours = (time: string) => {
    return time >= workingHours.start && time < workingHours.end;
  };

  const saveAvailability = async () => {
    setSubmitLoading(true);
    if (isExistingRecord) {
      const { error } = await supabase
        .from("therapist_available_times")
        .update({
          time_slots: availableSlots,
        })
        .eq("therapist_id", userInfo?.id)
        .eq("date", selectedDate.toISOString().split("T")[0]);

      if (error) {
        console.error("Error updating availability:", error);
        setNotification({
          type: "error",
          message: "Failed to update availability. Please try again.",
        });
      } else {
        setNotification({
          type: "success",
          message: "Availability updated successfully!",
        });
      }
    } else {
      const { error } = await supabase
        .from("therapist_available_times")
        .insert({
          therapist_id: userInfo?.id,
          date: selectedDate.toISOString().split("T")[0],
          time_slots: availableSlots,
        });

      if (error) {
        console.error("Error saving availability:", error);
        setNotification({
          type: "error",
          message: "Failed to save availability. Please try again.",
        });
      } else {
        setNotification({
          type: "success",
          message: "Availability saved successfully!",
        });
        setIsExistingRecord(true);
      }
    }
    setSubmitLoading(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
      <Title order={2} mb="md">
        Set Your Availability
      </Title>
      {notification && (
        <Notification
          icon={
            notification.type === "success" ? (
              <IconCheck size="1.1rem" />
            ) : (
              <IconX size="1.1rem" />
            )
          }
          color={notification.type === "success" ? "teal" : "red"}
          title={notification.type === "success" ? "Success" : "Error"}
          mb="md"
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      <Grid>
        <Grid.Col span={4}>
          {/* <DatePicker
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            size="sm"
            minDate={new Date().setHours(0, 0, 0, 0)}
          /> */}
          <DatePicker
            value={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            size="sm"
            minDate={today}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size="sm" fw={500} mb="xs">
            Available Time Slots
          </Text>
          <Paper withBorder p="xs" style={{ position: "relative" }}>
            {loading && (
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
            )}
            <SimpleGrid cols={4} spacing="xs">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={availableSlots.includes(time) ? "filled" : "light"}
                  color={isWithinWorkingHours(time) ? "blue" : "gray"}
                  onClick={() =>
                    isWithinWorkingHours(time) && toggleTimeSlot(time)
                  }
                  size="xs"
                  fullWidth
                  disabled={!isWithinWorkingHours(time)}
                >
                  {time}
                </Button>
              ))}
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
      <Flex justify={"end"} mt={"lg"}>
        <Button
          color="blue"
          onClick={saveAvailability}
          size="sm"
          loading={submitLoading}
        >
          Save Availability
        </Button>
      </Flex>
    </Paper>
  );
}
