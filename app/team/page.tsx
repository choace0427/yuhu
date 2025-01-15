import { Image } from "@mantine/core";
import TeamCard from "../components/team/TeamCard";

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full px-4">
        <div className="w-full flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between lg:pt-10 md:pt-8 pt-6">
          <div className="flex flex-col gap-4 max-w-[600px] md:items-start items-center">
            <span className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold">
              Meet the Team
            </span>
            <span className="lg:text-lg md:text-base text-sm text-black Poppins-font md:text-start text-center">
              All of our professional massage therapists are fully licensed,
              insured, and rigorously vetted through our industry-leading
              security protocols. When you book a Yuhu Wellness service, be it a
              relaxing massage, a sports massage, a personal training or our
              beauty treatment sessions, you will receive a confirmation with
              your therapist&apos;s full name, professional bio, and details
              about their expertise, ensuring transparency and trust. We are
              committed to providing the highest level of comfort and security.
            </span>
            <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">OOK</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">T</span>
              <span className="md:text-lg sm:text-base">ODAY</span>
            </button>
          </div>
          <Image
            className="team-responsive"
            id="team"
            src="/img/team.png"
            alt="team"
            width={550}
            height={460}
          />
        </div>
        <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 items-center justify-center">
          <div className="flex md:flex-row flex-col w-full md:justify-between justify-center items-center lg:px-10 md:px-8 sm:px-6 px-4 md:pb-20 pb-0 md:gap-0 gap-4">
            <TeamCard />
            <TeamCard />
          </div>
          <div className="flex md:flex-row flex-col w-full md:justify-between justify-center items-center lg:px-10 md:px-8 sm:px-6 px-4 md:pb-20 pb-0 md:gap-0 gap-4">
            <TeamCard />
            <TeamCard />
          </div>
          <div className="flex md:flex-row flex-col w-full md:justify-between justify-center items-center lg:px-10 md:px-8 sm:px-6 px-4 md:pb-20 pb-0 md:gap-0 gap-4">
            <TeamCard />
            <TeamCard />
          </div>
          <div className="flex md:flex-row flex-col w-full md:justify-between justify-center items-center lg:px-10 md:px-8 sm:px-6 px-4 md:pb-20 pb-0 md:gap-0 gap-4">
            <TeamCard />
            <TeamCard />
          </div>
          <div className="flex md:flex-row flex-col w-full md:justify-between justify-center items-center lg:px-10 md:px-8 sm:px-6 px-4 md:pb-20 pb-6 md:gap-0 gap-4">
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#D9D9D9] lg:py-10 md:py-8 py-6 flex items-center justify-center lg:mb-20 md:mb-16 mb-12">
        <div className="flex flex-col lg:gap-8 md:gap-6 gap-4 max-w-7xl items-center">
          <span className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font text-center">
            Join Us on Our Journey
          </span>
          <span className="lg:text-lg md:text-base text-sm text-black Poppins-font text-center px-10">
            Lorem ipsum dolor sit amet consectetur. Magna risus et in tempor
            nulla condimentum in ac. Sapien nisl nisl ac lobortis mauris. Vitae
            Lorem ipsum dolor sit amet consectetur. Magna risus et in tempor
            nulla condimentum in ac. Sapien nisl nisl ac lobortis mauris. Vitae
          </span>
          {/* <button className="bg-[#46A7B0] md:text-base text-sm text-white Poppins-font p-2 w-24 rounded-md">
              Join Now
            </button> */}
          <button className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
            <span className="text-[#46A7B0] md:text-lg sm:text-base">J</span>
            <span className="md:text-lg sm:text-base">oin</span>&nbsp;
            <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
            <span className="md:text-lg sm:text-base">ow</span>
          </button>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
