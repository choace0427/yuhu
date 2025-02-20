"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useAuthStore } from "../_store/authStore";
import { toast } from "react-toastify";

export function BlockedUserHandler() {
  const { signOut } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const checkBlockedStatus = async () => {
      const blockedCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_blocked="));
      const blockedParam = searchParams.get("blocked");

      console.log("Checking for blocked status:", {
        blockedCookie,
        blockedParam,
      });

      if (blockedCookie || blockedParam === "true") {
        console.log("User is blocked, signing out");
        toast.error("Your account was blocked. Please contact to support team");
        await signOut(router);
        document.cookie =
          "user_blocked=; Max-Age=0; path=/; domain=" +
          window.location.hostname;

        // Remove the 'blocked' parameter from the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("blocked");
        window.history.replaceState({}, "", newUrl.toString());

        router.push("/auth/login");
      }
    };
    const checkPendingStatus = async () => {
      const pendingCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user_pending="));
      const blockedParam = searchParams.get("pending");

      console.log("Checking for blocked status:", {
        pendingCookie,
        blockedParam,
      });

      if (pendingCookie || blockedParam === "true") {
        toast.warn("Please wait till to accept your register request");
        //   await signOut(router);
        document.cookie =
          "user_blocked=; Max-Age=0; path=/; domain=" +
          window.location.hostname;

        // Remove the 'blocked' parameter from the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("pending");
        window.history.replaceState({}, "", newUrl.toString());

        router.push("/home");
      }
    };

    checkBlockedStatus();
    checkPendingStatus();
  }, [router, searchParams, supabase]);

  return null;
}
