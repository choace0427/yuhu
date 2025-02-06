"use client";

import { supabase } from "@/supabase";
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Button,
  SimpleGrid,
  Avatar,
  Stack,
  Flex,
  ActionIcon,
  Skeleton,
  Rating,
} from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconHeart,
  IconMapPin,
  IconStar,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParams = urlParams.get("service");
    if (serviceParams) {
      setServiceType(serviceParams);
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("services")
          .select(
            `
                    name,
                    email,
                    service_description,
                    service_type!inner (
                      subcategory
                    ),
                    therapist_list (
                      id,
                      hourly_rate,
                      phone,
                      location,
                      summary,
                      avatar_url
                    )
                  `
          )
          .eq("service_type.id", serviceType);

        if (error) {
          throw error;
        }

        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        console.log("error");
      }
      setLoading(false);
    };

    if (serviceType) {
      fetchServices();
    }
  }, [serviceType]);

  return (
    <Container size="xl" py="xl">
      <Stack align="center" mb="xl" gap="md">
        <Title order={1} className="text-gray-900" ta="center">
          Find Your Perfect {services[0]?.service_type?.subcategory || ""}{" "}
          Therapist
        </Title>
        <Text size="lg" c="dimmed" className="max-w-2xl text-center">
          Connect with certified Thai massage therapists who can help you
          achieve balance, relaxation, and wellness
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <TherapistCardSkeleton key={index} />
            ))
          : services.map((therapist, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <Card.Section p="md" bg="gray.0">
                  <Group justify="space-between" align="flex-start">
                    <Group>
                      <Avatar
                        src={therapist?.therapist_list?.avatar_url}
                        name={therapist?.name}
                        color="initials"
                        size="xl"
                        radius="md"
                        className="border-2 border-gray-100"
                      />
                      <div>
                        <Text fw={600} size="lg" className="text-gray-900">
                          {therapist?.name || "(Unknown)"}
                        </Text>
                        <Group gap={4} mb={4}>
                          {Array.from({ length: therapist.rating }).map(
                            (_, i) => (
                              <IconStar
                                key={i}
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                          <Rating value={therapist?.rating} readOnly />
                        </Group>
                        <Badge variant="light" color="blue" size="sm">
                          {therapist?.summary || "10+ years"}
                        </Badge>
                      </div>
                    </Group>
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      radius="xl"
                      size="lg"
                    >
                      <IconHeart size={20} />
                    </ActionIcon>
                  </Group>
                </Card.Section>

                <Stack gap="xs" my="md">
                  <Group gap="xs">
                    <IconMapPin size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      {therapist?.therapist_list?.location || "Unknown"}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      {therapist?.availability || "Mon-Fri, 9AM-7PM"}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      Starting from{" "}
                      <span className="font-bold">
                        ${therapist?.therapist_list?.hourly_rate}
                      </span>
                      /hour
                    </Text>
                  </Group>
                </Stack>

                <Text size="sm" c="dimmed" lineClamp={3} mb="lg">
                  {therapist?.therapist_list?.summary || "Unknown"}
                </Text>

                <Card.Section p="md" bg="gray.0">
                  <Flex justify={"space-around"}>
                    <button
                      className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit"
                      onClick={() =>
                        router.push(`/booking/${therapist?.therapist_list?.id}`)
                      }
                    >
                      <span className="text-[#46A7B0] md:text-xl sm:text-base">
                        B
                      </span>
                      <span className="md:text-xl sm:text-base">ook</span>
                      &nbsp;
                      <span className="text-[#46A7B0] md:text-xl sm:text-base">
                        S
                      </span>
                      <span className="md:text-xl sm:text-base">ession</span>
                    </button>
                    <button
                      className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
                      onClick={() =>
                        router.push(
                          `/therapist/detail/${therapist?.therapist_list?.id}_${serviceType}`
                        )
                      }
                    >
                      <span className="text-[#46A7B0] md:text-xl sm:text-base">
                        V
                      </span>
                      <span className="md:text-xl sm:text-base">iew</span>
                      &nbsp;
                      <span className="text-[#46A7B0] md:text-xl sm:text-base">
                        P
                      </span>
                      <span className="md:text-xl sm:text-base">rofile</span>
                    </button>
                  </Flex>
                </Card.Section>
              </Card>
            ))}
      </SimpleGrid>
    </Container>
  );
}

const TherapistCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="md" bg="gray.0">
        <Group justify="space-between" align="flex-start">
          <Group>
            <Skeleton height={80} circle />
            <div style={{ flex: 1 }}>
              <Skeleton height={20} width={120} mb={8} />
              <Skeleton height={16} width={100} mb={8} />
              <Skeleton height={20} width={80} />
            </div>
          </Group>
          <Skeleton height={32} circle />
        </Group>
      </Card.Section>

      <Stack gap="xs" my="md">
        <Skeleton height={16} width="70%" />
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} width="80%" />
      </Stack>

      <Skeleton height={40} mb="lg" />

      <Card.Section p="md" bg="gray.0">
        <Group grow>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </Group>
      </Card.Section>
    </Card>
  );
};
