"use client";

import { createClient } from "@/app/utils/supabase/client";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Group,
  Paper,
  Rating,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../_store/authStore";

export default function TherapistReview() {
  const supabase = createClient();
  const { userInfo } = useAuthStore();

  const [reviews, setReviews] = useState<any[]>([]);

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("review_list")
      .select(`*, therapist_list (*), customers_list (*)`)
      .eq("therapist_id", userInfo?.id);
    if (error) {
      console.log("----", error);
      return;
    }
    setReviews(data);
  };

  useEffect(() => {
    if (userInfo?.id) getReviews();
  }, [userInfo?.id]);

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder mt={"xl"}>
      <Title order={3}>Reviews</Title>
      <Carousel
        mt={"lg"}
        withIndicators
        height={200}
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {reviews.map((review, index) => (
          <Carousel.Slide my={"auto"} key={index}>
            <Card withBorder h={200} className="flex flex-col justify-between">
              <Box>
                <Group mb="md">
                  <Avatar
                    radius="xl"
                    src={review?.customers_list?.avatar_url}
                    name={review?.customers_list?.name}
                    color="initials"
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
    </Paper>
  );
}
