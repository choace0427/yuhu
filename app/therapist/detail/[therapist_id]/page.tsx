"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Badge,
  Card,
  Grid,
  Avatar,
  Stack,
  Box,
  Rating,
  Skeleton,
} from "@mantine/core";
import { IconAward, IconHeart, IconShield } from "@tabler/icons-react";

import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

export default function Home(params: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const [userId, setUserId] = useState(
    params.params.therapist_id.split("_")[0]
  );
  const [serviceType, setServiceType] = useState(
    params.params.therapist_id.split("_")[1]
  );

  const getUserData = async (userId: string, serviceType: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("therapist_list")
        .select(
          `
              id,
              name,
              email,
              hourly_rate,
              phone,
              location,
              birthday,
              summary,
              avatar_url,
              services!inner (
                user_id,
                service_description,
                service_type!inner (
                  id,
                  subcategory
                )
              )
            `
        )
        .eq("id", userId)
        .eq("services.service_type.subcategory", serviceType)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = () => {
    router.push(`/booking/${userId}`);
  };

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("review_list")
      .select(`*, therapist_list (*), customers_list (*)`)
      .eq("therapist_id", params.params.therapist_id.split("_")[0]);
    if (error) {
      console.log("----", error);
      return;
    }
    setReviews(data);
  };

  useEffect(() => {
    getUserData(userId, serviceType);
    getReviews();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.0" py={40}>
        <Container size="lg">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group align="flex-start" gap="lg">
                <Avatar
                  src={userData?.avatar_url || ""}
                  name={userData?.name}
                  size={120}
                  radius="md"
                />
                <Box>
                  <Title order={1} mb="xs">
                    {userData?.name}
                  </Title>
                  <Text size="lg" c="dimmed">
                    Licensed Massage Therapist
                  </Text>
                  <Group gap="xs" mt="md">
                    <Badge variant="light">10+ Years Experience</Badge>
                    <Badge variant="light">Certified Specialist</Badge>
                  </Group>
                </Box>
              </Group>

              <Text mt="xl" size="lg" c="dimmed" lineClamp={3}>
                {userData?.summary || "Unknown"}
              </Text>

              <Group mt="xl">
                <Button onClick={() => handleConfirmBooking()}>
                  Book Appointment
                </Button>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder>
                <Grid>
                  <Grid.Col span={4}>
                    <Stack align="center">
                      <IconAward size={32} stroke={1.5} />
                      <Text fw={700}>Certified</Text>
                      <Text size="sm" c="dimmed">
                        Professional
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Stack align="center">
                      <IconHeart size={32} stroke={1.5} />
                      <Text fw={700}>500+</Text>
                      <Text size="sm" c="dimmed">
                        Happy Clients
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Stack align="center">
                      <IconShield size={32} stroke={1.5} />
                      <Text fw={700}>10+ Years</Text>
                      <Text size="sm" c="dimmed">
                        Experience
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container size="lg" py={80}>
        <Title order={2} ta="center" mb="xs">
          My Services
        </Title>
        <Text c="dimmed" ta="center" mb={40} maw={600} mx="auto">
          Personalized massage therapy sessions tailored to your specific needs
          and preferences
        </Text>
        <Grid>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TherapistCardSkeleton key={index} />
              ))
            : userData &&
              userData?.services?.map((item: any, index: number) => {
                return (
                  <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
                    <Card withBorder padding="lg">
                      <Stack>
                        <Box>
                          <Text fw={700} size="lg">
                            {item?.service_type?.subcategory}
                          </Text>
                        </Box>
                        <Text size="sm">{item?.service_description}</Text>
                        <Group
                          justify="space-between"
                          align="center"
                          style={{ width: "100%" }}
                        >
                          <Text
                            fw={700}
                            size="xl"
                            lineClamp={3}
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                            }}
                          >
                            ${userData?.hourly_rate || 0}/hour
                          </Text>
                          {/* <Button variant="light">Book Now</Button> */}
                        </Group>
                      </Stack>
                    </Card>
                  </Grid.Col>
                );
              })}
        </Grid>
      </Container>

      {/* Reviews Section */}
      <Box bg="gray.0" py={80}>
        <Container size="lg">
          <Title order={2} ta="center" mb="xs">
            Client Reviews
          </Title>
          <Text c="dimmed" ta="center" mb={40} maw={600} mx="auto">
            Read what my clients have to say about their massage therapy
            experiences
          </Text>
          {reviews && reviews.length > 0 ? (
            <Carousel
              withIndicators
              height={200}
              slideSize={{ base: "80%", sm: "50%", md: "33.33333%" }}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
            >
              {reviews.map((review, index) => (
                <Carousel.Slide my={"auto"} key={index}>
                  <Card
                    withBorder
                    h={200}
                    className="flex flex-col justify-between"
                  >
                    <Box>
                      <Group mb="md">
                        <Avatar
                          radius="xl"
                          src={review?.customers_list?.avatar_url}
                          name={review?.customers_list?.name}
                        />
                        <Box>
                          <Text fw={500}>{review?.therapist_list?.name}</Text>
                          <Rating value={review?.rating} readOnly />
                        </Box>
                        <Badge variant="light" ml="auto">
                          Verified
                        </Badge>
                      </Group>
                      <Text size="sm" lineClamp={4} c="dimmed">
                        {review?.review_content}
                      </Text>
                    </Box>
                    <Text
                      size="xs"
                      fw={600}
                      color="blue"
                      ta={"end"}
                      mt={"sm"}
                      className="hover:cursor-pointer"
                    >
                      View
                    </Text>
                  </Card>
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <Text ta={"center"} fw={600}>
              No Reviews
            </Text>
          )}
        </Container>
      </Box>
    </Box>
  );
}

const TherapistCardSkeleton = () => {
  return (
    <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Skeleton height={24} width="30%" mb="md" />
        <Skeleton height={16} mb="lg" />
        <Group justify="space-between" align="center">
          <Skeleton height={20} width={100} />
          <Skeleton height={36} width={100} />
        </Group>
      </Card>
    </Grid.Col>
  );
};
