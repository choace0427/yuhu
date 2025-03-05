"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";
import { IconMassage, IconUser } from "@tabler/icons-react";
import { createClient } from "../../utils/supabase/client";

export default function UserRole() {
  const pathname = usePathname();
  const supabase = createClient();
  const { setUserInfo, setIsAuth } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState("customer");
  const router = useRouter();
  const [userData, setUserData] = useState<any>();

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleCustomerCreateAccount = async () => {
    const response = await fetch("/api/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData?.user_metadata?.full_name,
        email: userData?.user_metadata?.email,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const { error: userError } = await supabase
        .from("customers_list")
        .select("*")
        .eq("email", userData?.user_metadata?.email)
        .single();

      if (userError) {
        const { data: CustomerData, error: CustomerError } = await supabase
          .from("customers_list")
          .insert([
            {
              id: userData?.id,
              avatar_url: userData?.user_metadata?.avatar_url || "",
              email: userData?.user_metadata?.email,
              name: userData?.user_metadata?.full_name,
              stripe_customer_id: data?.customer?.id,
            },
          ])
          .select();

        if (CustomerError) {
          toast.error("Error saving user data. Please contact support!");
          return;
        }
        setUserInfo(CustomerData[0]);
        toast.success("Sign-up successful!");
        if (userData?.app_metadata?.provider === "google") {
          setIsAuth(true);
          router.replace(`/${currentLanguage}/services`);
        } else
          setTimeout(() => {
            router.replace(`/${currentLanguage}/auth/login`);
          }, 1000);
      }
    } else {
      console.error("Error creating customer:");
    }
  };

  const handleTherapistCreateAccount = async () => {
    const { error: userError } = await supabase
      .from("therapist_list")
      .select("*")
      .eq("email", userData?.user_metadata?.email)
      .single();

    if (userError) {
      const { data: therapistData, error: CustomerError } = await supabase
        .from("therapist_list")
        .insert([
          {
            id: userData?.id,
            avatar_url: userData?.user_metadata?.avatar_url || "",
            email: userData?.user_metadata?.email,
            name: userData?.user_metadata?.full_name,
            step: "general",
          },
        ])
        .select();

      if (CustomerError) {
        toast.error("Error saving user data. Please contact support!");
        return;
      }

      setUserInfo(therapistData[0]);
      toast.success("Sign-up successful!");
      if (userData?.app_metadata?.provider === "google") {
        setIsAuth(true);
        router.replace(`/${currentLanguage}/therapist/signup/general`);
      } else
        setTimeout(() => {
          router.replace(`/${currentLanguage}/auth/login`);
        }, 1000);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language_id") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleGetUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.log(userError);
        return;
      } else setUserData(user);
    };
    handleGetUser();
  }, []);

  return (
    <div className="flex flex-col gap-12 max-w-xl w-full items-center sm:px-0 px-6 mx-auto my-40">
      <span className="lg:text-3xl md:text-2xl text-xl font-bold text-black px-10 Poppins-font">
        Join as a Customer or Therapist
      </span>
      <div className="flex flex-row w-full justify-between">
        <div
          className={`flex flex-col items-center gap-4 border-2 ${
            selectedRole === "customer" ? "border-[#46A7B0]" : "border-black"
          } lg:max-w-60 md:max-w-48 max-w-36 lg:p-6 md:p-4 p-2 rounded-md cursor-pointer`}
          onClick={() => setSelectedRole("customer")}
        >
          <IconUser size={"1.6rem"} />
          <span className="text-black text-center lg:text-xl md:text-lg text-base Poppins-font">
            I&apos;m a Customer, Searching for a Service
          </span>
        </div>
        <div
          className={`flex flex-col items-center gap-4 border-2 ${
            selectedRole === "therapist" ? "border-[#46A7B0]" : "border-black"
          } lg:max-w-60 md:max-w-48 max-w-36 lg:p-6 md:p-4 p-2 rounded-md cursor-pointer`}
          onClick={() => setSelectedRole("therapist")}
        >
          <IconMassage size={"1.6rem"} />
          <span className="text-black text-center lg:text-xl md:text-lg text-base Poppins-font">
            I&apos;m a Therapist, Looking for Work
          </span>
        </div>
      </div>
      <button
        className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
        disabled={selectedRole === ""}
        onClick={
          selectedRole === "customer"
            ? handleCustomerCreateAccount
            : handleTherapistCreateAccount
        }
      >
        <span className="text-[#46A7B0] md:text-lg sm:text-base Poppins-font">
          C
        </span>
        <span className="md:text-lg sm:text-base Poppins-font">reate</span>
        &nbsp;
        <span className="text-[#46A7B0] md:text-lg sm:text-base Poppins-font">
          A
        </span>
        <span className="md:text-lg sm:text-base Poppins-font">ccount</span>
      </button>
    </div>
  );
}
