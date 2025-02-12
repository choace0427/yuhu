"use client";

import { ChatWidget } from "../widget/ChatWidget";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/app/_store/authStore";
import { MembersSidebar } from "./Sidebar";
import { ChatSection } from "../chat/ChatRoom";
import { Flex } from "@mantine/core";

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
          <div className="min-h-[calc(100vh - 80px)]">
            {pathname.includes("chat") ? (
              <Flex>
                <MembersSidebar />
                {children}
              </Flex>
            ) : (
              children
            )}
            {/* {children} */}
          </div>
        </motion.div>
      </AnimatePresence>

      {!(pathname.includes("auth") || pathname.includes("chat")) && <Footer />}
    </div>
  );
}
