"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import { FaRegUser } from "react-icons/fa6";
// import { TbMassage } from "react-icons/tb";
import { supabase } from "@/supabase";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";
import { IconMassage, IconUser } from "@tabler/icons-react";
// import { useUserContext } from "@/contexts/userContext";
// import { useToastContext } from "@/contexts/toastContext";

export default function UserRole() {
  const { setUserInfo, setIsAuth, userInfo } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const [userData, setUserData] = useState<any>();

  const handleCreateAccount = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ role: selectedRole })
      .eq("id", userData.id)
      .select();

    if (error) {
      console.log("error", error);
    } else {
      setIsAuth(true);
      setUserInfo(data[0]);
      localStorage.setItem("userInfo", JSON.stringify(data[0]));
      if (selectedRole === "customer") {
        router.push("/customer");
      } else if (selectedRole === "therapist") {
        router.push("/therapist");
      }
      toast.success("Sign up successful!");
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
          {/* <FaRegUser className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6" /> */}
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
          {/* <TbMassage className="lg:w-10 lg:h-10 md:w-8 md:h-8 w-6 h-6" /> */}
          <span className="text-black text-center lg:text-xl md:text-lg text-base Poppins-font">
            I&apos;m a Therapist, Looking for Work
          </span>
        </div>
      </div>
      <button
        className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
        disabled={selectedRole === ""}
        onClick={handleCreateAccount}
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
