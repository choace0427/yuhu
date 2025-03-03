import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea, Avatar, Skeleton, Card } from "@mantine/core";
import { supabase } from "@/supabase";
import { useAuthStore } from "../../_store/authStore";

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: "available" | "busy" | "offline";
  rating: number;
  speciality: string;
}

const members: Member[] = [
  {
    id: "1",
    name: "Emma Wellness",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "available",
    rating: 4.8,
    speciality: "Swedish",
  },
  {
    id: "2",
    name: "Michael Relax",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "busy",
    rating: 4.9,
    speciality: "Deep Tissue",
  },
  {
    id: "3",
    name: "Sophie Zen",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "available",
    rating: 4.7,
    speciality: "Thai",
  },
  // Add more members as needed
];

export function MembersSidebar() {
  const { userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  let skeletions_count = 8;

  const [currentUser, setCurrentUser] = useState<any>();
  const [chatMembers, setChatMembers] = useState<any[]>([]);
  const [chatMembersLoading, setChatMembersLoading] = useState(false);

  const [selectedUserIndex, setSelectedUserIndex] = useState<any>(null);

  const getCurrentUser = async (room_id: string) => {
    if (userInfo?.role === "customer") {
      const { data: currentUser, error: currentUserError } = await supabase
        .from("room")
        .select("*, therapist_list(*)")
        .eq("rooms_id", room_id);
      if (currentUserError) throw currentUserError;

      setCurrentUser(currentUser[0]);
    }
    if (userInfo?.role === "therapist") {
      const { data: currentUser, error: currentUserError } = await supabase
        .from("room")
        .select("*, customers_list(*)")
        .eq("rooms_id", room_id);
      if (currentUserError) throw currentUserError;

      setCurrentUser(currentUser[0]);
    }
  };

  const fetchChatMembers = async (input_search_text: any) => {
    setChatMembersLoading(true);
    if (userInfo?.role === "customer") {
      const { data: chatMembers, error: chatMemberError } = await supabase
        .from("room")
        .select("*, therapist_list(*)")
        .eq("customer_id", userInfo?.id);
      if (chatMemberError) throw chatMemberError;

      setChatMembers(chatMembers);
    }
    if (userInfo?.role === "therapist") {
      const { data: chatMembers, error: chatMemberError } = await supabase
        .from("room")
        .select("*, customers_list(*)")
        .eq("therapist_id", userInfo?.id);

      if (chatMemberError) throw chatMemberError;
      setChatMembers(chatMembers);
    }
    setChatMembersLoading(false);
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchChatMembers("");
      if (pathname !== "/chat") {
        getCurrentUser(pathname.split("chat/")[1]);
      }
    }
  }, [userInfo, router]);

  return (
    <div className="w-[440px] border-r bg-white">
      <ScrollArea className="h-[calc(100vh-83px)]" p={0}>
        {chatMembersLoading
          ? Array.from({ length: skeletions_count }).map((_, index) => {
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
            })
          : chatMembers &&
            chatMembers.length > 0 && (
              <div className="p-2 flex flex-col gap-2">
                {chatMembers.map((member: any, index: number) => {
                  return (
                    <Card
                      key={index}
                      bg={
                        userInfo?.role === "customer"
                          ? currentUser?.therapist_id ===
                              member?.therapist_id ||
                            index === selectedUserIndex
                            ? "#F3F3F3"
                            : "#ffffff"
                          : userInfo?.role === "therapist"
                          ? currentUser?.customer_id === member?.customer_id
                            ? "#F3F3F3"
                            : "#ffffff"
                          : "white"
                      }
                      withBorder
                      p={"xs"}
                      className={`${
                        userInfo?.role === "customer"
                          ? currentUser?.therapist_id ===
                              member?.therapist_id ||
                            index === selectedUserIndex
                            ? "!border-l-4 !border-l-black"
                            : ""
                          : userInfo?.role === "therapist"
                          ? currentUser?.customer_id === member?.customer_id ||
                            index === selectedUserIndex
                            ? "!border-l-4 !border-l-black"
                            : ""
                          : "white"
                        // index === selectedUserIndex
                        //   ? "!border-l-4 !border-l-black"
                        //   : ""
                      } transition-colors cursor-pointer`}
                      onClick={() => {
                        setSelectedUserIndex(index);
                        router.push(`/chat/${member?.rooms_id}`);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={
                            userInfo?.role === "customer"
                              ? member?.therapist_list?.avatar_url
                              : member?.customers_list?.avatar_url
                          }
                          name={
                            userInfo?.role === "customer"
                              ? member?.therapist_list?.name
                              : member?.customers_list?.name
                          }
                          color="initials"
                          radius={"xl"}
                          size={46}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {userInfo?.role === "customer"
                              ? member?.therapist_list?.name
                              : member?.customers_list?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Online
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
      </ScrollArea>
    </div>
  );
}
