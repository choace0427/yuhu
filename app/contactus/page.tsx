"use client";

import { Image } from "@mantine/core";
import Contacts from "../components/contacts/Contacts";
import FAQ from "../components/faq/FAQ";
import { motion } from "framer-motion";

export default function ContactusPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col w-full lg:gap-8 md:gap-6 gap-4 justify-center items-center">
      <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full justify-center px-4">
        <div className="w-full flex md:flex-row flex-col items-center justify-between pt-10">
          <motion.div
            className="flex flex-col lg:gap-8 md:gap-6 gap-4 max-w-[600px] md:items-start items-center md:pb-0 pb-4"
            variants={contentVariants}
          >
            <motion.span
              className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold md:text-start text-center"
              variants={contentVariants}
            >
              Contact Us
            </motion.span>
            <motion.span
              className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center"
              variants={contentVariants}
            >
              Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis.
            </motion.span>
            <motion.button
              className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
              variants={buttonVariants}
              whileHover="hover"
              initial="initial"
            >
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">ook</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
              <span className="md:text-lg sm:text-base">ow</span>
            </motion.button>
          </motion.div>
          <motion.div variants={imageVariants}>
            <Image
              className="team-responsive"
              id="pricing"
              src="/img/contactus.png"
              alt="pricing"
              width={620}
              height={410}
            />
          </motion.div>
        </div>
        <Contacts />
        <motion.div variants={contentVariants}>
          <FAQ />
        </motion.div>
      </div>
      <div className="bg-white shadow-[0px_0px_25px_0px_rgba(0,0,0,0.1)] w-full lg:mb-20 md:mb-16 mb-12 mt-2 flex flex-col justify-center items-center lg:py-8 md:py-6 py-4">
        <div className="flex flex-col gap-4 items-center md:px-0 px-4">
          <span className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font font-semibold">
            Get In Touch
          </span>
          <span className="text-black md:text-base text-sm Poppins-font text-center">
            If you prefer, you can also reach us through the following channels
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <span className="text-[#46A7B0] Poppins-font text-left md:text-base text-xs">
                Email:
              </span>
              <span className="text-black Poppins-font md:text-base text-xs ml-1">
                support@yuhuwellness.com
              </span>
            </div>
            <div className="flex flex-row">
              <span className="text-[#46A7B0] Poppins-font text-left md:text-base text-xs">
                Phone:
              </span>
              <span className="text-black Poppins-font md:text-base text-xs ml-1">
                +1 (565) 123-4567
              </span>
            </div>
            <div className="flex flex-row">
              <span className="text-[#46A7B0] Poppins-font text-left md:text-base text-xs">
                Address:
              </span>
              <span className="text-black Poppins-font md:text-base text-xs ml-1">
                Yuhu Wellness
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
