"use client";

import { supabase } from "@/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../_store/authStore";
import { Avatar, Flex, Text } from "@mantine/core";

export default function ChatPage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const [chatMembers, setChatMembers] = useState([]);

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

  useEffect(() => {
    const fetchChatMembers = async () => {
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
    };

    fetchChatMembers();
  }, [userInfo]);

  return (
    <div className="flex">
      <TherapistList
        chatMembers={chatMembers}
        selectChatUser={selectChatUser}
      />
    </div>
  );
}

const TherapistList = ({ chatMembers, selectChatUser }: any) => {
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const { userInfo } = useAuthStore();

  return (
    <div className="w-1/3 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Therapists</h2>
      <ul>
        {chatMembers &&
          chatMembers.map((member: any, index: number) => (
            <li
              key={index}
              onClick={() =>
                selectChatUser(userInfo?.id, member?.id, userInfo?.role)
              }
              className={`flex items-center cursor-pointer rounded-lg transition-colors duration-200 `}
            >
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
