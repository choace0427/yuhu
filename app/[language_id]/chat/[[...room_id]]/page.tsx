"use client";

import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconMessage,
  IconMoodSmile,
  IconNotification,
  IconSend,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { createClient } from "@/app/utils/supabase/client";
import { useAuthStore } from "../../_store/authStore";

export default function ChatPage(params: any) {
  const { language_id } = params;
  console.log("-----", language_id);
  const supabase = createClient();
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);

  const [editConversationId, setEditConversationId] = useState("");
  const [editText, setEditText] = useState("");

  const [searchChat, setSearchChat] = useState("");
  const [searchChatData, setSearchChatData] = useState<any>([]);
  const [searchChatLoading, setSearchChatLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData, messageId?: string) => {
    if (messageId) {
      console.log(`Adding reaction ${emojiData.emoji} to message ${messageId}`);
    } else {
      const emoji = emojiData.emoji;
      const cursorPosition = textareaRef.current?.selectionStart || 0;
      const updatedMessage =
        newMessage.slice(0, cursorPosition) +
        emoji +
        newMessage.slice(cursorPosition);
      setNewMessage(updatedMessage);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            cursorPosition + emoji.length,
            cursorPosition + emoji.length
          );
        }
      }, 0);
    }
  };

  const handleUpdateMessage = async () => {
    const { error } = await supabase
      .from("chats")
      .update({ messages: newMessage, status: "edited" })
      .eq("conversation_id", editConversationId)
      .single();
    if (error) {
      console.error(error);
      return;
    } else {
      setEditConversationId("");
      setEditText("");
      setNewMessage("");
    }
  };

  const handleMessageDelete = async (conversation_id: any) => {
    const { error } = await supabase
      .from("chats")
      .delete()
      .eq("conversation_id", conversation_id)
      .eq("room_id", params.params.room_id[0]);
    if (error) console.error(error);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      if (editConversationId) {
        handleUpdateMessage();
      } else {
        console.log("========");
        sendMessage();
      }
    }
  };

  const handleBlockUser = async (user_id: any, room_id: any) => {
    const columnToUpdate =
      userInfo?.role === "therapist" ? "customer_id" : "therapist_id";
    const newStatus = currentUser?.therapist_status === "" ? "block" : "";

    const { data, error } = await supabase
      .from("room")
      .update({ therapist_status: newStatus })
      .eq(columnToUpdate, user_id)
      .eq("rooms_id", room_id)
      .select();

    if (error) {
      console.error("Error sending message:", error);
      return;
    } else {
      // setTherapistStatus(data[0]?.therapist_status);
      console.log("success block/unblock");
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("chats").insert({
      room_id: params.params.room_id[0],
      messages: newMessage,
      sender_id: userInfo.id,
      receiver_id:
        userInfo?.role === "customer"
          ? currentUser?.therapist_id
          : currentUser?.customer_id,
    });

    if (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } else {
      setNewMessage("");
      setError(null);
    }
  };

  const getCurrentUser = async () => {
    if (userInfo?.role === "customer") {
      const { data: currentUser, error: currentUserError } = await supabase
        .from("room")
        .select("*, therapist_list(*)")
        .eq("rooms_id", params.params.room_id[0]);
      if (currentUserError) throw currentUserError;

      setCurrentUser(currentUser[0]);
    }
    if (userInfo?.role === "therapist") {
      const { data: currentUser, error: currentUserError } = await supabase
        .from("room")
        .select("*, customers_list(*)")
        .eq("rooms_id", params.params.room_id[0]);
      if (currentUserError) throw currentUserError;

      setCurrentUser(currentUser[0]);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("get_conversation_data", {
      input_rooms_id: params.params.room_id[0],
    });
    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const groupedMessages = messages.reduce((acc: any, msg: any) => {
    const date = dayjs(msg.created_at).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(msg);
    return acc;
  }, {});

  useEffect(() => {
    if (params.params.room_id) {
      getCurrentUser();
      fetchMessages();
      const BlockRealtime = supabase
        .channel("userblock-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "room",
          },
          (payload) => {
            console.log("Database change detected:", payload);
            // getCurrentUser();
          }
        )
        .subscribe();

      const chatInsertRealtime = supabase
        .channel("chatsInsert-db-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chats",
            filter: `room_id=eq.${params.params.room_id[0]}`,
          },
          (payload) => {
            setMessages((prevMessages) => {
              const newMessage = payload.new;
              if (newMessage) {
                return [...prevMessages, newMessage];
              }
              return prevMessages;
            });
          }
        )
        .subscribe();

      const chatUpdateRealtime = supabase
        .channel("chatsUpdate-db-changes")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "chats",
            filter: `room_id=eq.${params.params.room_id[0]}`,
          },
          (payload) => {
            const updatedMessage = payload.new;
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
                message.conversation_id === updatedMessage.conversation_id
                  ? { ...message, ...updatedMessage }
                  : message
              )
            );
          }
        )
        .subscribe();

      const chatDeleteRealtime = supabase
        .channel("chatsDelete-db-changes")
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "chats",
          },
          (payload) => {
            setMessages((prevMessages) => {
              const deletedMessageId = payload.old.conversation_id;
              if (deletedMessageId) {
                return prevMessages.filter(
                  (message) => message.conversation_id !== deletedMessageId
                );
              }
              return prevMessages;
            });
          }
        )
        .subscribe();

      return () => {
        BlockRealtime.unsubscribe();
        chatInsertRealtime.unsubscribe();
        chatUpdateRealtime.unsubscribe();
        chatDeleteRealtime.unsubscribe();
      };
    }
  }, [router]);

  return (
    <>
      {params.params.room_id ? (
        <div className="w-full">
          {/* <Flex align={"center"} gap={"sm"} mb={"sm"}>
      <div
        ref={searchContainerRef}
        className="flex flex-col items-center relative w-full"
      >
        <TextInput
          placeholder="Search chat here"
          leftSection={<IconSearch size="1rem" />}
          rightSection={
            searchChatLoading ? (
              <Loader size="xs" />
            ) : (
              <IconX
                size={"1rem"}
                className="hover:cursor-pointer"
                onClick={() => {
                  // setSearchChat(null);
                  handleSearchChat();
                }}
              />
            )
          }
          w="100%"
          value={searchChat}
          onChange={(e) => setSearchChat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchChat !== "") {
              e.preventDefault();
              handleSearchChat();
            }
          }}
          onFocus={() =>
            searchChatData.length > 0 && setShowSearchResults(true)
          }
        />
        {searchChatData.length > 0 ? (
          <Card
            withBorder
            pr={0}
            className="!absolute top-[38px] w-[98%] mx-auto z-20"
          >
            <ScrollArea.Autosize mah={160} scrollbarSize={6}>
              <Flex direction="column" gap="sm">
                {searchChatData.map((item: any) => {
                  return (
                    <Flex gap="sm" align="center" key={item.chat_id}>
                      <Text>{item.messages}</Text>
                    </Flex>
                  );
                })}
              </Flex>
            </ScrollArea.Autosize>
          </Card>
        ) : (
          searchChat !== "" &&
          !searchChatLoading && (
            <div className="absolute top-[38px]">No Messages</div>
          )
        )}
      </div>

    </Flex> */}

          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                src={
                  userInfo?.role === "customer"
                    ? currentUser?.therapist_avatar_url
                    : currentUser?.customer_avatar_url
                }
                name={
                  userInfo?.role === "customer"
                    ? currentUser?.therapist_name
                    : currentUser?.customer_name
                }
                color="initials"
                radius={"xl"}
                size={46}
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {userInfo?.role === "customer"
                    ? currentUser?.therapist_name
                    : currentUser?.customer_name}
                </h3>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <Menu shadow="md" width={200} position="bottom-end" styles={{}}>
              <Menu.Target>
                <IconDotsVertical
                  size={"1.2rem"}
                  className="hover:cursor-pointer"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>
                  View Profile
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconNotification size={14} />}
                  onClick={() =>
                    handleBlockUser(currentUser.user_id, currentUser.rooms_id)
                  }
                >
                  {currentUser?.therapist_status === "block"
                    ? "Unblock User"
                    : "Block User"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <ScrollArea
            // className="!h-[calc(100vh - 230px)] relative bg-gray-100"
            offsetScrollbars
            scrollbarSize={6}
            scrollHideDelay={2500}
            py={"sm"}
            px={30}
            styles={{
              root: {
                height: "calc(100vh - 230px)",
              },
            }}
          >
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            {userInfo &&
              Object.keys(groupedMessages).map((date) => (
                <div key={date}>
                  <div className="text-center my-4 text-gray-500 text-sm">
                    {(() => {
                      const messageDate = dayjs(date);
                      const today = dayjs();
                      const yesterday = dayjs().subtract(1, "day");

                      if (messageDate.isSame(today, "day")) {
                        return "Today";
                      } else if (messageDate.isSame(yesterday, "day")) {
                        return "Yesterday";
                      } else {
                        return messageDate.format("YYYY-MM-DD");
                      }
                    })()}
                  </div>

                  {groupedMessages[date].map((msg: any, index: number) => {
                    const isSender = msg.sender_id === userInfo.id;
                    return (
                      <div
                        key={msg.conversation_id || index}
                        className={`w-full flex mb-2 ${
                          isSender ? "items-end" : "items-start"
                        } flex-col`}
                        onMouseEnter={() =>
                          setHoveredMessage(msg.conversation_id)
                        }
                        onMouseLeave={() => setHoveredMessage(null)}
                      >
                        <div
                          className={`flex mb-3 relative ${
                            isSender ? "flex-row" : "flex-row-reverse"
                          } gap-2 items-start`}
                        >
                          <div
                            className={`relative flex items-end ${
                              !isSender ? "" : "flex-row-reverse"
                            }`}
                          >
                            <div className={`flex gap-1 items-end flex-col`}>
                              <div
                                className={`p-[12px] max-w-[450px] relative break-words whitespace-pre-wrap rounded-md ${
                                  isSender
                                    ? "text-white bg-black"
                                    : "text-black bg-[#E6E6E6]"
                                }`}
                              >
                                {msg.messages}
                                <Flex align={"center"} gap={"sm"}>
                                  <Text size="xs" mt={"3"}>
                                    {dayjs(msg.created_at).format("hh:mm A")}
                                  </Text>
                                  {msg?.status === "edited" && (
                                    <Text size="xs" mt={2}>
                                      (edited)
                                    </Text>
                                  )}
                                </Flex>
                              </div>
                            </div>

                            {/* <Text
                            size="xs"
                            mt={"3"}
                            className={`${
                              isSender ? "text-start" : "text-end"
                            }`}
                          >
                            {dayjs(msg.created_at).format("hh:mm A")}
                          </Text> */}
                          </div>
                          {hoveredMessage === msg.conversation_id && (
                            <Box
                              className={`absolute top-[10px] ${
                                isSender ? "left-[-50px]" : "right-[-10px]"
                              }  transform translate-x-full -translate-y-1/2`}
                            >
                              <Menu
                                shadow="md"
                                width={200}
                                position={
                                  isSender ? "bottom-end" : "bottom-start"
                                }
                              >
                                <Menu.Target>
                                  <ActionIcon size="xs" variant="transparent">
                                    <IconDotsVertical size={16} color="gray" />
                                  </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                  <Menu.Item
                                    leftSection={<IconCopy size={14} />}
                                    onClick={() => {
                                      navigator.clipboard
                                        .writeText(msg.messages)
                                        .then(() => {
                                          toast.success(
                                            "Message copied to clipboard!",
                                            {
                                              position: "bottom-right",
                                            }
                                          );
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                    }}
                                  >
                                    Copy text
                                  </Menu.Item>

                                  {msg?.sender_id === userInfo?.id && (
                                    <>
                                      <Menu.Item
                                        leftSection={<IconEdit size={14} />}
                                        onClick={() => {
                                          setEditConversationId(
                                            msg.conversation_id
                                          );
                                          setEditText(msg.messages);
                                          setNewMessage(msg.messages);
                                          textareaRef.current?.focus();
                                        }}
                                      >
                                        Edit
                                      </Menu.Item>
                                      <Menu.Item
                                        leftSection={<IconTrash size={14} />}
                                        onClick={() =>
                                          handleMessageDelete(
                                            msg?.conversation_id
                                          )
                                        }
                                      >
                                        Remove
                                      </Menu.Item>
                                    </>
                                  )}
                                </Menu.Dropdown>
                              </Menu>
                            </Box>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            {currentUser?.therapist_status === "block" ? (
              <Divider
                my="xs"
                variant="dashed"
                label="You blocked this user"
                labelPosition="center"
                styles={{
                  label: {
                    color: "red",
                  },
                }}
              />
            ) : (
              <></>
            )}
          </ScrollArea>
          <div className="flex items-center mx-4 mt-6 gap-2 h-[30px]">
            <Popover
              position="top-end"
              withArrow
              shadow="md"
              styles={{
                dropdown: {
                  padding: "0px",
                  borderRadius: "0px",
                },
              }}
            >
              <Popover.Target>
                <ActionIcon variant="transparent" radius={"xl"}>
                  <IconMoodSmile />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <div>
                  <EmojiPicker
                    skinTonesDisabled
                    onEmojiClick={(emojiData) => handleEmojiClick(emojiData)}
                  />
                </div>
              </Popover.Dropdown>
            </Popover>
            <Textarea
              placeholder="Type a message..."
              value={newMessage}
              ref={textareaRef}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              w={"100%"}
              rows={1}
              size="md"
              disabled={
                currentUser?.therapist_status === "block" ? true : false
              }
              rightSection={
                <ActionIcon variant="transparent" onClick={sendMessage}>
                  <IconSend color="#46A7B0" />
                </ActionIcon>
              }
            />
          </div>
        </div>
      ) : (
        <Center w={"100%"}>
          <Card
            shadow="none"
            padding="xl"
            radius="md"
            style={{
              width: "100%",
            }}
          >
            <Stack align="center" gap="xl">
              <ThemeIcon size={80} radius="xl" variant="light" color="#46A7B0">
                <IconMessage size={40} />
              </ThemeIcon>

              <Text size="xl" fw={700}>
                Welcome to Massage Chat
              </Text>

              <Text color="dimmed" ta="center" size="sm">
                Connect with our therapists, book appointments, and get answers
                to your questions. Select a therapist from the list to start
                chatting.
              </Text>

              <Group ps="center">
                <Avatar.Group spacing="sm">
                  <Avatar src="https://i.pravatar.cc/300?img=1" radius="xl" />
                  <Avatar src="https://i.pravatar.cc/300?img=2" radius="xl" />
                  <Avatar src="https://i.pravatar.cc/300?img=3" radius="xl" />
                  <Avatar radius="xl">+3</Avatar>
                </Avatar.Group>
              </Group>
            </Stack>
          </Card>
        </Center>
      )}
    </>
  );
}
