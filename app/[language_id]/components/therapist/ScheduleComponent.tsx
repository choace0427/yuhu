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
import { IconCalendar, IconList, IconClock } from "@tabler/icons-react";
import { createClient } from "@/app/utils/supabase/client";
import dayjs from "dayjs";
import { useAuthStore } from "../../_store/authStore";
import TherapistAvailability from "../../therapist/TherapistAvailability";

type BookingStatus = "confirmed" | "cancelled" | "upcoming";

const statusColors: Record<BookingStatus, string> = {
  confirmed: "#46A7B0",
  cancelled: "red",
  upcoming: "yellow",
};

export default function TherapistScheduleComponent() {
  const supabase = createClient();
  const { userInfo } = useAuthStore();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [view, setView] = useState("calendar");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("schedule");

  const renderScheduleItem = (schedule: any) => (
    <Paper key={schedule.id} p="md" withBorder mb="sm" radius="md">
      <Group ps="apart" wrap="nowrap" bg={"#46A7B0"}>
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group ps="apart" wrap="nowrap">
            <Text size="sm" fw={500}>
              {schedule.customers_list?.name}
            </Text>
            <Badge
              size="sm"
              variant="light"
              color={statusColors[schedule?.booking_status as BookingStatus]}
            >
              {schedule?.booking_status}
            </Badge>
          </Group>
          <Group>
            <Text size="xs" color="dimmed">
              {schedule.b_date?.date &&
                dayjs(schedule.b_date?.date).format("YYYY-MM-DD")}{" "}
              at{" "}
              {Array.isArray(schedule.b_date?.range) &&
                schedule.b_date?.range.map((timeSlot: number) => {
                  const startHour = timeSlot * 2;
                  const endHour = startHour + 2;
                  return (
                    <Badge
                      key={timeSlot}
                      variant="outline"
                      size="sm"
                      mr={4}
                      mt={4}
                    >
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
      <Paper radius="md" p="xl" mb="xl" bg={"#46A7B0"} c="white">
        <Group align="flex-start">
          <Stack gap="xs">
            <Title order={1}>Welcome, {userInfo?.name || ""}</Title>
            <Text size="lg">
              Manage your schedule and services all in one place
            </Text>
            <Button
              variant="white"
              color="#46A7B0"
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
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as string)}
        >
          <Tabs.List>
            <Tabs.Tab value="schedule" leftSection={<IconCalendar size={14} />}>
              Schedule
            </Tabs.Tab>
            <Tabs.Tab
              value="availability"
              leftSection={<IconClock size={14} />}
            >
              Set Availability
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="schedule" pt="xs">
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
                <Flex align="start" gap="sm">
                  <Paper withBorder p="md" radius="md">
                    <DatePicker
                      size="sm"
                      value={selectedDate}
                      onChange={setSelectedDate}
                      renderDay={(date) => {
                        const hasSchedule =
                          allbooking.filter(
                            (item) =>
                              item.b_date?.date ===
                              dayjs(date).format("YYYY-MM-DD")
                          ).length > 0;
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
                    w="100%"
                    withBorder
                    p="md"
                    style={{ height: "400px" }}
                    radius="md"
                  >
                    <ScrollArea h={360}>
                      {selectedDate && (
                        <>
                          <Text fw={500} mb="md">
                            Schedules for{" "}
                            {dayjs(selectedDate).format("YYYY-MM-DD")}
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
                        color={statusColors.confirmed}
                        rightSection={
                          <Badge color={statusColors.confirmed}>
                            {allbooking.filter(
                              (item) => item.booking_status === statusFilter
                            ).length > 0
                              ? allbooking.filter(
                                  (item) => item.booking_status === statusFilter
                                ).length
                              : 0}
                          </Badge>
                        }
                      >
                        Confirmed
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="upcoming"
                        color={statusColors.upcoming}
                        rightSection={
                          <Badge color={statusColors.upcoming}>
                            {allbooking.filter(
                              (item) => item.booking_status === statusFilter
                            ).length > 0
                              ? allbooking.filter(
                                  (item) => item.booking_status === statusFilter
                                ).length
                              : 0}
                          </Badge>
                        }
                      >
                        Upcoming
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="cancelled"
                        color={statusColors.cancelled}
                        rightSection={
                          <Badge color={statusColors.cancelled}>
                            {allbooking.filter(
                              (item) => item.booking_status === statusFilter
                            ).length > 0
                              ? allbooking.filter(
                                  (item) => item.booking_status === statusFilter
                                ).length
                              : 0}
                          </Badge>
                        }
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
                            .filter(
                              (item) => item.booking_status === statusFilter
                            )
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
          </Tabs.Panel>

          <Tabs.Panel value="availability" pt="xs">
            <TherapistAvailability />
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
}
