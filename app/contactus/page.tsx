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
      <div className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full justify-center px-4 m-8">
        <Contacts />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
