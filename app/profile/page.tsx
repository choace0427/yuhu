"use client";

import {
  Box,
  Container,
  Flex,
  TextInput,
  Title,
  Button,
  Avatar,
  Tabs,
  Group,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCamera, IconSettings, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";
import { DatePickerInput } from "@mantine/dates";
import { supabase } from "@/supabase";
import dayjs from "dayjs";

export default function ProfilePage() {
  const { userInfo, setUserInfo } = useAuthStore();
  const router = useRouter();

  const [avatar, setAvatar] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !userInfo?.email) return;

    try {
      setUploading(true);

      if (avatarUrl) {
        const oldFilePath = avatarUrl.split("/").pop();
        if (oldFilePath) {
          await supabase.storage
            .from("avatars")
            .remove([`avatars/${oldFilePath}`]);
        }
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${userInfo.email}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: publicUrl })
        .eq("email", userInfo.email);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl + "?t=" + new Date().getTime());
      setUserInfo({
        ...userInfo,
        avatar_url: publicUrl + "?t=" + new Date().getTime(),
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to update profile avatar.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container size="md" py={"lg"}>
      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        align={"start"}
        mt={"lg"}
        gap={{ base: 20, sm: 60 }}
      >
        <Box w={"fit"}>
          <div
            className="relative group cursor-pointer"
            onClick={handleAvatarClick}
          >
            <Avatar
              size={140}
              src={avatarUrl || userInfo?.avatar_url}
              alt="Profile Avatar"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <IconCamera className="w-8 h-8 text-white" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {/* <Dropzone
            onDrop={handleImageUpload}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            radius={"xl"}
            styles={{
              root: {
                padding: "0px",
                width: "fit-content",
                borderRadius: "100%",
              },
            }}
          >
            {avatar ? (
              <Avatar src={avatar} size={160} radius={"xl"} />
            ) : (
              <>
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Avatar
                    size={160}
                    radius="xl"
                    name={userInfo?.name}
                    color="initials"
                    src={userInfo?.avatar_url}
                  />
                </Dropzone.Idle>
              </>
            )}
          </Dropzone> */}
        </Box>
        <Tabs
          defaultValue="general"
          w={"100%"}
          styles={{
            list: {
              width: "fit-content",
            },
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="general" leftSection={<IconUser size={"1rem"} />}>
              General Profile
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              leftSection={<IconSettings size={"1rem"} />}
            >
              Change Password
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" pb="xs">
            <GeneralProfile />
          </Tabs.Panel>
          <Tabs.Panel value="settings" pb="xs">
            <PasswordComponent />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </Container>
  );
}

const GeneralProfile = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const generalform = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: userInfo?.name || "",
      location: userInfo?.location || "",
    },
  });

  const [birthday, setBirthday] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (values: any) => {
    if (userInfo) {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .update({
          name: values.name,
          location: values.location,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
        })
        .eq("id", userInfo?.id)
        .select();
      if (error) {
        console.log("error", error);
        toast.error("Failed to update profile");
        generalform.initialize({
          name: userInfo?.name,
          location: userInfo?.location,
        });
      }
      if (data) {
        setUserInfo(data[0]);
        toast.success("Successfullly updated profile");
      }
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={generalform.onSubmit((values: any) =>
        handleProfileUpdate(values)
      )}
    >
      <Box w={"100%"} mt={"xl"} px={"sm"}>
        <TextInput
          label="Full Name"
          placeholder="Full Name"
          size="md"
          key={generalform.key("name")}
          {...generalform.getInputProps("name")}
          defaultValue={userInfo?.name}
        />
        <TextInput
          mt="sm"
          label="Email"
          size="md"
          disabled
          placeholder="Email"
          defaultValue={userInfo?.email}
        />
        <TextInput
          mt="sm"
          size="md"
          label="Location"
          placeholder="Location"
          key={generalform.key("location")}
          {...generalform.getInputProps("location")}
          defaultValue={userInfo?.location}
        />
        <DatePickerInput
          label="Birthday"
          mt="sm"
          size="md"
          placeholder="Pick your birthday"
          // defaultValue={
          //   new Date(new Date(userInfo?.birthday).getTime() + 86400000)
          // }
          value={birthday}
          onChange={setBirthday}
        />

        <Group justify="flex-end" mt="md">
          <Button
            w={{ base: "100%", sm: 180 }}
            type="submit"
            loading={loading}
            className="!bg-[#46A7B0]"
          >
            Update
          </Button>
        </Group>
      </Box>
    </form>
  );
};

const PasswordComponent = () => {
  const passwordform = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
          ? null
          : "Password must include uppercase, lowercase, and a number",
      confirmPassword: (value, values) =>
        value === "" && value !== values.password
          ? "Passwords did not match"
          : null,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (values: any) => {
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast.error(error?.message);
      passwordform.initialize({ password: "", confirmPassword: "" });
      setLoading(false);
      return;
    }

    passwordform.initialize({ password: "", confirmPassword: "" });
    setLoading(false);
    toast.success("Successfully changed password!");
  };

  return (
    <form
      onSubmit={passwordform.onSubmit((values) => handleChangePassword(values))}
    >
      <Box w={"100%"} mt={"xl"} px={"sm"}>
        <PasswordInput
          label="New Password"
          placeholder="Password"
          size="md"
          key={passwordform.key("password")}
          {...passwordform.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          size="md"
          key={passwordform.key("confirmPassword")}
          {...passwordform.getInputProps("confirmPassword")}
        />
        <Group justify="flex-end" mt="md">
          <Button
            w={{ base: "100%", sm: 180 }}
            type="submit"
            loading={loading}
            className="!bg-[#46A7B0]"
          >
            Change Password
          </Button>
        </Group>
      </Box>
    </form>
  );
};
