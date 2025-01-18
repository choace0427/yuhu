"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/supabase";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";
import { IconMassage, IconUser } from "@tabler/icons-react";

export default function UserRole() {
  const [selectedRole, setSelectedRole] = useState("customer");
  const router = useRouter();
  const [userData, setUserData] = useState<any>();

  const handleCustomerCreateAccount = async () => {
    const response = await fetch("/api/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData?.full_name,
        email: userData?.email,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const { error: userError } = await supabase
        .from("customers_list")
        .select("*")
        .eq("id", userData?.sub)
        .single();

      if (userError) {
        const { error: CustomerError } = await supabase
          .from("customers_list")
          .insert([
            {
              id: userData?.sub,
              email: userData?.email,
              name: userData?.full_name,
              stripe_customer_id: data?.customer?.id,
            },
          ]);

        if (CustomerError) {
          toast.error("Error saving user data. Please contact support!");
          return;
        }

        toast.success("Sign-up successful!");
        setTimeout(() => {
          router.push("/auth/login");
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
      .eq("id", userData?.sub)
      .single();

    if (userError) {
      const { error: CustomerError } = await supabase
        .from("therapist_list")
        .insert([
          {
            id: userData?.sub,
            email: userData?.email,
            name: userData?.full_name,
          },
        ]);

      if (CustomerError) {
        toast.error("Error saving user data. Please contact support!");
        return;
      }

      toast.success("Sign-up successful!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    }
  };

  useEffect(() => {
    const handleGetUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.log(userError);
        return;
      } else setUserData(user?.user_metadata);
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
