"use client";

import { motion } from "framer-motion";
import { Image } from "@mantine/core";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import translations from "@/app/utils/language";

type TranslationKeys = keyof typeof translations;

export default function Contacts() {
  const params = useParams();
  const languageId = params.language_id as TranslationKeys;

  const currentLanguage = translations[languageId] || translations.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex md:flex-row flex-col items-center w-full justify-between max-w-7xl border lg:py-14 md:py-10 py-6 px-4"
    >
      <motion.div
        variants={containerVariants}
        className="md:pl-20 pl-0 flex flex-col max-w-[550px] w-full lg:gap-8 md:gap-6 gap-4"
      >
        <motion.span
          variants={titleVariants}
          className="text-black lg:text-4xl md:text-3xl text-2xl Poppins-font font-bold md:text-start text-center"
        >
          {currentLanguage?.contactUs}
        </motion.span>
        <motion.span
          variants={formVariants}
          className="text-black md:text-lg text-base Poppins-font md:text-start text-center"
        >
          {currentLanguage?.contact_us_content}
        </motion.span>
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          <div className="w-full flex flex-col gap-4">
            {[
              {
                name: "Name",
                type: "text",
                placeholder: `${currentLanguage.name} *`,
              },
              {
                name: "Email",
                type: "text",
                placeholder: `${currentLanguage.email} *`,
              },
              {
                name: "Phone number",
                type: "text",
                placeholder: `${currentLanguage.phoneNumber} *`,
              },
            ].map((input, index) => (
              <motion.input
                key={input.name}
                variants={inputVariants}
                custom={index}
                className="w-full rounded-md border Poppins-font border-[#e2e8f0] bg-white py-2 px-4 text-black md:text-base text-sm focus:border-blue-400 focus-visible:outline-none dark:border-[#e2e8f0]"
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                whileFocus={{ scale: 1.01 }}
              />
            ))}
            <motion.textarea
              variants={inputVariants}
              custom={3}
              className="w-full rounded-md border Poppins-font border-[#e2e8f0] bg-white py-2 px-4 text-black md:text-base text-sm focus:border-blue-400 focus-visible:outline-none dark:border-[#e2e8f0]"
              name="Message"
              id="Message"
              placeholder={`${currentLanguage.message}` + " *"}
              rows={4}
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          <motion.button
            variants={formVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
          >
            <span className="text-[#46A7B0] md:text-lg sm:text-base">S</span>
            <span className="md:text-lg sm:text-base">ubmit</span>
          </motion.button>
          <div className="flex flex-row w-full gap-10 items-center">
            {[
              {
                icon: <IconPhoneCall className="w-6 h-6 text-[#46A7B0]" />,
                label: `${currentLanguage.phone}`,
                value: "+34624388967",
              },
              {
                icon: <IconMail className="w-6 h-6 text-[#46A7B0]" />,
                label: `${currentLanguage.email}`,
                value: "info@yuhuapp.com",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                variants={contactInfoVariants}
                custom={index}
                className="flex flex-row gap-2 items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                {contact.icon}
                <div className="flex flex-col">
                  <span className="text-black text-xs Poppins-font">
                    {contact.label}
                  </span>
                  <span className="text-[#46A7B0] text-xs Poppins-font">
                    {contact.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div variants={imageVariants}>
        <Image
          id="contact"
          src="/img/contact.png"
          alt="contact"
          width={400}
          height={380}
          className="w-[400px] h-[580px] rounded-xl md:flex md:!block !hidden"
        />
      </motion.div>
    </motion.div>
  );
}
