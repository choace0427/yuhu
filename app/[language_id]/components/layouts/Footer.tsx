import { Anchor, Image } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

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
              Treatments
            </span>
            <div className="flex flex-col gap-4">
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Categories
              </span>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Gift cards 
              </span>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Book now
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              Company
            </span>
            <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
              <Anchor onClick={() => router.push("/")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Home
                </span>
              </Anchor>
              {/* <Anchor onClick={() => router.push("/faqs")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  FAQ&apos;s
                </span>
              </Anchor> */}
              <Anchor onClick={() => router.push("/services")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Our Services
                </span>
              </Anchor>
              <Anchor onClick={() => router.push("/pricing")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Events
                </span>
              </Anchor>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              Therapist
            </span>
            <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
              <Anchor onClick={() => router.push("/team")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Join the team
                </span>
              </Anchor>
              <Anchor onClick={() => router.push("/events")}>
                <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                  Store 
                </span>
              </Anchor>
              <button
                className="bg-white flex flex-row items-center justify-center rounded-md p-2 gap-2"
                onClick={() => router.push("/")}
              >
                <IconMapPin size={"1rem"} />
                <span className="text-black lg:text-base md:text-sm text-xs text-left">
                  Spain
                </span>
              </button>
              <button
                className="bg-white flex flex-row items-center justify-center rounded-md p-2 gap-2"
                onClick={() => router.push("/")}
              >
                <IconMapPin size={"1rem"} />
                <span className="text-black lg:text-base md:text-sm text-xs text-left">
                  Italy
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 gap-2">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              Legal
            </span>
            <Anchor onClick={() => router.push("/legal")}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Privacy Policy
              </span>
            </Anchor>
            <Anchor onClick={() => router.push("/legal")}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Cookies Policy
              </span>
            </Anchor>
            <Anchor onClick={() => router.push("/legal")}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Imprint
              </span>
            </Anchor>
            <Anchor onClick={() => router.push("/legal")}>
              <span className="lg:text-base md:text-sm text-xs text-white Poppins-font md:text-start text-center">
                Terms of Service
              </span>
            </Anchor>
          </div>
          <div className="flex flex-col lg:gap-6 md:gap-4 sm:gap-2 gap-1 items-center">
            <span className="lg:text-2xl md:text-xl sm:text-lg text-base text-white Poppins-font font-medium md:text-start text-center">
              AI Health Advisor
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
        &copy;2024 Yuhu All Rights Reserved.
      </span>
    </div>
  );
}
