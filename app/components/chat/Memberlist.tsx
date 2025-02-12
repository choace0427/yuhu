"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { List, ThemeIcon, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

const members = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
  // Add more members as needed
];

export function MembersList() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const router = useRouter();

  const handleMemberClick = (memberId: string) => {
    setSelectedMember(memberId);
    router.push(`/chat/${memberId}`);
  };

  return (
    <List spacing="xs" size="sm" center>
      {members.map((member) => (
        <List.Item
          key={member.id}
          onClick={() => handleMemberClick(member.id)}
          style={{ cursor: "pointer" }}
        >
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconUser style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
          {member.name}
        </List.Item>
      ))}
    </List>
  );
}
