"use client";

import { useState, useRef, useEffect } from "react";
import {
  Paper,
  TextInput,
  Button,
  Stack,
  ScrollArea,
  Text,
  Avatar,
  Group,
  Card,
  ActionIcon,
  Loader,
  Textarea,
} from "@mantine/core";
import { IconSend, IconMessageChatbot, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "yuhu-chat-data";

export function ChatWidget() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { messages: savedMessages } = JSON.parse(savedData);
      const processedMessages = savedMessages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(processedMessages);
    }
  }, []);

  useEffect(() => {
    const dataToSave: any = { messages };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [messages]);

  const handleQuery = async (userInput: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CHAT_API_URL}/api/get-best-therapist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userInput),
        }
      );

      const responseText = await response.text();
      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      if (data.success) {
        const parsedTherapists = data.therapistData.map(
          (therapistString: string) => JSON.parse(therapistString)
        );

        setMessages((prev) => [
          ...prev,
          {
            text:
              parsedTherapists.length > 0
                ? "Here are some recommended therapists for you:"
                : "No suitable therapist for you",
            isBot: true,
            timestamp: new Date(),
            therapists: parsedTherapists,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching therapist data:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error while fetching therapist data. Please try again.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "What service do you want? You can describe what you're looking for and I'll suggest the best therapists for you.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        text: input.trim(),
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    const userInput = input;
    setInput("");
    await handleQuery(userInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <ActionIcon
        variant="white"
        onClick={() => setIsOpen(true)}
        radius="xl"
        size="xl"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          //   backgroundColor: '#00afaf',
          border: "1px solid #46A7B0",
        }}
      >
        <IconMessageChatbot size={24} color="#00afaf" />
      </ActionIcon>
    );
  }

  return (
    <Paper
      shadow="md"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "380px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        animation: "slideUp 0.3s ease-out",
        backgroundColor: "white",
        borderRadius: "9px",
      }}
    >
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .message {
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <Group
        p="md"
        justify="space-between"
        style={{
          borderBottom: "1px solid var(--mantine-color-gray-3)",
          backgroundColor: "#00afaf",
          color: "white",
          borderTopLeftRadius: "var(--mantine-radius-md)",
          borderTopRightRadius: "var(--mantine-radius-md)",
        }}
      >
        <Text size="lg" fw={600}>
          Yuhu Ai Health Advisor
        </Text>
        <Button
          variant="subtle"
          color="white"
          size="compact-sm"
          onClick={() => setIsOpen(false)}
        >
          <IconX size={18} />
        </Button>
      </Group>

      <ScrollArea style={{ flex: 1 }} p="md" scrollbarSize={8}>
        <Stack gap="md">
          {messages.map((message, index) => (
            <>
              <div
                key={index}
                className="message"
                style={{
                  alignSelf: message.isBot ? "flex-start" : "flex-end",
                  maxWidth: "80%",
                }}
              >
                <Paper
                  p="sm"
                  radius="md"
                  bg={message.isBot ? "gray.1" : "#00afaf"}
                  c={message.isBot ? "dark" : "white"}
                >
                  <Text
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {message.text}
                  </Text>
                </Paper>
                <Stack gap="sm" mt={"sm"} className="message">
                  {message.therapists &&
                    message.therapists.length > 0 &&
                    message.therapists.map((therapist: any, index: number) => (
                      <Card key={index} withBorder padding="sm">
                        <Group>
                          <Avatar
                            src={therapist?.metadata.avatar_url}
                            name={therapist?.metadata.name}
                            color="initials"
                            size="md"
                            radius="md"
                          />
                          <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                              Dr.{therapist?.metadata.name}
                            </Text>
                            <Text size="sm" c="dimmed">
                              ${therapist.metadata.hourly_rate}/hr
                            </Text>
                            {/* <Text size="sm" c="teal">
                            ★ {therapist.rating}
                          </Text> */}
                          </div>
                          <Button
                            variant="light"
                            size="xs"
                            style={{
                              backgroundColor: "#00afaf",
                              color: "white",
                            }}
                            onClick={() => {
                              router.push(
                                `${process.env.NEXT_PUBLIC_APP_URL}/therapist/detail/${therapist?.id}`
                              );
                              setIsOpen(false);
                            }}
                          >
                            View
                          </Button>
                        </Group>
                      </Card>
                    ))}
                </Stack>
              </div>
            </>
          ))}
          {isLoading && <Loader color="green" type="dots" />}
          <div ref={messagesEndRef} />
        </Stack>
      </ScrollArea>

      <Paper
        p="md"
        style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
      >
        <Group>
          <Textarea
            placeholder="Type your message..."
            value={input}
            maxRows={4}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyDown={handleKeyPress}
            style={{ flex: 1 }}
            styles={{
              input: {
                height: "30px",
              },
            }}
          />
          <ActionIcon
            size={"lg"}
            onClick={handleSend}
            disabled={!input.trim()}
            style={{ backgroundColor: "#00afaf" }}
          >
            <IconSend size={18} color="white" />
          </ActionIcon>
        </Group>
      </Paper>
    </Paper>
  );
}
