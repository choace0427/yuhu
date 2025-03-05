"use client";

import { useEffect, useState } from "react";
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
  const supabaseClient = createClient();
  const [savedLanguage, setSavedLanguage] = useState("en");

  useEffect(() => {
    const language = localStorage.getItem("language_id") || "en";
    setSavedLanguage(language);
  }, []);

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      setIsLoading(true);

      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        setIsLoading(false);
        return;
      }

      const userEmail = userData?.user?.email;

      if (!userEmail) {
        console.error("User email is not available.");
        setIsLoading(false);
        return;
      }

      const { data: customerData, error: customerError } = await supabaseClient
        .from("customers_list")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (customerError || !customerData) {
        const { data: therapistData, error: therapistError } =
          await supabaseClient
            .from("therapist_list")
            .select("*")
            .eq("email", userEmail)
            .single();

        if (therapistError || !therapistData) {
          console.error("Therapist not found. Redirecting to role selection.");
          router.replace(`/${savedLanguage}/role`);
        } else {
          setUserInfo(therapistData);
          setIsAuth(true);
          router.replace(`/${savedLanguage}/therapist`);
        }
      } else {
        setUserInfo(customerData);
        setIsAuth(true);
        router.replace(`/${savedLanguage}/services`);
      }
    } catch (error) {
      console.error("Error during callback:", error);
      toast.error("An error occurred during the callback process.");
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
