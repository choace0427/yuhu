"use client";

import {
  Box,
  Container,
  Flex,
  Image,
  NumberInput,
  rem,
  Text,
  Textarea,
  TextInput,
  Title,
  Button,
  Avatar,
  CloseButton,
  Tabs,
  Group,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCircleLetterX,
  IconCircleX,
  IconPhoto,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Dropzone } from "@mantine/dropzone";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { supabase } from "@/supabase";
import dayjs from "dayjs";

export default function ProfilePage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [avatar, setAvatar] = useState<any>(null);

  const generalform = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", email: "", age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) =>
        value < 18 ? "You must be at least 18 to register" : null,
    },
  });

  const passwordform = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "secret",
      confirmPassword: "sevret",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  //   useEffect(() => {
  //     const fetchFilmData = async () => {
  //       const response = await fetch(`/api/films/edit/${film_id}`);
  //       const { data, error } = await response.json();

  //       if (error) {
  //         console.error("Error fetching film data:", error);
  //       } else {
  //         setAvatar(data.poster_img);
  //         form.setValues({
  //           title: data.title,
  //           publishYear: data.publish_year,
  //           description: data.description,
  //         });
  //       }
  //     };

  //     if (film_id) {
  //       fetchFilmData();
  //     }
  //   }, [film_id]);

  const handleImageUpload = (files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting image to base64:", error);
    };

    console.log("=========", avatar);
  };

  return (
    <Container size="md">
      <Title order={2} mb="lg" className="text-white">
        Edit Film
      </Title>

      <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        align={"start"}
        gap={{ base: 20, sm: 60 }}
      >
        <Box w={"fit"}>
          <Dropzone
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
              <Avatar src={avatar} size={160} />
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
                  <Avatar src={userInfo?.avatar} size={160} />
                </Dropzone.Idle>
              </>
            )}
          </Dropzone>
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

    validate: {
      name: (value) => {
        if (value.trim().length === 0) return "Name is required";
        if (value.trim().length < 2) return "Name must have at least 2 letters";
        return null;
      },
      location: (value) => {
        if (value.trim().length === 0) return "Location is required";
        if (value.trim().length < 2)
          return "Location must have at least 2 letters";
        return null;
      },
    },
  });

  const [birthday, setBirthday] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (values: any) => {
    console.log("=======", values);
    // if (userInfo) {
    //   setLoading(true);
    //   const { data, error } = await supabase
    //     .from("users")
    //     .update({
    //       name: values.name,
    //       location: values.location,
    //       birthday: dayjs(birthday).format("YYYY-MM-DD"),
    //     })
    //     .eq("id", userInfo?.id)
    //     .select();
    //   if (error) {
    //     console.log("error", error);
    //     toast.error("Failed to update profile");
    //     generalform.initialize({
    //       name: userInfo?.name,
    //       location: userInfo?.location,
    //     });
    //   }
    //   if (data) {
    //     setUserInfo(data[0]);
    //     toast.success("Successfullly updated profile");
    //   }
    //   setLoading(false);
    // }
  };

  return (
    <form
      onSubmit={generalform.onSubmit((values: any) =>
        handleProfileUpdate(values)
      )}
    >
      <Box w={"100%"} mt={"md"} px={"sm"}>
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
          defaultValue={userInfo?.location}
        />
        <DatePickerInput
          label="Birthday"
          mt="sm"
          size="md"
          placeholder="Pick your birthday"
          //   defaultValue={
          //     new Date(new Date(userInfo?.birthday).getTime() + 86400000)
          //   }
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
      <Box w={"100%"} mt={"md"} px={"sm"}>
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
