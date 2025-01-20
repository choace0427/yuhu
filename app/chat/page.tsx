"use client";

import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../_store/authStore";
import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  ScrollArea,
  Menu,
  Skeleton,
  Text,
  TextInput,
  LoadingOverlay,
  Textarea,
  Loader,
} from "@mantine/core";
import { IconSend, IconX } from "@tabler/icons-react";
import { IconNotification } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";

export default function ChatPage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [chatMembers, setChatMembers] = useState([]);

  const [chatMembersLoading, setChatMembersLoading] = useState(false);

  const selectChatUser = async (
    sender_id: any,
    receiver_id: any,
    role: any
  ) => {
    try {
      const { data: roomData, error: roomError } = await supabase
        .from("room")
        .select("*")
        .eq("customer_id", role === "customer" ? sender_id : receiver_id)
        .eq("therapist_id", role === "therapist" ? sender_id : receiver_id)
        .single();

      if (roomError && roomError.code !== "PGRST116") {
        throw new Error(`Error fetching room data: ${roomError.message}`);
      }

      if (roomData) {
        router.push(`/chat/${roomData.rooms_id}`);
      } else {
        const { data: newRoomData, error: insertError } = await supabase
          .from("room")
          .insert([
            {
              therapist_id: role === "therapist" ? sender_id : receiver_id,
              customer_id: role === "customer" ? sender_id : receiver_id,
            },
          ])
          .select()
          .single();

        if (insertError) {
          throw new Error(`Error creating new room: ${insertError.message}`);
        }

        if (newRoomData) {
          router.push(`/chat/${newRoomData.rooms_id}`);
        } else {
          throw new Error("Unexpected error: Room creation returned no data.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChatMembers = async () => {
    setChatMembersLoading(true);
    if (userInfo) {
      try {
        const { data: therapist_list, error } = await supabase.rpc(
          "chat_members",
          {
            input_member_id: userInfo.id,
            input_role: userInfo.role,
            input_search_text: "",
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
    fetchChatMembers();
  }, [userInfo]);

  return (
    <div className="flex">
      <TherapistList
        chatMembers={chatMembers}
        selectChatUser={selectChatUser}
        chatMembersLoading={chatMembersLoading}
        setChatMembersLoading={setChatMembersLoading}
        setChatMembers={setChatMembers}
        fetchChatMembers={fetchChatMembers}
      />
      <ChatSection />
    </div>
  );
}

const TherapistList = ({
  chatMembers,
  selectChatUser,
  chatMembersLoading,
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
                selectChatUser(
                  userInfo?.id,
                  userInfo?.role === "customer"
                    ? member?.therapist_id
                    : member?.customer_id,
                  userInfo?.role
                )
              }
              className="flex hover:cursor-pointer hover:bg-green-400"
            >
              <Avatar
                src={
                  userInfo?.role === "customer"
                    ? member?.therapist_avatar_url
                    : member?.customer_avatar_url
                }
                alt={
                  userInfo?.role === "customer"
                    ? member?.therapist_name
                    : member?.customer_name
                }
                radius={"xl"}
                size={46}
              />
              <Flex direction={"column"} ml={"sm"}>
                <Text size="md" fw={600}>
                  {userInfo?.role === "customer"
                    ? member?.therapist_name
                    : member?.customer_name}
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

const ChatSection = () => {
  return (
    <div className="w-full p-4">
      <Flex align={"center"} gap={"sm"} mb={"sm"}>
        <TextInput
          placeholder="Search chat here"
          disabled
          rightSection={<IconSearch size={"1rem"} />}
          w={"100%"}
        />{" "}
      </Flex>

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
          ></ScrollArea>
        </Card>
        <div className="flex items-center mt-6">
          <Textarea
            placeholder="Type a message..."
            disabled
            w={"100%"}
            rows={1}
            size="md"
            rightSection={
              <ActionIcon variant="transparent">
                <IconSend color="#46A7B0" />
              </ActionIcon>
            }
          />
        </div>
      </div>
    </div>
  );
};
