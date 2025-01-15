"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./_store/authStore";
import Link from "next/link";
import TeamMember from "./components/team/TeamMembers";
import Event from "./components/events/Event";
import Contacts from "./components/contacts/Contacts";

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="https://nextjs.org/icons/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
    //       <li className="mb-2">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
    //           app/page.tsx
    //         </code>
    //         .
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="https://nextjs.org/icons/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="https://nextjs.org/icons/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
    <main className="flex h-full w-full flex-col items-center justify-between lg:gap-20 md:gap-14 gap-8">
      <div className="bg-[#46A7B0] py-14 w-full flex justify-center">
        <div className="flex flex-row w-full justify-between max-w-7xl">
          <div className="flex flex-col gap-4 items-center w-[500px]">
            <span className="Poppins-font text-white text-3xl font-bold">
              Find your local massage service:
            </span>
            <div className="flex flex-row justify-between w-full px-20">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-2xl text-gray-200 Poppins-font">
                  Italy
                </span>
                <span className="text-base text-white Poppins-font">Roma</span>
                <span className="text-base text-white Poppins-font">
                  Milano
                </span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-2xl text-gray-200 Poppins-font">
                  Spain
                </span>
                <span className="text-base text-white Poppins-font">
                  Mallorca
                </span>
                <span className="text-base text-white Poppins-font">Ibiza</span>
                <span className="text-base text-white Poppins-font">
                  Madrid
                </span>
                <span className="text-base text-white Poppins-font">
                  Malaga
                </span>
                <span className="text-base text-white Poppins-font">
                  Barcelona
                </span>
              </div>
            </div>
          </div>
          <video
            className="w-[500px] rounded-3xl"
            src="https://myyuhubucket.s3.us-east-2.amazonaws.com/video-output-A46683D6-84E3-4524-8FB5-E6C7BF446550.mov"
            controls
            autoPlay
            loop
          />
        </div>
      </div>
      <div className="flex flex-col lg:gap-6 md:gap-4 gap-2 max-w-7xl items-center">
        <span className="font-bold lg:text-3xl md:text-2xl text-xl text-black Poppins-font text-center">
          Mobile Massage Mallorca - experience relaxation
        </span>
        <span className="font-semibold lg:text-2xl md:text-xl text-lg text-center text-black Poppins-font">
          Relaxation, beauty treatments and wellness near you, delivered to your
          doorstep or workplace in Mallorca, Ibiza and across Spain
        </span>
        <span className="text-base text-black Poppins-font text-center">
          Looking for the perfect way to unwind in the beautiful surroundings?
          Our expert mobile massage services in Mallorca, Ibiza and Spain bring
          relaxation to you-whether you&apos;re at home, a hotel, or a private
          villa. From deep tissue to soothing relaxation massages, we ensure a
          tailored experience to meet your needs. Yuhu Wellness brings
          professional massage therapists to your villa, home, hotel, yacht, or
          workplace anywhere in Mallorca, Ibiza & Spain, offering the ultimate
          convenience and luxury for your wellbeing. Whether you are on holidays
          or a resident, with Yuhu Wellness, you can enjoy expert massage and
          beauty treatments in the comfort of your own space and on your
          schedule.
        </span>
        <div className="flex flex-row gap-4 justify-center w-full">
          <Link href="/services">
            <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">ook</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">S</span>
              <span className="md:text-lg sm:text-base">ervice</span>
            </button>
          </Link>
        </div>
      </div>
      <section className="flex bg-[#D9D9D9] w-full justify-center item-center lg:pt-12 md:pt-10 pt-8 lg:pb-12 md:pb-10 pb-8">
        <div className="flex md:flex-row flex-col justify-between w-full max-w-7xl items-center px-4">
          <div className="flex flex-col md:gap-4 gap-2 max-w-[600px] md:items-start items-center md:pb-0 pb-4">
            <span className="text-black lg:text-3xl md:text-2xl text-xl font-bold Poppins-font md:text-start text-center">
              Why Choose Yuhu Wellness?
            </span>
            <span className="text-black Poppins-font text-base">
              Why Choose Us? With our on-demand, mobile massage services in
              Mallorca, Ibiza and Spain, you save time and enjoy a premium spa
              experience in the comfort of your chosen location. Whether
              you&apos;re relaxing after a long day exploring Mallorca or
              celebrating a special event, we&apos;re here to ensure your
              complete relaxation.
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-black md:text-base text-sm Poppins-font">
                • Convenient &amp; Time-saving: book our mobile massage or
                beauty treatment at a time that suits you. No nee d to worry
                about driving, parking, or babysitters-stay in the comfort of
                your space.
              </span>
              <span className="text-black md:text-base text-sm Poppins-font">
                • Tailored Services: Our skilled professionals offer
                personalized treatments across Mallorca, including sports
                recovery, pain relief, and relaxation massages.
              </span>
              <span className="text-black md:text-base text-sm Poppins-font">
                • Spa Quality at Home: Enjoy premium wellness services without
                the hassle of traveling to a spa.
              </span>
            </div>
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
          <div className="border rounded-2xl">
            <Image
              className="blog-responsive"
              id="blog-1"
              src="/img/blog-1.png"
              alt="dashboard"
              width={550}
              height={380}
            />
          </div>
        </div>
      </section>
      <section className="flex w-full justify-center item-center lg:pt-10 md:pt-8 pt-6 lg:pb-10 md:pb-8 pb-6 px-4">
        <div className="flex md:flex-row flex-col gap-4 justify-between w-full max-w-7xl items-center">
          <div className="border rounded-2xl">
            <Image
              className="blog-responsive"
              id="blog-2"
              src="/img/blog-2.png"
              alt="dashboard"
              width={556}
              height={480}
            />
          </div>
          <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 max-w-[650px] md:items-start items-center">
            <span className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font">
              How it works?
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-black md:text-base text-sm Poppins-font">
                1. Choose your wellness service. Select from a variety of
                massage and beauty treatments.
              </span>
              <span className="text-black md:text-base text-sm Poppins-font">
                2. Set your location and preferred time. Whether it&apos;s your
                home, villa, or hotel.
              </span>
              <span className="text-black md:text-base text-sm Poppins-font">
                3. Book instantly-enjoy same-day availability or schedule in
                advance.
              </span>
              <span className="text-black md:text-base text-sm Poppins-font">
                Yuhu Wellness and Massage makes it simple to access luxury
                wellness services at affordable prices. Experience the
                convenience of on-demand mobile wellness services, whether you
                are in Mallorca Ibiza, or another Spanish city, our team is
                ready to deliver relaxation and rejuvenation.
              </span>
            </div>
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
              <span className="text-[#46A7B0] md:text-lg sm:text-base">T</span>
              <span className="md:text-lg sm:text-base">ry</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
              <span className="md:text-lg sm:text-base">ow</span>
            </button>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center lg:pt-10 md:pt-8 pt-6 lg:pb-10 md:pb-8 pb-6 px-4">
        <div className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-8 md:gap-6 gap-4">
          <span className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font text-center">
            Our Team
          </span>
          <TeamMember />
        </div>
      </section>
      <section className="flex w-full items-center justify-center lg:pt-10 md:pt-8 pt-6 lg:pb-10 md:pb-8 pb-6 px-4">
        <div className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-6 md:gap-4 gap-2">
          <span className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font text-center">
            Mobile Wellness Events
          </span>
          <span className="text-black md:text-base text-sm Poppins-font text-center">
            Tailored Wellness Experiences in Mallorca, Ibiza and across Spain
          </span>
          <span className="text-black md:text-base text-sm Poppins-font text-center">
            We specialize in creating unique wellness events that bring
            relaxation and rejuvenation directly to you. Whether you&apos;re
            organizing a corporate wellness retreat, private event, or group
            wellness in Mallorca, Ibiza or across Spain to suit your needs. Our
            expert therapists are licensed, insured, and thoroughly vetted to
            ensure the highest standards of care and professionalism.
          </span>
          <Event />
        </div>
      </section>
      <Contacts />
    </main>
  );
}
