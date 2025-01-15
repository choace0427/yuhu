"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import {
  Anchor,
  Avatar,
  Button,
  Indicator,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import { Group } from "@mantine/core";
import {
  IconBell,
  IconLogout,
  IconMessageCircle,
  IconServicemark,
  IconSettings,
} from "@tabler/icons-react";
import ThemeSwitch from "../themeSwitch";
import { useAuthStore } from "@/app/_store/authStore";

const Header = () => {
  const { colorScheme } = useMantineColorScheme();
  const { isAuthenticated, signOut, userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isInvisible, setIsInvisible] = useState(true);

  const fetchNotifications = async () => {
    const { data: notificationData, error: notificationError } = await supabase
      .from("notifications")
      .select("*")
      .eq("receiver_id", userInfo?.id)
      .eq("status", "");
    if (notificationError) {
      console.log("error", notificationError);
    } else {
      if (notificationData && notificationData.length < 1)
        setIsInvisible(false);
      else setIsInvisible(true);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const notificationsRealtime = supabase
        .channel("notifications-db-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `receiver_id=eq.${userInfo?.id}`,
          },
          (payload: any) => {
            console.log("Database change detected:", payload);
            fetchNotifications();
          }
        )
        .subscribe();
      return () => {
        notificationsRealtime.unsubscribe();
      };
    }
  }, [userInfo]);

  return (
    <div
      className={`w-full z-20 md:h-20 px-8 h-12 ${
        colorScheme === "light"
          ? "bg-white shadow-black"
          : "bg-black shadow-white"
      } flex justify-between top-0 sticky shadow-sm`}
    >
      <div className="flex flex-row gap-1 items-center">
        <Image src="/img/logo.png" alt="logo" width={30} height={30} />
        <div className="Poppins-font font-bold">
          <span className="text-lg text-[#46A7B0]">Y</span>
          <span
            className={`text-lg ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            uhu
          </span>
          &nbsp;
          <span className="text-lg text-[#46A7B0]">W</span>
          <span
            className={`text-lg ${
              colorScheme === "light" ? "text-black" : "text-white"
            }`}
          >
            ellness
          </span>
        </div>
      </div>
      <Group justify="center" gap={"xl"}>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
          underline={pathname === "/" ? "always" : "hover"}
          variant=""
          className={`Poppins-font !font-semibold ${
            pathname === "/"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          Home
        </Anchor>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/about`}
          underline={pathname === "/about" ? "always" : "hover"}
          className={`Poppins-font !font-semibold  ${
            pathname === "/about"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          About
        </Anchor>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/services`}
          underline={pathname === "/services" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/services"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          Our services
        </Anchor>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/team`}
          underline={pathname === "/team" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/team"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          Team
        </Anchor>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/pricing`}
          underline={pathname === "/pricing" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/pricing"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          Pricing
        </Anchor>
        <Anchor
          href={`${process.env.NEXT_PUBLIC_APP_URL}/contactus`}
          underline={pathname === "/contactus" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/contactus"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "!text-black"
          }`}
        >
          Contact us
        </Anchor>
      </Group>
      {!isAuthenticated ? (
        <Group gap={"sm"}>
          <Button
            className="!bg-[#46A7B0]"
            onClick={() => router.push("/auth/login")}
          >
            Sign In
          </Button>
          <Button
            className="!bg-[#46A7B0]"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </Group>
      ) : (
        <Group>
          <ThemeSwitch />
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Indicator
                size={12}
                offset={5}
                position="top-end"
                color="red"
                disabled={isInvisible}
              >
                <Avatar
                  size={44}
                  variant="outline"
                  radius="xl"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                />
              </Indicator>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconSettings size={14} />}
                onClick={() => router.push("/therapist")}
              >
                Therapist
              </Menu.Item>
              <Menu.Item
                leftSection={<IconServicemark size={14} />}
                onClick={() => router.push("/customer")}
              >
                Services
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMessageCircle size={14} />}
                onClick={() => router.push("/chat")}
              >
                Message
              </Menu.Item>
              <Menu.Item
                leftSection={<IconBell size={14} />}
                onClick={() => router.push("/notifications")}
              >
                Notifications
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
                onClick={() => signOut(router)}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      )}
    </div>
  );
};

export default Header;
