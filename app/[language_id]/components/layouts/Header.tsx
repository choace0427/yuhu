// "use client";

// import Image from "next/image";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { supabase } from "@/supabase";
// import {
//   Anchor,
//   Avatar,
//   Button,
//   Indicator,
//   Menu,
//   useMantineColorScheme,
//   Group,
//   Select,
// } from "@mantine/core";
// import { ESFlag, ETFlag, ITFlag, USFlag } from "mantine-flagpack";
// import {
//   IconBell,
//   IconBrandBooking,
//   IconLogout,
//   IconMessageCircle,
//   IconServicemark,
//   IconUser,
// } from "@tabler/icons-react";
// import { useAuthStore } from "@/app/[language_id]/_store/authStore";

// const Header = () => {
//   const { colorScheme } = useMantineColorScheme();
//   const { isAuthenticated, signOut, userInfo } = useAuthStore();
//   const router = useRouter();
//   const pathname = usePathname();

//   const [isInvisible, setIsInvisible] = useState(false);

//   const fetchNotifications = async () => {
//     const { data: notificationData, error: notificationError } = await supabase
//       .from("notifications")
//       .select("*")
//       .eq("receiver_id", userInfo?.id)
//       .eq("status", "");
//     if (notificationError) {
//       console.log("error", notificationError);
//       return;
//     }
//     if (notificationData.length > 0) {
//       setIsInvisible(true);
//     } else {
//       setIsInvisible(false);
//     }
//   };

//   useEffect(() => {
//     if (userInfo) {
//       const notificationsRealtime = supabase
//         .channel("notifications-db-changes")
//         .on(
//           "postgres_changes",
//           {
//             event: "*",
//             schema: "public",
//             table: "notifications",
//             filter: `receiver_id=eq.${userInfo?.id}`,
//           },
//           fetchNotifications
//         )
//         .subscribe();
//       return () => {
//         notificationsRealtime.unsubscribe();
//       };
//     }
//   }, [userInfo]);

//   const data = [
//     { label: "English", value: "en", flag: <USFlag w={30} radius="md" /> },
//     { label: "Spain", value: "es", flag: <ESFlag w={30} radius="md" /> },
//     { label: "Italy", value: "it", flag: <ITFlag w={30} radius="md" /> },
//   ];
//   const [currentLanguage, setCurrentLanguage] = useState("en");

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language_id") || "en";
//     setCurrentLanguage(savedLanguage);
//   }, []);

//   const changeLanguage = (language: string) => {
//     setCurrentLanguage(language);
//     localStorage.setItem("language_id", language);

//     const segments = pathname.split("/").filter(Boolean);
//     if (
//       segments.length > 0 &&
//       data.some((lang) => lang.value === segments[0])
//     ) {
//       segments[0] = language;
//     } else {
//       segments.unshift(language);
//     }

//     router.replace("/" + segments.join("/"));
//   };

//   return (
//     <div
//       className={`w-full z-20 md:h-20 px-8 h-12 flex justify-between top-0 sticky shadow-sm ${
//         colorScheme === "light" ? "bg-white/80" : "bg-black/80"
//       }`}
//     >
//       <div className="flex flex-row gap-1 items-center">
//         <Image src="/img/logo.png" alt="logo" width={40} height={40} />
//         <div className="Poppins-font font-bold">
//           <span className="text-3xl text-[#46A7B0]">Y</span>
//           <span className={`text-2xl`}>uhu</span>
//           &nbsp;
//           <span className="text-3xl text-[#46A7B0]">W</span>
//           <span className={`text-2xl `}>ellness</span>
//         </div>
//       </div>
//       <Group justify="center" gap={"xl"}>
//         {[
//           { label: "Home", path: "/", label_1: "H", label_2: "ome" },
//           { label: "About", path: "/about", label_1: "A", label_2: "bout" },
//           {
//             label: "Services",
//             path: "/services",
//             label_1: "O",
//             label_2: "ur",
//             label_3: "S",
//             label_4: "ervices",
//           },
//           { label: "Team", path: "/team", label_1: "T", label_2: "eam" },
//           { label: "Events", path: "/pricing", label_1: "E", label_2: "vents" },
//           {
//             label: "Contact Us",
//             path: "/contactus",
//             label_1: "C",
//             label_2: "ontact",
//             label_3: "U",
//             label_4: "s",
//           },
//         ].map((item, index) => {
//           return (
//             <Anchor
//               key={index}
//               variant=""
//               underline={
//                 pathname === currentLanguage + item?.path ? "always" : "hover"
//               }
//               onClick={() => router.replace(`//${currentLanguage}${item?.path}`)}
//               className={`Poppins-font !font-semibold ${
//                 pathname === currentLanguage + item?.path
//                   ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
//                   : "!text-black dark:text-white"
//               }`}
//             >
//               <div className="Poppins-font font-bold">
//                 <span className="text-lg text-[#46A7B0]">{item?.label_1}</span>
//                 <span className={`text-lg`}>{item?.label_2}</span>
//                 {item?.label_3 && item?.label_4 && (
//                   <>
//                     &nbsp;
//                     <span className="text-lg text-[#46A7B0]">
//                       {item?.label_3}
//                     </span>
//                     <span className={`text-lg`}>{item?.label_4}</span>
//                   </>
//                 )}
//               </div>
//             </Anchor>
//           );
//         })}
//       </Group>
//       {!isAuthenticated ? (
//         <Group gap={"sm"}>
//           <Menu shadow="md" width={150} position="bottom-end">
//             <Menu.Target>
//               <div>
//                 {currentLanguage === "en" ? (
//                   <USFlag w={30} radius="md" />
//                 ) : currentLanguage === "es" ? (
//                   <ESFlag w={30} radius="md" />
//                 ) : currentLanguage === "it" ? (
//                   <ITFlag w={30} radius="md" />
//                 ) : (
//                   <ETFlag w={30} radius="md" />
//                 )}
//               </div>
//             </Menu.Target>

//             <Menu.Dropdown>
//               {data.map((item) => {
//                 return (
//                   <Menu.Item
//                     key={item.value}
//                     onClick={() => changeLanguage(item.value)}
//                     leftSection={item.flag}
//                   >
//                     {item.label}
//                   </Menu.Item>
//                 );
//               })}
//             </Menu.Dropdown>
//           </Menu>
//           <Button
//             className="!bg-[#46A7B0]"
//             onClick={() => router.replace(`/${currentLanguage}/auth/login`)}
//           >
//             Sign In
//           </Button>
//           <Button
//             className="!bg-[#46A7B0]"
//             onClick={() => router.replace(`/${currentLanguage}/auth/signup`)}
//           >
//             Sign Up
//           </Button>
//         </Group>
//       ) : (
//         <Group>
//           <Menu shadow="md" width={150} position="bottom-end">
//             <Menu.Target>
//               <div>
//                 {currentLanguage === "en" ? (
//                   <USFlag w={30} radius="md" />
//                 ) : currentLanguage === "es" ? (
//                   <ESFlag w={30} radius="md" />
//                 ) : currentLanguage === "it" ? (
//                   <ITFlag w={30} radius="md" />
//                 ) : (
//                   <ETFlag w={30} radius="md" />
//                 )}
//               </div>
//             </Menu.Target>

//             <Menu.Dropdown>
//               {data.map((item) => {
//                 return (
//                   <Menu.Item
//                     key={item.value}
//                     onClick={() => changeLanguage(item.value)}
//                     leftSection={item.flag}
//                   >
//                     {item.label}
//                   </Menu.Item>
//                 );
//               })}
//             </Menu.Dropdown>
//           </Menu>
//           <Menu shadow="md" width={200} position="bottom-end">
//             <Menu.Target>
//               <Indicator
//                 size={12}
//                 offset={5}
//                 position="top-end"
//                 color="red"
//                 disabled={!isInvisible}
//               >
//                 <Avatar
//                   size={44}
//                   radius="xl"
//                   name={userInfo?.name}
//                   color="initials"
//                   src={userInfo?.avatar_url}
//                 />
//               </Indicator>
//             </Menu.Target>

//             <Menu.Dropdown>
//               {userInfo?.role === "therapist" ? (
//                 <Menu.Item
//                   leftSection={<IconUser size={14} />}
//                   onClick={() => router.replace(`/${currentLanguage}/therapist`)}
//                 >
//                   Profile
//                 </Menu.Item>
//               ) : (
//                 <Menu.Item
//                   leftSection={<IconServicemark size={14} />}
//                   onClick={() => router.replace(`/${currentLanguage}/services`)}
//                 >
//                   Services
//                 </Menu.Item>
//               )}

//               <Menu.Item
//                 leftSection={<IconMessageCircle size={14} />}
//                 onClick={() => router.replace(`/${currentLanguage}/chat`)}
//               >
//                 Message
//               </Menu.Item>
//               {userInfo?.role === "therapist" && (
//                 <Menu.Item
//                   leftSection={<IconBell size={14} />}
//                   onClick={() =>
//                     router.replace(`/${currentLanguage}/notifications`)
//                   }
//                 >
//                   Notifications
//                 </Menu.Item>
//               )}

//               {userInfo?.role === "customer" && (
//                 <>
//                   <Menu.Item
//                     leftSection={<IconBrandBooking size={14} />}
//                     onClick={() =>
//                       router.replace(`/${currentLanguage}/booking/list`)
//                     }
//                   >
//                     Booking List
//                   </Menu.Item>
//                   <Menu.Divider />

//                   <Menu.Item
//                     leftSection={<IconUser size={14} />}
//                     onClick={() => router.replace(`/${currentLanguage}/profile`)}
//                   >
//                     Profile
//                   </Menu.Item>
//                   <Menu.Divider />
//                 </>
//               )}
//               <Menu.Item
//                 color="red"
//                 leftSection={<IconLogout size={14} />}
//                 onClick={() => signOut(router)}
//               >
//                 Logout
//               </Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </Group>
//       )}
//     </div>
//   );
// };

// export default Header;

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
  Group,
} from "@mantine/core";
import { ESFlag, ETFlag, ITFlag, USFlag } from "mantine-flagpack";
import {
  IconBell,
  IconBrandBooking,
  IconLogout,
  IconMessageCircle,
  IconServicemark,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "@/app/[language_id]/_store/authStore";
import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

const Header = () => {
  const { colorScheme } = useMantineColorScheme();
  const { isAuthenticated, signOut, userInfo } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isInvisible, setIsInvisible] = useState(false);

  // Fetch notifications for the logged-in user
  const fetchNotifications = async () => {
    const { data: notificationData, error: notificationError } = await supabase
      .from("notifications")
      .select("*")
      .eq("receiver_id", userInfo?.id)
      .eq("status", "");
    if (notificationError) {
      console.error("Error fetching notifications:", notificationError);
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

  // Language options
  const data = [
    { label: "English", value: "en", flag: <USFlag w={30} radius="md" /> },
    { label: "Spain", value: "es", flag: <ESFlag w={30} radius="md" /> },
    { label: "Italy", value: "it", flag: <ITFlag w={30} radius="md" /> },
  ];

  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language_id") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem("language_id", language);

    const segments = pathname.split("/").filter(Boolean);

    if (data.some((lang) => lang.value === segments[0])) {
      segments[0] = language;
    } else {
      segments.unshift(language);
    }

    router.replace("/" + segments.join("/"));
  };

  const navigateTo = (path: string) => {
    const segments = pathname.split("/").filter(Boolean);

    if (data.some((lang) => lang.value === segments[0])) {
      segments[0] = currentLanguage;
    } else {
      segments.unshift(currentLanguage);
    }

    router.replace(`/${segments[0]}${path}`);
  };

  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const selectedLanguage = translations[languageId] || translations.en;

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
        {[
          { label: "Home", path: "/", label_1: "H", label_2: "ome" },
          { label: "About", path: "/about", label_1: "A", label_2: "bout" },
          {
            label: "Services",
            path: "/services",
            label_1: "O",
            label_2: "ur",
            label_3: "S",
            label_4: "ervices",
          },
          { label: "Team", path: "/team", label_1: "T", label_2: "eam" },
          { label: "Events", path: "/pricing", label_1: "E", label_2: "vents" },
          {
            label: "Contact Us",
            path: "/contactus",
            label_1: "C",
            label_2: "ontact",
            label_3: "U",
            label_4: "s",
          },
        ].map((item, index) => (
          <Anchor
            key={index}
            variant=""
            underline={
              item.path === "/"
                ? pathname === `/${currentLanguage}`
                  ? "always"
                  : "hover"
                : pathname === `/${currentLanguage}${item.path}`
                ? "always"
                : "hover"
            }
            onClick={() => navigateTo(item.path)}
            className={`Poppins-font !font-semibold ${
              item.path === "/"
                ? pathname === `/${currentLanguage}`
                  ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
                  : "!text-black dark:text-white"
                : pathname === `/${currentLanguage}${item.path}`
                ? "!text-[#46A7B0] border-b-2 border-[#46A7B0]"
                : "!text-black dark:text-white"
            }`}
          >
            <div className="Poppins-font font-bold">
              <span className="text-lg text-[#46A7B0]">{item?.label_1}</span>
              <span className={`text-lg`}>{item?.label_2}</span>
              {item?.label_3 && item?.label_4 && (
                <>
                  &nbsp;
                  <span className="text-lg text-[#46A7B0]">
                    {item?.label_3}
                  </span>
                  <span className={`text-lg`}>{item?.label_4}</span>
                </>
              )}
            </div>
          </Anchor>
        ))}
      </Group>
      {!isAuthenticated ? (
        <Group gap={"sm"}>
          <Menu shadow="md" width={150} position="bottom-end">
            <Menu.Target>
              <div>
                {currentLanguage === "en" ? (
                  <USFlag w={30} radius="md" />
                ) : currentLanguage === "es" ? (
                  <ESFlag w={30} radius="md" />
                ) : currentLanguage === "it" ? (
                  <ITFlag w={30} radius="md" />
                ) : (
                  <ETFlag w={30} radius="md" />
                )}
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              {data.map((item) => (
                <Menu.Item
                  key={item.value}
                  onClick={() => changeLanguage(item.value)}
                  leftSection={item.flag}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
          <Button
            className="!bg-[#46A7B0]"
            onClick={() => navigateTo("/auth/login")}
          >
            {selectedLanguage?.signin}
          </Button>
          <Button
            className="!bg-[#46A7B0]"
            onClick={() => navigateTo("/auth/signup")}
          >
            {selectedLanguage?.signup}
          </Button>
        </Group>
      ) : (
        <Group>
          <Menu shadow="md" width={150} position="bottom-end">
            <Menu.Target>
              <div>
                {currentLanguage === "en" ? (
                  <USFlag w={30} radius="md" />
                ) : currentLanguage === "es" ? (
                  <ESFlag w={30} radius="md" />
                ) : currentLanguage === "it" ? (
                  <ITFlag w={30} radius="md" />
                ) : (
                  <ETFlag w={30} radius="md" />
                )}
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              {data.map((item) => (
                <Menu.Item
                  key={item.value}
                  onClick={() => changeLanguage(item.value)}
                  leftSection={item.flag}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
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
                  onClick={() => navigateTo("/therapist")}
                >
                  Profile
                </Menu.Item>
              ) : (
                <Menu.Item
                  leftSection={<IconServicemark size={14} />}
                  onClick={() => navigateTo("/services")}
                >
                  Services
                </Menu.Item>
              )}

              <Menu.Item
                leftSection={<IconMessageCircle size={14} />}
                onClick={() => navigateTo("/chat")}
              >
                Message
              </Menu.Item>
              {userInfo?.role === "therapist" && (
                <Menu.Item
                  leftSection={<IconBell size={14} />}
                  onClick={() => navigateTo("/notifications")}
                >
                  Notifications
                </Menu.Item>
              )}

              {userInfo?.role === "customer" && (
                <>
                  <Menu.Item
                    leftSection={<IconBrandBooking size={14} />}
                    onClick={() => navigateTo("/booking/list")}
                  >
                    Booking List
                  </Menu.Item>
                  <Menu.Divider />

                  <Menu.Item
                    leftSection={<IconUser size={14} />}
                    onClick={() => navigateTo("/profile")}
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
