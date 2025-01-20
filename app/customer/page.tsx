"use client";

import {
  Button,
  Card,
  Container,
  Image,
  Loader,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import Service from "../components/service/Service";
import { useRouter } from "next/navigation";
import { IconMassage, IconSparkles, IconYoga } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

export default function CustomerPage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBooking = (service: string) => {
    router.push(`/therapist/list?service=${service}`);
  };

  const handlefetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("service_type").select();
    if (error) {
      console.log("error", error);
      return;
    }
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    handlefetchServices();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack align="center" gap="xl" style={{ color: "white" }}>
            <Title order={1} size="3rem">
              Welcome to Wellness
            </Title>
            <Text size="xl" style={{ maxWidth: 600 }} ta="center">
              Discover a world of relaxation, fitness, and beauty treatments
              tailored to your needs
            </Text>
            <Button size="lg" color="blue">
              Book Appointment
            </Button>
          </Stack>
        </div>
      </div>

      {/* Services Sections */}
      <Container size="lg" py="xl">
        <Tabs defaultValue="massage">
          <Tabs.List grow mb="xl">
            <Tabs.Tab value="massage" leftSection={<IconMassage size={16} />}>
              Massage Therapy
            </Tabs.Tab>
            <Tabs.Tab value="training" leftSection={<IconYoga size={16} />}>
              Personal Training
            </Tabs.Tab>
            <Tabs.Tab value="beauty" leftSection={<IconSparkles size={16} />}>
              Beauty Treatments
            </Tabs.Tab>
          </Tabs.List>

          {loading ? (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))}
            </SimpleGrid>
          ) : (
            <>
              <Tabs.Panel value="massage">
                <Title order={2} ta="center" mb="xl">
                  Massage Services
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {services
                    ?.filter((item) => item.category_id === 1)
                    .map((service) => (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        handleBooking={handleBooking}
                      />
                    ))}
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="training">
                <Title order={2} ta="center" mb="xl">
                  Training Programs
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {services
                    ?.filter((item) => item.category_id === 2)
                    .map((service) => (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        handleBooking={handleBooking}
                      />
                    ))}
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="beauty">
                <Title order={2} ta="center" mb="xl">
                  Beauty Services
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {services
                    ?.filter((item) => item.category_id === 3)
                    .map((service) => (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        handleBooking={handleBooking}
                      />
                    ))}
                </SimpleGrid>
              </Tabs.Panel>
            </>
          )}
        </Tabs>
      </Container>
    </main>
  );
}

const ServiceCard = ({ service, handleBooking }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`/img/${service?.image_url}`}
          height={200}
          alt={service?.subcategory}
        />
      </Card.Section>

      <Title order={3} mt="md" mb="xs" size="h4">
        {service?.subcategory}
      </Title>

      <Text size="sm" c="dimmed" mb="md">
        {service?.service_content}
      </Text>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => handleBooking(service?.subcategory)}
      >
        Book Now
      </Button>
    </Card>
  );
};

const ServiceCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={200} />
      </Card.Section>

      <Stack mt="md" gap="sm">
        <Skeleton height={24} width="60%" />
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <Skeleton height={36} mt="md" />
      </Stack>
    </Card>
  );
};
