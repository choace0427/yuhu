"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase";
import { Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { createClient } from "@/app/utils/supabase/client";
import { useAuthStore } from "../../_store/authStore";

const Callback = () => {
  const { setUserInfo, setIsAuth } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

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
        .eq("email", data?.user?.email)
        .single();

      if (customerError || !customerData) {
        const { data: therapistData, error: therapistError } = await supabase
          .from("therapist_list")
          .select("*")
          .eq("id", data?.user?.email)
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
