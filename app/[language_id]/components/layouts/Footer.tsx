import { Anchor, Image } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function Footer() {
  const router = useRouter();

  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  const [savedLanguage, setSavedLanguage] = useState("en");

  useEffect(() => {
    const saveLanguage = localStorage.getItem("language_id") || "en";
    setSavedLanguage(saveLanguage);
  }, []);

  return (
    <div className="w-full lg:h-[480px] h-[380px] bg-[#46A7B0] shadow-2xl flex px-4 flex-col items-center">
      <div className="justify-between lg:py-12 md:py-8 sm:py-4 py-2 flex md:flex-row max-w-7xl flex-col lg:px-10 md:px-8 sm:px-6 px-4 w-full">
        <div className="flex flex-col lg:gap-12 md:gap-8 gap-4 md:pb-0 pb-2 md:items-start items-center">
          <span className="lg:text-4xl md:text-3xl text-2xl text-white Poppins-font font-bold">
            Yuhu Wellness
          </span>
          <div className="flex md:flex-col flex-row lg:gap-12 md:gap-10 gap-8">
            <Image
              className="app-image-responsive"
              id="app-store"
              src={"/img/app-store.png"}
              alt="app store"
              width={190}
              height={59}
            />
            <Image
              className="app-image-responsive"
              id="google-play"
              src={"/img/google-play.png"}
              alt="google play"
              width={190}
              height={59}
            />
          </div>
        </div>
        <div className="flex flex-row lg:gap-16 md:gap-12 sm:gap-8 gap-4 md:justify-start justify-center">
          <div className="flex flex-col lg:gap-6 md:gap-4 sm:gap-2 gap-1">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              {currentLanguage?.treatments}
            </span>
            <div className="flex flex-col gap-4">
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.categories}
              </span>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.giftCards}
              </span>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.bookNow}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              {currentLanguage?.company}
            </span>
            <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
              <Anchor onClick={() => router.replace(`/${savedLanguage}/`)}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  {currentLanguage?.home}
                </span>
              </Anchor>
              {/* <Anchor onClick={() => router.replace("/faqs")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  FAQ&apos;s
                </span>
              </Anchor> */}
              <Anchor
                onClick={() => router.replace(`/${savedLanguage}/services`)}
              >
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Our Services
                </span>
              </Anchor>
              <Anchor
                onClick={() => router.replace(`/${savedLanguage}/pricing`)}
              >
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  {currentLanguage?.events}
                </span>
              </Anchor>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              {currentLanguage?.therapist}
            </span>
            <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
              <Anchor onClick={() => router.replace(`/${savedLanguage}/team`)}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  {currentLanguage?.join_the_team}
                </span>
              </Anchor>
              <Anchor
                onClick={() => router.replace(`/${savedLanguage}/events`)}
              >
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  {currentLanguage?.store}
                </span>
              </Anchor>
              <button
                className="bg-white flex flex-row items-center justify-center rounded-md p-2 gap-2"
                onClick={() => router.replace(`/${savedLanguage}/`)}
              >
                <IconMapPin size={"1rem"} />
                <span className="text-black lg:text-base md:text-sm text-xs text-left">
                  {currentLanguage?.spain}
                </span>
              </button>
              <button
                className="bg-white flex flex-row items-center justify-center rounded-md p-2 gap-2"
                onClick={() => router.replace(`/${savedLanguage}/`)}
              >
                <IconMapPin size={"1rem"} />
                <span className="text-black lg:text-base md:text-sm text-xs text-left">
                  {currentLanguage?.italy}
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              {currentLanguage?.legal}
            </span>
            <Anchor onClick={() => router.replace(`/${savedLanguage}/legal`)}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.privacy_policy}
              </span>
            </Anchor>
            <Anchor onClick={() => router.replace(`/${savedLanguage}/legal`)}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.cookies_policy}
              </span>
            </Anchor>
            <Anchor onClick={() => router.replace(`/${savedLanguage}/legal`)}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.imprint}
              </span>
            </Anchor>
            <Anchor onClick={() => router.replace(`/${savedLanguage}/legal`)}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                {currentLanguage?.terms_service}
              </span>
            </Anchor>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 sm:gap-2 gap-1 items-center">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              {currentLanguage?.health_advisor}
            </span>
            <Image
              className="ai-logo-responsive w-20 h-60"
              id="ai-logo"
              src={"/img/ai-logo.png"}
              alt="ai-logo"
              // width={32}
              // height={32}
            />
          </div>
        </div>
      </div>
      <div className="border-b-2 border-white w-full px-20"></div>
      <span className="text-white text-xs mt-2 sm:pb-2 pb-0">
        &copy;{currentLanguage?.footer_content}
      </span>
    </div>
  );
}
