"use client";

import { supabase } from "@/supabase";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_store/authStore";
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Loader,
  LoadingOverlay,
  Menu,
  Popover,
  ScrollArea,
  Skeleton,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconCopy,
  IconDotsVertical,
  IconEdit,
  IconMoodSmile,
  IconNotification,
  IconPencil,
  IconSearch,
  IconSend,
  IconSettings,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

type User = {
  id: string;
  name: string;
};

type Therapist = {
  id: string;
  name: string;
};

export default function ChatPage(params: any) {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );
  const [currentUser, setCurrentUser] = useState([]);
  const [conversationData, setConversationData] = useState([]);
  const [chatMembers, setChatMembers] = useState([]);

  const [chatMembersLoading, setChatMembersLoading] = useState(false);

  const selectChatUser = async (
    sender_id: any,
    receiver_id: any,
    role: any
  ) => {
    const { data: roomData, error: roomError } = await supabase
      .from("room")
      .select("*")
      .eq("customer_id", role === "customer" ? sender_id : receiver_id)
      .eq("therapist_id", role === "therapist" ? sender_id : receiver_id);

    if (roomError) {
      console.error("Error fetching room data:", roomError);
    } else if (roomData && roomData.length > 0) {
      router.push(`/chat/${roomData[0]?.rooms_id}`);
    } else {
      const { data: newRoomData, error: insertError } = await supabase
        .from("room")
        .insert([
          {
            therapist_id: role === "therapist" ? sender_id : receiver_id,
            customer_id: role === "customer" ? sender_id : receiver_id,
          },
        ])
        .select();

      if (insertError) {
        console.error("Error creating new room:", insertError);
      } else if (newRoomData && newRoomData.length > 0) {
        router.push(`/chat/${newRoomData[0]?.rooms_id}`);
      } else {
        console.error("Unexpected error: Room creation returned no data.");
      }
    }
  };

  const getCurrentUser = async () => {
    const { data: getCurrentUserData, error } = await supabase.rpc(
      "get_current_user",
      {
        input_rooms_id: params.params.room_id,
        input_role: userInfo?.role,
      }
    );

    if (error) {
      console.error("Error fetching current user:", error);
    } else {
      setCurrentUser(getCurrentUserData);
    }
  };

  const fetchChatMembers = async (input_search_text: any) => {
    setChatMembersLoading(true);
    if (userInfo) {
      try {
        const { data: therapist_list, error } = await supabase.rpc(
          "chat_members",
          {
            input_member_id: userInfo.id,
            input_role: userInfo.role,
            input_search_text: input_search_text,
          }
        );

        if (error) {
          console.error("Error fetching chat members:", error);
        } else {
          setChatMembers(therapist_list);
        }
      } catch (err) {
        console.error("Error executing RPC:", err);
      }
    }
    setChatMembersLoading(false);
  };

  useEffect(() => {
    fetchChatMembers("");
  }, [userInfo]);

  useEffect(() => {
    const BlockRealtime = supabase
      .channel("userblock-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room",
          // filter: `rooms_id=eq.${currentUser[0]?.rooms_id}`,
        },
        (payload) => {
          console.log("Database change detected:", payload);
          getCurrentUser();
        }
      )
      .subscribe();

    return () => {
      BlockRealtime.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userInfo) getCurrentUser();
  }, [userInfo]);

  return (
    <div className="flex">
      <TherapistList
        chatMembers={chatMembers}
        selectChatUser={selectChatUser}
        selectedTherapist={selectedTherapist}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        chatMembersLoading={chatMembersLoading}
        setChatMembersLoading={setChatMembersLoading}
        setChatMembers={setChatMembers}
        fetchChatMembers={fetchChatMembers}
      />
      {conversationData ? (
        <ChatSection
          room_id={params.params.room_id}
          getCurrentUser={getCurrentUser}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <div className="w-2/3 flex items-center justify-center">
          <p>Select a therapist to start chatting</p>
        </div>
      )}
    </div>
  );
}

const TherapistList = ({
  chatMembers,
  selectChatUser,
  currentUser,
  chatMembersLoading,
  setChatMembers,
  fetchChatMembers,
  setChatMembersLoading,
}: any) => {
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { userInfo } = useAuthStore();
  let skeletions_count = 8;
  const [searchMembers, setSearchMembers] = useState("");
  const handleMemberSearch = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setChatMembersLoading(true);
      await fetchChatMembers(searchMembers);
      setChatMembersLoading(false);
    }
  };

  return (
    <div className="max-w-[350px] w-full p-4 border-r">
      <TextInput
        placeholder="Search members"
        leftSection={<IconSearch size={"1.2rem"} />}
        rightSection={
          searchMembers.trim() !== "" ? (
            chatMembersLoading ? (
              <Loader size={"sm"} />
            ) : (
              <IconX
                size={"1.2rem"}
                className="hover:cursor-pointer"
                onClick={() => {
                  fetchChatMembers("");
                  setSearchMembers("");
                }}
              />
            )
          ) : (
            <></>
          )
        }
        mb={"sm"}
        value={searchMembers}
        onChange={(e: any) => setSearchMembers(e.target.value)}
        onKeyDown={handleMemberSearch}
      />
      <ul>
        {chatMembersLoading &&
          Array.from({ length: skeletions_count }).map((_, index) => {
            return (
              <div key={index} className="flex gap-2 p-2">
                <div>
                  <Skeleton height={50} circle />
                </div>
                <div className="w-full flex flex-col justify-evenly">
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} radius="xl" />
                </div>
              </div>
            );
          })}

        {chatMembers &&
          chatMembers.length > 0 &&
          chatMembers.map((member: any, index: number) => (
            <li
              key={index}
              onClick={() =>
                selectChatUser(userInfo?.id, member?.id, userInfo?.role)
              }
              className={`flex items-center p-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                currentUser[0]?.user_id === member.id ? "bg-[#46A7B0]" : ""
              }`}
            >
              {/* userInfo?.role === "customer" ?  */}
              <Avatar
                src={member?.avatar}
                alt={member?.name}
                radius={"xl"}
                size={46}
              />
              <Flex direction={"column"} ml={"sm"}>
                <Text size="md" fw={600}>
                  {member?.name}
                </Text>
                <Text size="xs" fw={500}>
                  {member?.name || "asdfasd"}
                </Text>
              </Flex>

              {unreadCounts[member.id] > 0 && (
                <div className="ml-2 text-sm text-red-500 font-medium">
                  {unreadCounts[member.id]} unread
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
const ChatSection = ({ room_id, currentUser }: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userInfo } = useAuthStore();

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
      .eq("room_id", room_id);
    if (error) console.error(error);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      if (editConversationId) {
        handleUpdateMessage();
      } else {
        sendMessage();
      }
    }
  };

  const handleBlockUser = async (user_id: any, room_id: any) => {
    const columnToUpdate =
      userInfo?.role === "therapist" ? "customer_id" : "therapist_id";
    const newStatus = currentUser[0]?.therapist_status === "" ? "block" : "";

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
      room_id: room_id,
      messages: newMessage,
      sender_id: userInfo.id,
      receiver_id: currentUser[0]?.user_id,
    });

    if (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } else {
      setNewMessage("");
      setError(null);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase.rpc("get_conversation_data", {
      input_rooms_id: room_id,
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

  const handleSearchChat = async () => {
    setSearchChatLoading(true);

    try {
      const { data, error } = await supabase.rpc("search_chats", {
        input_room_id: room_id,
        input_search_text: searchChat,
      });

      if (error) {
        console.error("Error searching chats:", error.message);
        setSearchChatData([]);
      } else {
        console.log("Search results:", data);
        setSearchChatData(data || []);
        setShowSearchResults(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setSearchChatData([]);
    } finally {
      setSearchChatLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const chatInsertRealtime = supabase
      .channel("chatsInsert-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chats",
          filter: `room_id=eq.${room_id}`,
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
          filter: `room_id=eq.${room_id}`,
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
      chatInsertRealtime.unsubscribe();
      chatUpdateRealtime.unsubscribe();
      chatDeleteRealtime.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-4">
      <Flex align={"center"} gap={"sm"} mb={"sm"}>
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
                handleBlockUser(currentUser[0].user_id, currentUser[0].rooms_id)
              }
            >
              {currentUser[0]?.therapist_status === "block"
                ? "Unblock User"
                : "Block User"}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <Card shadow="sm" withBorder p={0}>
          <ScrollArea
            className="!h-[calc(100vh - 230px)] relative"
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
                                className={`p-[6px] max-w-[450px] relative break-words whitespace-pre-wrap rounded-md ${
                                  isSender
                                    ? "text-white bg-[#46A7B0]"
                                    : "text-black bg-[#E6E6E6]"
                                }`}
                              >
                                {msg.messages}
                              </div>
                              <Text
                                size="xs"
                                mt={"3"}
                                className={`${
                                  isSender ? "text-start" : "text-end"
                                }`}
                              >
                                {dayjs(msg.created_at).format("hh:mm A")}
                              </Text>
                            </div>
                            {msg?.status === "edited" && (
                              <Text
                                size="xs"
                                mb={24}
                                ml={isSender ? "" : "sm"}
                                mr={isSender ? "sm" : ""}
                              >
                                (edited)
                              </Text>
                            )}
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
                          <Avatar
                            src={
                              currentUser.length > 0 && !isSender
                                ? currentUser[0]?.avatar_url
                                : userInfo?.avatar_url
                            }
                            alt={msg.sender_id}
                            mb={3}
                            size={"md"}
                            radius={"xl"}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            {currentUser[0]?.therapist_status === "block" ? (
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
        </Card>
        <div className="flex items-center mt-6 gap-2">
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
              currentUser.length > 0 &&
              currentUser[0].therapist_status === "block"
                ? true
                : false
            }
            rightSection={
              <ActionIcon variant="transparent" onClick={sendMessage}>
                <IconSend color="#46A7B0" />
              </ActionIcon>
            }
          />
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
        </div>
      </div>
    </div>
  );
};
