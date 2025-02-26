"use client";

import Image from "next/image";
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
  IconBrandBooking,
  IconLogout,
  IconMessageCircle,
  IconServicemark,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "@/app/_store/authStore";

const Header = () => {
  const { colorScheme } = useMantineColorScheme();
  const { isAuthenticated, signOut, userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isInvisible, setIsInvisible] = useState(false);

  const fetchNotifications = async () => {
    const { data: notificationData, error: notificationError } = await supabase
      .from("notifications")
      .select("*")
      .eq("receiver_id", userInfo?.id)
      .eq("status", "");
    if (notificationError) {
      console.log("error", notificationError);
      return;
    }
    if (notificationData.length > 0) {
      setIsInvisible(true);
    } else {
      setIsInvisible(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const notificationsRealtime = supabase
        .channel("notifications-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `receiver_id=eq.${userInfo?.id}`,
          },
          fetchNotifications
        )
        .subscribe();
      return () => {
        notificationsRealtime.unsubscribe();
      };
    }
  }, [userInfo]);

  return (
    <div
      className={`w-full z-20 md:h-20 px-8 h-12 flex justify-between top-0 sticky shadow-sm ${
        colorScheme === "light" ? "bg-white/80" : "bg-black/80"
      }`}
    >
      <div className="flex flex-row gap-1 items-center">
        <Image src="/img/logo.png" alt="logo" width={40} height={40} />
        <div className="Poppins-font font-bold">
          <span className="text-3xl text-[#46A7B0]">Y</span>
          <span className={`text-2xl`}>uhu</span>
          &nbsp;
          <span className="text-3xl text-[#46A7B0]">W</span>
          <span className={`text-2xl `}>ellness</span>
        </div>
      </div>
      <Group justify="center" gap={"xl"}>
        <Anchor
          underline={pathname === "/" ? "always" : "hover"}
          onClick={() => router.push("/")}
          variant=""
          className={`Poppins-font !font-semibold ${
            pathname === "/"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">H</span>
            <span className={`text-lg`}>ome</span>
          </div>
        </Anchor>
        <Anchor
          underline={pathname === "/about" ? "always" : "hover"}
          onClick={() => router.push("/about")}
          className={`Poppins-font !font-semibold  ${
            pathname === "/about"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">A</span>
            <span className={`text-lg`}>bout</span>
          </div>
        </Anchor>
        <Anchor
          underline={pathname === "/services" ? "always" : "hover"}
          onClick={() => router.push("/services")}
          className={`Poppins-font !font-semibold ${
            pathname === "/services"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">O</span>
            <span className={`text-lg`}>ur</span>
            &nbsp;
            <span className="text-lg text-[#46A7B0]">S</span>
            <span className={`text-lg`}>ervices</span>
          </div>
        </Anchor>
        <Anchor
          underline={pathname === "/team" ? "always" : "hover"}
          onClick={() => router.push("/team")}
          className={`Poppins-font !font-semibold ${
            pathname === "/team"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">T</span>
            <span className={`text-lg`}>eam</span>
          </div>
        </Anchor>
        <Anchor
          onClick={() => router.push("/pricing")}
          underline={pathname === "/pricing" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/pricing"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">E</span>
            <span className={`text-lg`}>vent</span>
          </div>
        </Anchor>
        <Anchor
          onClick={() => router.push("/contactus")}
          underline={pathname === "/contactus" ? "always" : "hover"}
          className={`Poppins-font !font-semibold ${
            pathname === "/contactus"
              ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : colorScheme === "light"
              ? "!text-black"
              : "!text-white"
          }`}
        >
          <div className="Poppins-font font-bold">
            <span className="text-lg text-[#46A7B0]">C</span>
            <span className={`text-lg`}>ontact</span>
            &nbsp;
            <span className="text-lg text-[#46A7B0]">U</span>
            <span className={`text-lg`}>s</span>
          </div>
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
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Indicator
                size={12}
                offset={5}
                position="top-end"
                color="red"
                disabled={!isInvisible}
              >
                <Avatar
                  size={44}
                  radius="xl"
                  name={userInfo?.name}
                  color="initials"
                  src={userInfo?.avatar_url}
                />
              </Indicator>
            </Menu.Target>

            <Menu.Dropdown>
              {userInfo?.role === "therapist" ? (
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={() => router.push("/therapist")}
                >
                  Profile
                </Menu.Item>
              ) : (
                <Menu.Item
                  leftSection={<IconServicemark size={14} />}
                  onClick={() => router.push("/services")}
                >
                  Services
                </Menu.Item>
              )}

              <Menu.Item
                leftSection={<IconMessageCircle size={14} />}
                onClick={() => router.push("/chat")}
              >
                Message
              </Menu.Item>
              {userInfo?.role === "therapist" && (
                <Menu.Item
                  leftSection={<IconBell size={14} />}
                  onClick={() => router.push("/notifications")}
                >
                  Notifications
                </Menu.Item>
              )}

              {userInfo?.role === "customer" && (
                <>
                  <Menu.Item
                    leftSection={<IconBrandBooking size={14} />}
                    onClick={() => router.push("/booking/list")}
                  >
                    Booking List
                  </Menu.Item>
                  <Menu.Divider />

                  <Menu.Item
                    leftSection={<IconUser size={14} />}
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Divider />
                </>
              )}
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
