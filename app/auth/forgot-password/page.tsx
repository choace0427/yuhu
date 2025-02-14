"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Container,
  Stack,
  Image,
} from "@mantine/core";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const supabase = createClient();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
      });
      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
      } else {
        toast.success("Please check your email to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-row lg:flex-col w-full">
      <div className="lg:w-1/2 w-full h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="flex m-auto justify-center items-center w-full">
          <div className="m-auto pb-10 gap-8 flex flex-col sm:w-[450px] w-[350px]">
            <header className="text-start flex flex-col gap-4">
              <Image src="/img/logo.png" alt="logo" w={80} h={50} ml={-20} />
              <span className="text-3xl font-bold Poppins-font text-left">
                Forgot Password
              </span>
            </header>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                mt="sm"
                size="md"
                required
                label="Email"
                placeholder="Enter your email address"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <Button
                type="submit"
                mt={60}
                size="lg"
                fullWidth
                className="!bg-[#46A7B0]"
                // loading={loading}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 h-[calc(100vh-80px)] fixed right-0">
        <div className="flex flex-col items-center justify-center gap-8 h-full bg-[#46A7B0] rounded-l-3xl">
          <div className="flex flex-col gap-8">
            <div className="flex border-8 rounded-3xl w-[450px] h-[400px]">
              <Image
                className="rounded-2xl shadow-2xl bg-cover bg-center"
                src="/img/signup.png"
                alt="signup"
                width={450}
                height={400}
              />
            </div>
          </div>
          <div>
            <div className="text-center max-w-lg px-1.5 m-auto">
              <h3 className="text-white font-semibold font-popins text-4xl mb-4 Poppins-font">
                Relax, Quick and Smooth
              </h3>
              <p className="text-white text-base font-medium Poppins-font">
                Your gateway to relaxation and rejuvenation. Log in to unwind,
                refresh, and feel your best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
