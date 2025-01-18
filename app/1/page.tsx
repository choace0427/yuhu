"use client";

import {
  MantineProvider,
  Container,
  Paper,
  Grid,
  Avatar,
  Text,
  Badge,
  Stack,
  Card,
  Group,
  TextInput,
  Button,
  Rating,
  Textarea,
  Divider,
} from "@mantine/core";
import {
  IconClock,
  IconCalendar,
  IconCreditCard,
  IconBrandVisa,
} from "@tabler/icons-react";
import { useState } from "react";

function App() {
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);

  const therapist = {
    name: "Dr. Emily Johnson",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    hourlyRate: 150,
    category: "Cognitive Behavioral Therapy",
    bookingTimes: [
      "Monday, 2:00 PM - 3:00 PM",
      "Wednesday, 10:00 AM - 11:00 AM",
    ],
  };

  const handlePayment = () => {
    // Handle payment logic here
    setShowReview(true);
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    setShowReview(false);
  };

  return (
    <MantineProvider>
      <Container size="md" py="xl">
        {!showReview ? (
          <Grid>
            <Grid.Col span={7}>
              <Paper shadow="sm" p="md" radius="md">
                <Group mb="xl">
                  <Avatar src={therapist.avatar} size={80} radius={40} />
                  <div>
                    <Text size="xl" fw={700}>
                      {therapist.name}
                    </Text>
                    <Text c="dimmed">Hourly Rate: ${therapist.hourlyRate}</Text>
                  </div>
                </Group>

                <Stack gap="md">
                  <div>
                    <Text fw={600} mb="xs">
                      Therapy Category
                    </Text>
                    <Badge size="lg" variant="light">
                      {therapist.category}
                    </Badge>
                  </div>

                  <div>
                    <Text fw={600} mb="xs">
                      Booked Times
                    </Text>
                    {therapist.bookingTimes.map((time, index) => (
                      <Group key={index} mb="xs">
                        <IconClock size={18} />
                        <Text size="sm">{time}</Text>
                      </Group>
                    ))}
                  </div>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={5}>
              <Card shadow="sm" padding="lg" radius="md">
                <Text size="xl" fw={700} mb="md">
                  Payment Details
                </Text>

                <Stack gap="md">
                  <Group gap="xs">
                    <IconBrandVisa size={24} />
                    <Text size="sm">Credit Card</Text>
                  </Group>

                  <TextInput
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                  />

                  <Group grow>
                    <TextInput label="Expiry Date" placeholder="MM/YY" />
                    <TextInput label="CVC" placeholder="123" />
                  </Group>

                  <TextInput label="ZIP/Postal Code" placeholder="12345" />

                  <Button fullWidth size="md" onClick={handlePayment} mt="md">
                    Pay ${therapist.hourlyRate}
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        ) : (
          <Paper shadow="sm" p="xl" radius="md">
            <Text size="xl" fw={700} mb="xl">
              Leave a Review
            </Text>

            <Stack gap="md">
              <div>
                <Text fw={500} mb="xs">
                  Rate your experience
                </Text>
                <Rating value={rating} onChange={setRating} size="lg" />
              </div>

              <Textarea
                label="Your Review"
                placeholder="Share your experience with Dr. Johnson..."
                minRows={4}
              />

              <Group justify="flex-end" mt="md">
                <Button variant="subtle" onClick={() => setShowReview(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReviewSubmit}>Submit Review</Button>
              </Group>
            </Stack>
          </Paper>
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;
