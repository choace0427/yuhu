"use client";

import { Image } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../_store/authStore";

export default function TeamMember() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex md:flex-row flex-col md:gap-0 gap-4 w-full justify-between items-center">
      <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 max-w-[500px] md:items-start items-center">
        <span className="text-black font-bold lg:text-2xl md:text-xl text-lg Poppins-font md:text-start text-center">
          Meet Our Exceptional Team Members
        </span>
        <span className="text-black md:text-base text-sm Poppins-font md:text-start text-center">
          All professionals in our network are fully licensed, insured, and
          rigorously vetted through our industry-leading security protocols.
          When you book a Yuhu Wellness service either a relaxing massage,sports
          massage, personal training or beauty treatment session, you&apos;ll
          receive a confirmation with the therapist&apos;s full name,
          professional bio, and details about their expertise, ensuring
          transparency and trust. We are committed to providing the highest
          level of comfort and security.
        </span>
        <button
          className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
          onClick={() => {
            if (isAuthenticated) {
              router.push("/customer");
            } else {
              router.push("/role");
            }
          }}
        >
          <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
          <span className="md:text-lg sm:text-base">ook</span>&nbsp;
          <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
          <span className="md:text-lg sm:text-base">ow</span>
        </button>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row gap-2">
          <Image
            className="ellipse-responsive"
            id="ellipse-1"
            src="/img/ellipse1.png"
            alt="dashboard"
            width={120}
            height={120}
          />
          <Image
            className="ellipse-responsive"
            id="ellipse-2"
            src="/img/ellipse2.png"
            alt="dashboard"
            width={120}
            height={120}
          />
          <Image
            className="ellipse-responsive"
            id="ellipse-3"
            src="/img/ellipse3.png"
            alt="dashboard"
            width={120}
            height={120}
          />
          <Image
            className="ellipse-responsive"
            id="ellipse-4"
            src="/img/ellipse4.png"
            alt="dashboard"
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Image
            className="ellipse-responsive"
            id="ellipse-5"
            src="/img/ellipse5.png"
            alt="dashboard"
            width={120}
            height={120}
          />
          <Image
            className="ellipse-responsive"
            id="ellipse-6"
            src="/img/ellipse6.png"
            alt="dashboard"
            width={120}
            height={120}
          />
          <Image
            className="ellipse-responsive"
            id="ellipse-7"
            src="/img/ellipse7.png"
            alt="dashboard"
            width={120}
            height={120}
          />
        </div>
      </div>
    </div>
  );
}
