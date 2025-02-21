"use client";

import {
  Button,
  Card,
  Container,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function CustomerPage() {
  const supabase = createClient();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any[]>([]);

  const handleBooking = (service: string) => {
    router.push(`/therapist/list?service=${service}`);
  };

  const handlefetchCategory = async () => {
    const { data, error } = await supabase.from("service_category").select();
    if (error) {
      console.log("error", error);
      return;
    }
    setCategory(data);
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
    handlefetchCategory();
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
        <Tabs defaultValue={"1"} color="#46A7B0">
          <Tabs.List grow mb="xl">
            {category?.map((category, index) => {
              return (
                <Tabs.Tab
                  value={String(category.id)}
                  key={index}
                  // leftSection={<IconMassage size={16} />}
                >
                  {category?.category}
                </Tabs.Tab>
              );
            })}
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
              {category?.map((category, index) => {
                return (
                  <Tabs.Panel value={String(category?.id)} key={index}>
                    <Title order={2} ta="center" mb="xl">
                      {category?.category}
                    </Title>
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                      {services
                        ?.filter((item) => item.category_id === category?.id)
                        .map((service) => (
                          <ServiceCard
                            key={service.name}
                            service={service}
                            handleBooking={handleBooking}
                          />
                        ))}
                    </SimpleGrid>
                  </Tabs.Panel>
                );
              })}
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
          src={`${service?.image_url}`}
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
      <button
        className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit mx-auto"
        onClick={() => handleBooking(service?.id)}
      >
        <span className="text-[#46A7B0] md:text-xl sm:text-base">B</span>
        <span className="md:text-xl sm:text-base">ook</span>
        &nbsp;
        <span className="text-[#46A7B0] md:text-xl sm:text-base">N</span>
        <span className="md:text-xl sm:text-base">ow</span>
      </button>
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
