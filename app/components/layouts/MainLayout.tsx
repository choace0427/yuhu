"use client";

import { ChatWidget } from "../widget/ChatWidget";
import Footer from "./Footer";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <Header />
      <ChatWidget />
      <div className="min-h-[calc(100vh - 80px)]">{children}</div>
      {!(pathname.includes("auth") || pathname.includes("chat")) && <Footer />}
    </div>
  );
}
