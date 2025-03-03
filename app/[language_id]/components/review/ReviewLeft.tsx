import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Textarea,
  Rating,
  Button,
  Group,
  Stack,
  Avatar,
  Select,
  Divider,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconStar,
  IconMessageCircle,
  IconUser,
  IconMail,
  IconCategory,
  IconSend,
} from "@tabler/icons-react";

interface ReviewForm {
  name: string;
  email: string;
  category: string;
  rating: number;
  title: string;
  review: string;
}

export default function ReviewPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReviewForm>({
    initialValues: {
      name: "",
      email: "",
      category: "",
      rating: 0,
      title: "",
      review: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      category: (value) => (!value ? "Please select a category" : null),
      rating: (value) => (value === 0 ? "Please select a rating" : null),
      title: (value) =>
        value.length < 3 ? "Title must be at least 3 characters" : null,
      review: (value) =>
        value.length < 10 ? "Review must be at least 10 characters" : null,
    },
  });

  const handleSubmit = (values: ReviewForm) => {
    console.log(values);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container size="sm" py="xl">
        <Paper shadow="md" radius="md" p="xl" withBorder>
          <Stack align="center" gap="md">
            <IconStar size={48} color="#228BE6" stroke={1.5} />
            <Title order={2}>Thank You for Your Review!</Title>
            <Text c="dimmed" ta="center">
              Your feedback has been submitted successfully. We appreciate your
              time and input!
            </Text>
            <Button onClick={() => setSubmitted(false)}>
              Write Another Review
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Group justify="center">
              <Avatar
                size={60}
                radius="xl"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80"
              />
            </Group>

            <Title order={2} ta="center">
              Share Your Experience
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Your feedback helps us improve and helps others make better
              decisions
            </Text>

            <Divider />

            <Group grow>
              <TextInput
                label="Name"
                placeholder="Your name"
                leftSection={<IconUser size={16} />}
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Email"
                placeholder="your@email.com"
                leftSection={<IconMail size={16} />}
                {...form.getInputProps("email")}
              />
            </Group>

            <Select
              label="Category"
              placeholder="Select a category"
              leftSection={<IconCategory size={16} />}
              data={[
                "Product Quality",
                "Customer Service",
                "Shipping",
                "Website Experience",
                "Other",
              ]}
              {...form.getInputProps("category")}
            />

            <Stack gap="xs">
              <Text size="sm" fw={500}>
                Rating
              </Text>
              <Rating size="lg" count={5} {...form.getInputProps("rating")} />
            </Stack>

            <TextInput
              label="Review Title"
              placeholder="Summarize your experience"
              leftSection={<IconMessageCircle size={16} />}
              {...form.getInputProps("title")}
            />

            <Textarea
              label="Your Review"
              placeholder="Tell us about your experience in detail..."
              minRows={4}
              {...form.getInputProps("review")}
            />

            <Button
              type="submit"
              size="md"
              leftSection={<IconSend size={rem(16)} />}
              fullWidth
            >
              Submit Review
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
