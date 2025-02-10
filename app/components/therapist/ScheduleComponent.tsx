"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  SegmentedControl,
  Badge,
  ScrollArea,
  Tabs,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { IconCalendar, IconList } from "@tabler/icons-react";
import { createClient } from "@/app/utils/supabase/client";
import { useAuthStore } from "@/app/_store/authStore";
import dayjs from "dayjs";

type BookingStatus = "confirmed" | "cancelled" | "pending";

const statusColors: Record<BookingStatus, string> = {
  confirmed: "green",
  cancelled: "red",
  pending: "yellow",
};

export default function TherapistScheduleComponent() {
  const supabase = createClient();
  const { userInfo } = useAuthStore();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState("calendar");
  const [statusFilter, setStatusFilter] = useState("all");

  const renderScheduleItem = (schedule: any) => (
    <Paper key={schedule.id} p="md" withBorder mb="sm" radius="md">
      <Group justify="space-between" wrap="nowrap">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" fw={500}>
              {schedule.customers_list?.name}
            </Text>
            <Badge
              size="md"
              variant="light"
              color={statusColors[schedule?.booking_status as BookingStatus]}
            >
              {schedule?.booking_status}
            </Badge>
          </Group>
          <Group mt={"sm"}>
            <Text size="xs" c="dimmed">
              {schedule.b_date?.date &&
                dayjs(schedule.b_date?.date).format("YYYY-MM-DD")}{" "}
              at{" "}
              {Array.isArray(schedule.b_date?.range) &&
                schedule.b_date?.range.map((timeSlot: number) => {
                  const startHour = timeSlot * 2;
                  const endHour = startHour + 2;
                  return (
                    <Badge key={timeSlot} variant="outline" size="md" mr={4}>
                      {startHour.toString().padStart(2, "0")}:00 -{" "}
                      {endHour.toString().padStart(2, "0")}:00
                    </Badge>
                  );
                })}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );

  const [allbooking, setAllbooking] = useState<any[]>([]);
  const handleFetchAllBooking = async () => {
    const { data, error } = await supabase
      .from("booking_list")
      .select("*, customers_list(name)")
      .eq("therapist_id", userInfo?.id);
    if (error) throw error;
    setAllbooking(data);
  };

  useEffect(() => {
    if (userInfo?.id) handleFetchAllBooking();
  }, [userInfo]);

  return (
    <>
      <Paper
        radius="md"
        p="xl"
        mb="xl"
        bg="var(--mantine-color-teal-6)"
        c="white"
      >
        <Group align="flex-start">
          <Stack gap="xs">
            <Title order={1}>Welcome, {userInfo?.name || ""}</Title>
            <Text size="lg">
              Manage your schedule and services all in one place
            </Text>
            <Button
              variant="white"
              color="teal"
              size="md"
              mt="md"
              style={{ width: "fit-content" }}
              onClick={open}
              leftSection={<IconCalendar size={18} />}
            >
              View Schedule
            </Button>
          </Stack>
        </Group>
      </Paper>

      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <IconCalendar size={24} />
            <Title order={3}>Schedule Management</Title>
          </Group>
        }
        size="1000"
        centered
      >
        <Stack>
          <SegmentedControl
            value={view}
            onChange={setView}
            data={[
              {
                value: "calendar",
                label: (
                  <Group gap="xs">
                    <IconCalendar size={16} />
                    <span>Calendar View</span>
                  </Group>
                ),
              },
              {
                value: "list",
                label: (
                  <Group gap="xs">
                    <IconList size={16} />
                    <span>List View</span>
                  </Group>
                ),
              },
            ]}
          />

          {view === "calendar" ? (
            <Flex align={"start"} gap={"sm"}>
              <Paper withBorder p="md" radius="md">
                <DatePicker
                  size="lg"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  //   leftSection={<CalendarIcon size={18} />}
                  renderDay={(date) => {
                    const hasSchedule =
                      allbooking.filter(
                        (item) =>
                          item.b_date?.date === dayjs(date).format("YYYY-MM-DD")
                      ).length > 0;
                    // allbooking[formatDate(date)]?.length > 0;
                    const dayStyle = hasSchedule
                      ? {
                          backgroundColor: "var(--mantine-color-teal-1)",
                          color: "var(--mantine-color-teal-9)",
                          fontWeight: 500,
                          borderRadius: "100%",
                          padding: "7px",
                        }
                      : {};

                    return <div style={dayStyle}>{date.getDate()}</div>;
                  }}
                />
              </Paper>

              <Paper
                w={"100%"}
                withBorder
                p="md"
                style={{ height: "400px" }}
                radius="md"
              >
                <ScrollArea h={360}>
                  {selectedDate && (
                    <>
                      <Text fw={500} mb="md">
                        Schedules for {dayjs(selectedDate).format("YYYY-MM-DD")}
                      </Text>
                      {allbooking.filter(
                        (item) =>
                          item.b_date?.date ===
                          dayjs(selectedDate).format("YYYY-MM-DD")
                      ).length > 0 ? (
                        allbooking
                          .filter(
                            (item) =>
                              item.b_date?.date ===
                              dayjs(selectedDate).format("YYYY-MM-DD")
                          )
                          .map(renderScheduleItem)
                      ) : (
                        <Text c="dimmed" ta="center" pt="xl">
                          No schedules for this date
                        </Text>
                      )}
                    </>
                  )}
                </ScrollArea>
              </Paper>
            </Flex>
          ) : (
            <Stack>
              <Tabs
                value={statusFilter}
                onChange={(val: any) => setStatusFilter(val)}
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="confirmed"
                    // leftSection={statusIcons.confirmed}
                    color={statusColors.confirmed}
                  >
                    Confirmed
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="pending"
                    // leftSection={statusIcons.pending}
                    color={statusColors.pending}
                  >
                    Pending
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="cancelled"
                    // leftSection={statusIcons.cancelled}
                    color={statusColors.cancelled}
                  >
                    Cancelled
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Paper withBorder p="md" radius="md">
                <ScrollArea h={400}>
                  <Stack>
                    {allbooking.filter(
                      (item) => item.booking_status === statusFilter
                    ).length > 0 ? (
                      allbooking
                        .filter((item) => item.booking_status === statusFilter)
                        .map(renderScheduleItem)
                    ) : (
                      <Text c="dimmed" ta="center" pt="xl">
                        No {statusFilter} schedules found
                      </Text>
                    )}
                  </Stack>
                </ScrollArea>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Modal>
    </>
  );
}
