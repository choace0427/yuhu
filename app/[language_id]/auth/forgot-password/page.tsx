"use client";

import { useForm } from "@mantine/form";
import { TextInput, Button, Image } from "@mantine/core";
import { toast } from "react-toastify";
import { supabase } from "@/supabase";
import { useState } from "react";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
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
      console.log("Form values:", values);
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/forgot-password/reset`,
        }
      );

      if (error) {
        toast.error(`${error?.message}`);
        return;
      }

      toast.success("Please check your email to reset password");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  return (
    <div className="flex flex-row lg:flex-col w-full">
      <div className="lg:w-1/2 w-full h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="flex m-auto justify-center items-center w-full">
          <div className="m-auto pb-10 gap-8 flex flex-col sm:w-[450px] w-[350px]">
            <header className="text-start flex flex-col gap-4">
              <Image src="/img/logo.png" alt="logo" w={80} h={50} ml={-20} />
              <span className="text-3xl font-bold Poppins-font text-left">
                {currentLanguage?.forgot_password}
              </span>
            </header>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                mt="sm"
                size="md"
                required
                label={currentLanguage?.email}
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
                loading={loading}
              >
                {currentLanguage?.login}
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
                {currentLanguage?.auth_content_1}
              </h3>
              <p className="text-white text-base font-medium Poppins-font">
                {currentLanguage?.auth_content_2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
