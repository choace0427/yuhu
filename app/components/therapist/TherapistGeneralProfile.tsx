"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { createClient } from "@/app/utils/supabase/client";
import {
  Avatar,
  Button,
  Flex,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconCamera,
  IconEdit,
  IconMap,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function TherapistGeneralProfile() {
  const { userInfo, setUserInfo } = useAuthStore();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [birthday, setBirthday] = useState<any>(null);
  const [hourlyRate, setHourlyRate] = useState("100");
  const [changedHourlyRate, setChangedHourlyRate] = useState(hourlyRate);
  const [summary, setSummary] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      if (userInfo?.email) {
        try {
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", userInfo.email);

          if (!error && userData) {
            setPhone(userData[0].phone);
            setLocation(userData[0].location);
            setHourlyRate(userData[0].hourly_rate);
            setSummary(userData[0].summary || "");
            if (userData[0].birthday) {
              setBirthday(dayjs(new Date(userData[0]?.birthday)));
            }
            if (userData[0].avatar_url) {
              setAvatarUrl(userData[0].avatar_url);
            }
          }
        } catch (error) {
          toast.error("Failed to fetch services.");
        } finally {
          setLoading(true);
        }
      }
    };

    fetchServices();
  }, [userInfo?.email]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateRate = (newRate: string) => {
    setHourlyRate(newRate);
    close();
  };

  const onProfileInfoSubmit = async (e: any) => {
    e.preventDefault();
    if (!userInfo?.email) return;

    const { data, error } = await supabase
      .from("users")
      .update({
        created_at: new Date(),
        name: name || userInfo?.name,
        phone: phone,
        location: location,
        hourly_rate: hourlyRate,
        birthday: dayjs(birthday).format("YYYY-MM-DD"),
        summary: summary,
      })
      .eq("email", userInfo.email);

    if (error) {
      toast.error("Failed to update profile information.");
    } else {
      toast.success("Profile information updated successfully.");
    }
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
    <div className="w-full flex flex-col border rounded-xl items-center py-8 gap-2 shadow-xl">
      <span className="text-[#46A7B0] font-semibold text-lg Poppins-font">
        General Information
      </span>
      <div className="flex flex-col w-full items-center">
        <div
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
        >
          <Avatar size={"lg"} src={avatarUrl} alt="Profile Avatar" />
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
        {uploading && (
          <span className="text-sm text-gray-500 mt-2">Uploading...</span>
        )}
        <div className="flex flex-col items-center">
          <span className="text-black/50 text-sm Poppins-font">Rate</span>
          <div className="flex flex-row gap-2 items-center">
            <span className="text-black text-lg Poppins-font">
              ${hourlyRate}/hr
            </span>
            <IconEdit className="w-5 h-5 cursor-pointer" onClick={open} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={onProfileInfoSubmit}
          >
            <div className="flex flex-col gap-2 w-full items-center px-10">
              <TextInput
                label="Full Name"
                id="fullname"
                defaultValue={userInfo?.name}
                size="md"
                w={"100%"}
                leftSection={<IconUser size={"1.2rem"} />}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
              <TextInput
                label="Phone"
                id="phone"
                size="md"
                w={"100%"}
                placeholder="+1 234 5678 910"
                leftSection={<IconPhone size={"1.2rem"} />}
                defaultValue={phone}
                onChange={(e: any) => {
                  setPhone(e.target.value);
                }}
              />
              <TextInput
                label="Location"
                id="location"
                size="md"
                w={"100%"}
                placeholder="Spain"
                leftSection={<IconMap size={"1.2rem"} />}
                defaultValue={location}
                onChange={(e: any) => {
                  setLocation(e.target.value);
                }}
              />
              <DatePickerInput
                leftSection={<IconCalendar size={"1rem"} />}
                leftSectionPointerEvents="none"
                label="Birthday"
                placeholder="Pick your birthday"
                value={birthday}
                onChange={setBirthday}
                defaultValue={
                  new Date(new Date(userInfo?.birthday).getTime() + 86400000)
                }
                w={"100%"}
                size="md"
              />
              <Textarea
                label="Summary"
                id="summary"
                size="md"
                w={"100%"}
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button type="submit" className="!bg-[#46A7B0]">
                Save
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="!text-[#46A7B0] !border-[#46A7B0]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Change Hourly Rate">
        <TextInput
          label="Rate ($/hr)"
          size="md"
          w={"100%"}
          placeholder="10$/hr"
          value={changedHourlyRate}
          onChange={(e) => setChangedHourlyRate(e.target.value)}
        />
        <Flex justify="end" gap={"sm"} mt={"md"}>
          <Button variant="outline" color="red" onClick={close}>
            Cancel
          </Button>
          <Button
            className="!bg-[#46A7B0]"
            onClick={() => handleUpdateRate(hourlyRate)}
          >
            Update Rate
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}
