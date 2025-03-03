import { useState, useEffect } from "react";
import {
  Paper,
  Text,
  ScrollArea,
  TextInput,
  Button,
  Group,
  Avatar,
  Stack,
  ActionIcon,
  Tooltip,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconSend,
  IconPaperclip,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";

interface Message {
  id: string;
  sender: "user" | "therapist";
  content: string;
  timestamp: Date;
}

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: "available" | "busy" | "offline";
  rating: number;
  speciality: string;
}

interface ChatSectionProps {
  selectedMember: Member | null;
}

export function ChatSection({ selectedMember }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (selectedMember) {
      // Simulated fetch of chat history
      setMessages([
        {
          id: "1",
          sender: "user",
          content: "Hi, I'm interested in booking a massage.",
          timestamp: new Date(Date.now() - 100000),
        },
        {
          id: "2",
          sender: "therapist",
          content:
            "Hello! I'd be happy to help. What type of massage are you looking for?",
          timestamp: new Date(Date.now() - 80000),
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [selectedMember]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedMember) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  if (!selectedMember) {
    return (
      <Paper
        shadow="xs"
        p="xl"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack align="center" gap="xl">
          <Text size="xl" fw={700}>
            Welcome to Massage Chat
          </Text>
          <Text c="dimmed" ta="center">
            Select a therapist from the list to start chatting and book your
            session.
          </Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      shadow="xs"
      p="md"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Group mb="md" ps="apart">
        <Group>
          <Avatar src={selectedMember.avatar} size="lg" radius="xl" />
          <div>
            <Text size="lg" fw={500}>
              {selectedMember.name}
            </Text>
            <Group gap="xs">
              <Badge
                size="sm"
                variant="light"
                color={
                  selectedMember.status === "available"
                    ? "green"
                    : selectedMember.status === "busy"
                    ? "yellow"
                    : "gray"
                }
              >
                {selectedMember.status}
              </Badge>
              <Badge size="sm" variant="light" color="blue">
                {selectedMember.speciality}
              </Badge>
            </Group>
          </div>
        </Group>
        <Group>
          <Tooltip label="Book appointment">
            <ActionIcon variant="light" color="blue" size="lg">
              <IconCalendar size="1.2rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="View availability">
            <ActionIcon variant="light" color="grape" size="lg">
              <IconClock size="1.2rem" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <Divider mb="md" />
      <ScrollArea style={{ flex: 1 }} mb="md">
        {messages.map((message) => (
          <Paper
            key={message.id}
            p="xs"
            mb="xs"
            withBorder
            style={{
              maxWidth: "70%",
              marginLeft: message.sender === "user" ? "auto" : 0,
              backgroundColor:
                message.sender === "user" ? "#E9ECEF" : "#F1F3F5",
            }}
          >
            <Text size="sm">{message.content}</Text>
            <Text size="xs" c="dimmed" ta="right">
              {message.timestamp.toLocaleTimeString()}
            </Text>
          </Paper>
        ))}
      </ScrollArea>
      <Group>
        <TextInput
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.currentTarget.value)}
          style={{ flex: 1 }}
          rightSection={
            <Tooltip label="Add attachment">
              <ActionIcon variant="subtle">
                <IconPaperclip size="1rem" />
              </ActionIcon>
            </Tooltip>
          }
        />
        <Button
          onClick={handleSendMessage}
          leftSection={<IconSend size="1rem" />}
        >
          Send
        </Button>
      </Group>
    </Paper>
  );
}
