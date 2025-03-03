"use client";

import { ScrollContainer } from "react-scroll-motion";
import { motion } from "framer-motion";
import { Image } from "@mantine/core";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function EventSection() {
  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className="flex flex-col items-center lg:gap-6 md:gap-4 gap-3 text-center py-10">
        <h2 className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font">
          {currentLanguage?.events}
        </h2>
        <p className="text-black md:text-lg text-base Poppins-font">
          {currentLanguage?.event_title}
        </p>
        <p className="text-black md:text-base text-sm Poppins-font max-w-3xl">
          {currentLanguage?.event_content}
        </p>
      </div>
      <ScrollContainer>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-full">
          <div className="flex flex-col rounded-xl shadow-lg border p-6 gap-4">
            {[
              {
                title: currentLanguage?.sport_event,
                description: currentLanguage?.sport_event_content,
                image: "/img/event1.png",
                reverse: false,
              },
              {
                title: currentLanguage?.wedding,
                description: currentLanguage?.wedding_event,
                image: "/img/event2.png",
                reverse: true,
              },
              {
                title: currentLanguage?.charity_event,
                description: currentLanguage?.charity_event_content,
                image: "/img/event3.png",
                reverse: false,
              },
              {
                title: currentLanguage?.retreat,
                description: currentLanguage?.retreat_event,
                image: "/img/event4.png",
                reverse: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                  item.reverse ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                    {item.title}
                  </h3>
                  <p className="text-black text-sm">{item.description}</p>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={120}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col rounded-xl shadow-lg border p-6 gap-4 h-fit my-auto ">
            {[
              {
                title: currentLanguage?.employee_wellness,
                description: currentLanguage?.employee_wellness_content,
                image: "/img/event5.png",
                reverse: false,
              },
              {
                title: currentLanguage?.incentive,
                description: currentLanguage?.incentive_content,
                image: "/img/event6.png",
                reverse: true,
              },
              {
                title: currentLanguage?.client_hospitally,
                description: currentLanguage?.client_hospitally_content,
                image: "/img/event7.png",
                reverse: false,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                  item.reverse ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                    {item.title}
                  </h3>
                  <p className="text-black text-sm">{item.description}</p>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={120}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col rounded-xl shadow-lg border p-6 gap-4">
            {[
              {
                title: currentLanguage?.massage_gun,
                description: currentLanguage?.massage_gun_content,
                image: "/img/event8.png",
                reverse: false,
              },
              {
                title: currentLanguage?.oils,
                description: currentLanguage?.oils_content,
                image: "/img/event9.png",
                reverse: true,
              },
              {
                title: currentLanguage?.super_patch,
                description: currentLanguage?.super_patch_content,
                image: "/img/event10.png",
                reverse: false,
              },
              {
                title: currentLanguage?.massage_candle,
                description: currentLanguage?.massage_candle_content,
                image: "/img/event11.png",
                reverse: true,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                  item.reverse ? "flex-row-reverse" : ""
                }`}
                variants={cardVariants}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                    {item.title}
                  </h3>
                  <p className="text-black text-sm">{item.description}</p>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={120}
                  height={120}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit mx-auto"
            // onClick={() => handleBooking(service?.id)}
          >
            <span className="text-[#46A7B0] md:text-xl sm:text-base">M</span>
            <span className="md:text-xl sm:text-base">ore</span>
            &nbsp;
            <span className="text-[#46A7B0] md:text-xl sm:text-base">I</span>
            <span className="md:text-xl sm:text-base">nfo</span>
          </button>
        </div>
      </ScrollContainer>
    </>
  );
}
