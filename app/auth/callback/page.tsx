"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/_store/authStore";

const Callback = () => {
  const { setUserInfo, setIsAuth } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      setIsLoading(true);

      const { data, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.log("errr", userError);
        setIsLoading(false);
        return;
      }

      const { data: customerData, error: customerError } = await supabase
        .from("customers_list")
        .select("*")
        .eq("id", data?.user?.id)
        .single();

      if (customerError || !customerData) {
        const { data: therapistData, error: therapistError } = await supabase
          .from("therapist_list")
          .select("*")
          .eq("id", data?.user?.id)
          .single();

        if (therapistError || !therapistData) {
          console.log("error", therapistError);
          router.push("/role");
        } else {
          setUserInfo(therapistData);
          setIsAuth(true);
          router.push("/therapist");
        }
      } else {
        setIsAuth(true);
        setUserInfo(customerData);
        router.push("/customer");
      }
    } catch (error) {
      console.error("Error during callback:", error);
      // invokeToast(
      //   "error",
      //   "An error occurred during the callback process.",
      //   "top"
      // );
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="min-h-[400px] bg-white bg-opacity-50 flex items-center justify-center">
      <Loader />
    </div>
  ) : null;
};

export default Callback;
