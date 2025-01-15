"use client";

import { supabase } from "@/supabase";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/_store/authStore";
import {
  ActionIcon,
  Avatar,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  Menu,
  ScrollArea,
  Skeleton,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconNotification,
  IconSearch,
  IconSend,
  IconUser,
} from "@tabler/icons-react";

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

  useEffect(() => {
    const fetchChatMembers = async () => {
      setChatMembersLoading(true);
      if (userInfo) {
        try {
          const { data: therapist_list, error } = await supabase.rpc(
            "chat_members",
            {
              input_member_id: userInfo.id,
              input_role: userInfo.role,
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
    fetchChatMembers();
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
}: any) => {
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { userInfo } = useAuthStore();

  let skeletions_count = 8;

  return (
    <div className="max-w-[350px] w-full p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Therapists</h2>
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
  const textareaRef = useRef(null);

  const { userInfo } = useAuthStore();

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      sendMessage();
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

  useEffect(() => {
    const chatRealtime = supabase
      .channel("chats-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
          filter: `room_id=eq.${room_id}`,
        },
        (payload) => {
          console.log("Database change detected:", payload);
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
    fetchMessages();

    return () => {
      chatRealtime.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full p-4">
      <Flex align={"center"} gap={"sm"} mb={"sm"}>
        <TextInput
          placeholder="Search chat here"
          rightSection={<IconSearch size={"1rem"} />}
          w={"100%"}
        />
        <Menu shadow="md" width={200} position="bottom-end">
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
            p={"sm"}
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
              messages.map((msg: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex mb-2 ${
                      msg.sender_id === userInfo.id
                        ? "items-end"
                        : "items-start"
                    }  flex-col`}
                  >
                    <div
                      className={`flex mb-3 ${
                        msg.sender_id === userInfo.id
                          ? "flex-row"
                          : "flex-row-reverse"
                      } gap-2 items-end`}
                    >
                      <div>
                        <div
                          key={index}
                          className={`p-[6px] max-w-[450px] rounded-md ${
                            msg.sender_id === userInfo.id
                              ? "text-white bg-[#46A7B0]"
                              : "text-black bg-[#E6E6E6]"
                          }`}
                        >
                          {msg.messages}
                        </div>
                        <Text size="xs" mt={"3"}>
                          {dayjs(msg.created_at).format("hh:mm A")}
                        </Text>
                      </div>
                      <Avatar
                        src={
                          currentUser.length > 0 &&
                          msg.sender_id === userInfo.id
                            ? ""
                            : currentUser[0]?.avatar_url
                        }
                        alt={msg.name}
                        mb={3}
                        size={"sm"}
                        radius={"xl"}
                      />
                    </div>
                  </div>
                );
              })}
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
        <div className="flex items-center mt-6">
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
              <ActionIcon variant="transparent" onClick={() => sendMessage}>
                <IconSend color="#46A7B0" />
              </ActionIcon>
            }
          />
        </div>
      </div>
    </div>
  );
};
