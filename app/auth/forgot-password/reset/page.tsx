"use client";

import { useForm } from "@mantine/form";
import { PasswordInput, Button, Image } from "@mantine/core";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      newPassword: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    if (eventValue === "PASSWORD_RECOVERY") {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password: values.newPassword,
      });
      if (data?.user) {
        toast.success("Password updated successfully!");
        // router.push("/auth/login");
      }
      if (error) toast.error(`${error}`);
      setLoading(false);
    }
  };

  const [eventValue, setEventValue] = useState<any>();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setEventValue(event);
      }
    });
  }, []);

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
              <PasswordInput
                mt={"sm"}
                size="md"
                key={form.key("newPassword")}
                required
                label="New Password"
                placeholder="Enter your new password"
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                mt={"sm"}
                size="md"
                key={form.key("confirmPassword")}
                required
                label="Confirm Password"
                placeholder="Confirm your new password"
                {...form.getInputProps("confirmPassword")}
              />
              <Button
                type="submit"
                mt={60}
                size="lg"
                fullWidth
                className="!bg-[#46A7B0]"
                loading={loading}
              >
                Reset Password
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
