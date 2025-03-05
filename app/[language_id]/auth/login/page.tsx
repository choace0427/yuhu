"use client";

import { useForm } from "@mantine/form";
import { Button, Image, PasswordInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../_store/authStore";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function LoginPage() {
  const { signIn, handlegoogleSignin } = useAuthStore();
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
          ? null
          : "Password must include uppercase, lowercase, and a number",
    },
  });

  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  const [savedLanguage, setSavedLanguage] = useState("en");

  useEffect(() => {
    const saveLanguage = localStorage.getItem("language_id") || "en";
    setSavedLanguage(saveLanguage);
  }, []);

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = () => {
    const values = form.getValues();
    try {
      setLoading(true);
      signIn(values.email, values.password, router);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-row lg:flex-col w-full">
      <div className="lg:w-1/2 w-full h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="flex m-auto justify-center items-center w-full">
          <div className="m-auto pb-10 gap-8 flex flex-col sm:w-[450px] w-[350px]">
            <header className="text-start flex flex-col gap-4">
              <Image src="/img/logo.png" alt="logo" w={80} h={50} ml={-20} />
              <span className="text-3xl font-bold Poppins-font text-left">
                {currentLanguage?.welcome_back} 👋
              </span>
              <span className="text-base Poppins-font">
                {currentLanguage?.welcome_back_content}
              </span>
            </header>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <TextInput
                mt="sm"
                label={currentLanguage?.email}
                placeholder="Enter your email address"
                size="md"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label={currentLanguage?.password}
                placeholder="Enter your password"
                mt={"sm"}
                size="md"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Text
                td="underline"
                fw={500}
                mt={"sm"}
                ta={"end"}
                onClick={() =>
                  router.replace(`/${savedLanguage}/auth/forgot-password`)
                }
                className="hover:cursor-pointer"
              >
                {currentLanguage?.forgot_password}
              </Text>
              <Button
                type="submit"
                mt={40}
                size="lg"
                fullWidth
                className="!bg-[#46A7B0]"
                loading={loading}
              >
                {currentLanguage?.login}
              </Button>
            </form>
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[23px]">
              <div className="flex-grow h-[1.5px] opacity-60 bg-black"></div>
              <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left text-black">
                {currentLanguage?.or}
              </p>
              <div className="flex-grow h-[1.5px] opacity-60 bg-black"></div>
            </div>
            <div
              className="inline-flex cursor-pointer justify-center items-center gap-x-2 border border-gray-600 rounded-lg sm:py-3 py-2 text-base text-gray-100 font-medium bg-black hover:bg-black/80"
              onClick={() => handlegoogleSignin(router)}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1097 11.0649C21.1097 10.2919 21.0457 9.72772 20.9072 9.1427H11.8994V12.6319H17.1868C17.0802 13.499 16.5046 14.8049 15.2253 15.6824L15.2074 15.7992L18.0555 17.9615L18.2528 17.9808C20.065 16.3406 21.1097 13.9273 21.1097 11.0649"
                  fill="#4285F4"
                />
                <path
                  d="M11.8984 20.2583C14.4887 20.2583 16.6633 19.4225 18.2517 17.9809L15.2243 15.6825C14.4141 16.2362 13.3268 16.6227 11.8984 16.6227C9.36127 16.6227 7.20796 14.9826 6.44036 12.7156L6.32785 12.7249L3.36637 14.9711L3.32764 15.0766C4.90531 18.148 8.14598 20.2583 11.8984 20.2583Z"
                  fill="#34A853"
                />
                <path
                  d="M6.44174 12.7157C6.2392 12.1307 6.12199 11.5038 6.12199 10.8562C6.12199 10.2084 6.2392 9.58163 6.43108 8.99661L6.42572 8.87201L3.42712 6.58984L3.32901 6.63558C2.67877 7.91011 2.30566 9.34137 2.30566 10.8562C2.30566 12.371 2.67877 13.8021 3.32901 15.0767L6.44174 12.7157"
                  fill="#FBBC05"
                />
                <path
                  d="M11.8984 5.08942C13.6999 5.08942 14.9152 5.85204 15.6081 6.48934L18.3158 3.89849C16.6528 2.3837 14.4888 1.45392 11.8984 1.45392C8.146 1.45392 4.90532 3.56418 3.32764 6.63554L6.42972 8.99657C7.20798 6.7296 9.36131 5.08942 11.8984 5.08942"
                  fill="#EB4335"
                />
              </svg>

              <span className="md:text-base text-sm Poppins-font text-gray-100">
                Sign In with Google
              </span>
            </div>
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
