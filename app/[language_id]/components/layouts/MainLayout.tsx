"use client";

import { ChatWidget } from "../widget/ChatWidget";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MembersSidebar } from "./Sidebar";
import { ChatSection } from "../chat/ChatRoom";
import { Flex } from "@mantine/core";
import { useAuthStore } from "../../_store/authStore";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { userInfo } = useAuthStore();

  return (
    <div className="min-h-screen">
      <Header />
      {userInfo?.role === "customer" && <ChatWidget />}

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {!(pathname.includes("auth") || pathname.includes("chat")) && <Footer />}
    </div>
  );
}
