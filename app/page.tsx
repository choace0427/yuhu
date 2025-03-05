"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language_id") || "en";
    console.log("savedLanguage", savedLanguage);
    router.replace(`/${savedLanguage}/`);
  }, [router]);

  return <></>;
}
