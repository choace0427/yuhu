"use client";

import { Image } from "@mantine/core";
import Services from "../components/services/Services";
import Massage from "../components/massage/Massage";
import Training from "../components/training/Training";
import PersonalTraining from "../components/training/PersonalTraining";
import Gift from "../components/gift/Gift";

export default function ServicesPage() {
  return (
    <div className="flex flex-col lg:gap-16 md:gap-12 gap-8 max-w-7xl sm:px-0 px-2 w-full mx-auto">
      <div className="w-full flex sm:flex-row flex-col sm:gap-0 gap-2 items-center justify-between lg:pt-10 md:pt-8 pt-6">
        <div className="flex flex-col lg:gap-4 md:gap-3 gap-2 max-w-[600px] sm:items-start items-center px-4">
          <span className="lg:text-5xl md:text-4xl text-3xl md:px-0 px-4 text-[#46A7B0] Poppins-font font-semibold">
            Our Services
          </span>
          <span className=" md:text-xl text-sm text-black Poppins-font sm:text-start text-center">
            Yuhu Wellness brings massages,fitness and beauty treatments to you.
            We offer mobile massage and personal training services tailored to
            your needs, available across Mallorca, Ibiza, Spain Rome, Milan, and
            throughout Italy. Save time and enjoy professional wellness
            experiences wherever you are, delivered by certified experts.
          </span>
          <button className="md:text-base text-sm font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
            <span className="text-[#46A7B0] text-lg">B</span>
            <span className="text-lg">ook</span>&nbsp;
            <span className="text-[#46A7B0] text-lg">N</span>
            <span className="text-lg">ow</span>
          </button>
        </div>
        <Image
          className="service-responsive"
          id="service"
          src="/img/service.png"
          alt="aboutus"
          width={550}
          height={460}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-8 md:gap-6 gap-4">
          <span className="text-[#46A7B0] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold Poppins-font text-center">
            Our Main Services
          </span>
          <div className="flex sm:flex-row flex-col justify-between items-center w-full lg:gap-12 md:gap-10 gap-8">
            <Services
              src={`/img/massage.png`}
              title={`Massage`}
              body={`Relax with Yuhu Mobile Wellness, offering professional massages in Mallorca, Ibiza, Spain, and soon across Italy. Choose from deep tissue, sports, or relaxing massages—all delivered to your home or workplace. Feel stress-free and rejuvenated.`}
            />
            <Services
              src={`/img/training.png`}
              title={`Personal Training`}
              body={`Achieve your fitness goals with Yuhu Mobile Wellness. Our certified trainers offer tailored workouts at home, in Mallorca, Ibiza, Spain, and soon across Italy. Convenient sessions fit your schedule for weight loss, muscle gain, or overall fitness.`}
            />
            <Services
              src={`/img/treatment.png`}
              title={`Beauty Treatment`}
              body={`Enjoy luxury beauty treatments with Yuhu Mobile Wellness in Mallorca, Ibiza, Spain, and soon across Italy. From facials to manicures, our mobile service brings expert care to your home. Look and feel your best effortlessly.`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4">
        <span className="text-black font-bold lg:text-3xl md:text-2xl text-xl">
          Massage Categories
        </span>
        <Massage />
      </div>
      <div className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4">
        <span className="text-black font-bold lg:text-3xl md:text-2xl text-xl">
          Personal Training Categories
        </span>
        <Training />
      </div>
      <div className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4">
        <span className="text-black font-bold lg:text-3xl md:text-2xl text-xl">
          Beauty Treatment Categories
        </span>
        <PersonalTraining />
      </div>
      <div className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 pb-28 md:px-0 px-4">
        <span className="text-black font-bold lg:text-3xl md:text-2xl text-xl">
          Gift Cards
        </span>
        <Gift />
      </div>
    </div>
  );
}
