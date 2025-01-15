"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useUserContext } from "@/contexts/userContext";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarMenuToggle,
//   NavbarMenu,
//   NavbarMenuItem,
//   NavbarContent,
//   NavbarItem,
//   Avatar,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Badge,
// } from "@nextui-org/react";
// import { FaHome, FaMicroblog } from "react-icons/fa";
// import { TbMassage } from "react-icons/tb";
// import { IoIosInformationCircle } from "react-icons/io";
// import { RiTeamFill } from "react-icons/ri";
// import { BiSolidContact } from "react-icons/bi";
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

  const [activeLink, setActiveLink] = useState("");

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
          href="https://mantine.dev/"
          underline="always"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
          }`}
        >
          Home
        </Anchor>
        <Anchor
          href="https://mantine.dev/"
          underline="hover"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
          }`}
        >
          About
        </Anchor>
        <Anchor
          href="https://mantine.dev/"
          underline="never"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
          }`}
        >
          Our services
        </Anchor>
        <Anchor
          href="https://mantine.dev/"
          underline="never"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
          }`}
        >
          Team
        </Anchor>
        <Anchor
          href="https://mantine.dev/"
          underline="never"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
          }`}
        >
          Pricing
        </Anchor>
        <Anchor
          href="https://mantine.dev/"
          underline="never"
          className={`Poppins-font ${
            activeLink === "/home"
              ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
              : "text-black"
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

      {/* <Navbar className="[&>header]:max-w-7xl [&>header]:gap-2">
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3 " justify="center">
          <NavbarBrand>
            <div className="flex flex-row gap-1 items-center">
              <Image src="/img/logo.png" alt="logo" width={30} height={30} />
              <div className="Poppins-font font-bold">
                <span className="text-lg text-[#46A7B0]">Y</span>
                <span className="text-lg text-black">uhu</span>&nbsp;
                <span className="text-lg text-[#46A7B0]">W</span>
                <span className="text-lg text-black">ellness</span>
              </div>
            </div>
          </NavbarBrand>
        </NavbarContent>
        <div className="items-center justify-between w-full h-full flex">
          <div className="hidden sm:flex flex-row gap-2 items-center flex-none">
            <Image src="/img/logo.png" alt="logo" width={40} height={40} />
            <div className="Poppins-font font-bold">
              <span className="lg:text-2xl md:text-xl text-lg text-[#46A7B0]">
                Y
              </span>
              <span className="lg:text-2xl md:text-xl text-lg text-black">
                uhu
              </span>
              &nbsp;
              <span className="lg:text-2xl md:text-xl text-lg text-[#46A7B0]">
                W
              </span>
              <span className="lg:text-2xl md:text-xl text-lg text-black">
                ellness
              </span>
            </div>
          </div>
          <NavbarContent
            className="hidden sm:flex lg:gap-6 gap-2 grow"
            justify="center"
          >
            <NavbarItem>
              <Link
                href="/home"
                className={`Poppins-font ${
                  activeLink === "/home"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/home")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  H
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  ome
                </span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/services"
                className={`Poppins-font ${
                  activeLink === "/services"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/services")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  O
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  ur
                </span>
                &nbsp;
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  S
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  ervices
                </span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/about"
                className={`Poppins-font ${
                  activeLink === "/about"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/about")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  A
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  bout
                </span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/team"
                className={`lg:text-lg md:text-base text-sm Poppins-font ${
                  activeLink === "/team"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/team")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  T
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  eam
                </span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/pricing"
                className={`lg:text-lg md:text-base text-sm Poppins-font ${
                  activeLink === "/pricing"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/pricing")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  B
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  log
                </span>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/contactus"
                className={`lg:text-lg md:text-base text-sm Poppins-font ${
                  activeLink === "/contactus"
                    ? "text-[#46A7B0] border-b-2 border-[#46A7B0]"
                    : "text-black"
                }`}
                onClick={() => handleLinkClick("/contactus")}
              >
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  C
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  ontact
                </span>
                &nbsp;
                <span className="lg:text-lg md:text-base text-sm text-[#46A7B0]">
                  U
                </span>
                <span className="lg:text-lg md:text-base text-sm text-black">
                  s
                </span>
              </Link>
            </NavbarItem>
          </NavbarContent>

          {!isAuth ? (
            <NavbarContent className="flex-none" justify="end">
              <div className="flex flex-row gap-2">
                <button
                  className="bg-[#46A7B0] hover:bg-[#6fa2a7] p-2 rounded-md text-white Poppins-font hidden sm:flex items-center justify-center lg:text-base md:text-sm text-xs md:w-20 w-16"
                  onClick={() => router.push("/auth/login")}
                >
                  Sign In
                </button>
                <button
                  className="bg-[#46A7B0] hover:bg-[#6fa2a7] p-2 rounded-md text-white Poppins-font flex items-center justify-center lg:text-base md:text-sm text-xs md:w-20 w-16"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign Up
                </button>
              </div>
            </NavbarContent>
          ) : (
            <div className="flex flex-row gap-2 text-black">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div>
                    <Badge
                      color="danger"
                      content=""
                      size="sm"
                      shape="circle"
                      showOutline={false}
                      isInvisible={!isInvisible}
                    >
                      <Avatar
                        isBordered
                        radius="full"
                        src={userInfo?.avatar_url || ""}
                      />
                    </Badge>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {userInfo?.role === "therapist" ? (
                    <DropdownItem
                      key="message"
                      shortcut="⌘T"
                      onClick={() => router.push("/therapist")}
                    >
                      Therapist
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="message"
                      shortcut="⌘S"
                      onClick={() => router.push("/customer")}
                    >
                      Services
                    </DropdownItem>
                  )}
                  <DropdownItem
                    key="message"
                    shortcut="⌘M"
                    onClick={() => router.push("/chat")}
                  >
                    Message
                  </DropdownItem>
                  <DropdownItem
                    key="notification"
                    shortcut="⌘M"
                    onClick={() => router.push("/notifications")}
                  >
                    Notifications
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    shortcut="⌘L"
                    onClick={async () => {
                      localStorage.removeItem("userInfo");
                      localStorage.removeItem("role");
                      localStorage.removeItem("email");
                      localStorage.removeItem("password");
                      setIsAuth(false);
                      setUserInfo({});
                      await supabase.auth.signOut();
                      router.push("/");
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
        <NavbarMenu className="top-12 !h-screen">
          <NavbarMenuItem className="flex flex-col gap-2">
            <a href="/home" className="flex flex-row gap-1 items-center">
              <FaHome className="w-4 h-4" />
              <span className="text-base Poppins-font">Home</span>
            </a>
            <a href="/services" className="flex flex-row gap-1 items-center">
              <TbMassage className="w-4 h-4" />
              <span className="text-base Poppins-font">Our Services</span>
            </a>
            <a href="/about" className="flex flex-row gap-1 items-center">
              <IoIosInformationCircle className="w-4 h-4" />
              <span className="text-base Poppins-font">About</span>
            </a>
            <a href="/team" className="flex flex-row gap-1 items-center">
              <RiTeamFill className="w-4 h-4" />
              <span className="text-base Poppins-font">Team</span>
            </a>
            <a href="/pricing" className="flex flex-row gap-1 items-center">
              <FaMicroblog className="w-4 h-4" />
              <span className="text-base Poppins-font">Blog</span>
            </a>
            <a href="/contactus" className="flex flex-row gap-1 items-center">
              <BiSolidContact className="w-4 h-4" />
              <span className="text-base Poppins-font">Contact us</span>
            </a>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar> */}
    </div>
  );
};

export default Header;
