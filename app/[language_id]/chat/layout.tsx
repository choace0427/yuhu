"use client";

import { Flex } from "@mantine/core";
import { MembersSidebar } from "../components/layouts/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh - 80px)]">
      <Flex>
        <MembersSidebar />
        {children}
      </Flex>
    </div>
  );
}
