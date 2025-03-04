"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function ExperienceRelaxionSection() {
  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div
      style={{
        backgroundImage: "url('/img/event_back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          className="flex flex-col lg:gap-6 md:gap-4 gap-2 max-w-7xl items-center py-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="font-bold lg:text-3xl md:text-2xl text-xl text-white Poppins-font text-center"
            variants={itemVariants}
          >
            {currentLanguage?.event_mobile_massage_title}
          </motion.span>

          <motion.span
            className="font-semibold lg:text-2xl md:text-xl text-lg text-center text-white Poppins-font"
            variants={itemVariants}
          >
            {currentLanguage?.event_mobile_massage_subtitle}
          </motion.span>

          <motion.span
            className="text-base text-white Poppins-font text-center"
            variants={itemVariants}
          >
            {currentLanguage?.event_mobile_massage_content}
          </motion.span>

          <motion.div
            className="flex flex-row gap-4 justify-center w-full"
            variants={itemVariants}
          >
            <Link href="/services">
              <motion.button
                className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-white"
                variants={buttonVariants}
                whileHover="hover"
              >
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  B
                </span>
                <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  S
                </span>
                <span className="md:text-lg sm:text-base">ervice</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
