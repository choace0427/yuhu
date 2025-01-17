"use client";

import { useRef, useState } from "react";
import {
  Container,
  Paper,
  TextInput,
  Button,
  Avatar,
  Tabs,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { IconUser, IconLock, IconCamera } from "@tabler/icons-react";
import { useAuthStore } from "../_store/authStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<string | null>("general");

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
    <Container size="sm" py="xl">
      <Paper radius="md" p={"md"} shadow="sm">
        <div
          className="relative group cursor-pointer w-fit mx-auto mb-8"
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
        <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
          <Tabs.List grow>
            <Tabs.Tab value="general" leftSection={<IconUser size={16} />}>
              General Profile
            </Tabs.Tab>
            <Tabs.Tab value="password" leftSection={<IconLock size={16} />}>
              Change Password
            </Tabs.Tab>
          </Tabs.List>

          <div className="p-8">
            <Tabs.Panel value="general">
              <GeneralProfile />
            </Tabs.Panel>

            <Tabs.Panel value="password">
              <ChangePasswordComponent />
            </Tabs.Panel>
          </div>
        </Tabs>
      </Paper>
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
      <Stack gap="md">
        <TextInput
          label="Full Name"
          placeholder="Your full name"
          key={generalform.key("name")}
          {...generalform.getInputProps("name")}
          defaultValue={userInfo?.name}
        />
        <TextInput
          label="Email"
          placeholder="your.email@example.com"
          disabled
          defaultValue={userInfo?.email}
        />
        <TextInput
          label="Location"
          placeholder="Your location"
          key={generalform.key("location")}
          {...generalform.getInputProps("location")}
          defaultValue={userInfo?.location}
        />
        <DatePickerInput
          label="Birthday"
          placeholder="Pick your birthday"
          // defaultValue={
          //   new Date(new Date(userInfo?.birthday).getTime() + 86400000)
          // }
          value={birthday}
          onChange={setBirthday}
        />
        <Button fullWidth color="teal" mt="md" type="submit" loading={loading}>
          Update Profile
        </Button>
      </Stack>
    </form>
  );
};

const ChangePasswordComponent = () => {
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
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      console.log("=======");
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
      <Stack gap="md">
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          key={passwordform.key("password")}
          {...passwordform.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          key={passwordform.key("confirmPassword")}
          {...passwordform.getInputProps("confirmPassword")}
        />
        <Button color="teal" mt="md" loading={loading} type="submit">
          Update Password
        </Button>
      </Stack>
    </form>
  );
};
