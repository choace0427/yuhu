"use client";

import { motion } from "framer-motion";

export default function LocalServiceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const countryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cityVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-[#46A7B0] py-14 w-full flex justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-row w-full justify-between max-w-7xl"
      >
        <motion.div
          variants={containerVariants}
          className="flex flex-col gap-4 items-center w-[500px]"
        >
          <motion.span
            variants={titleVariants}
            className="Poppins-font text-white text-3xl font-bold"
          >
            Find your local massage service:
          </motion.span>
          <div className="flex flex-row justify-between w-full px-20">
            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-1 items-center"
            >
              <motion.span
                variants={countryVariants}
                className="text-2xl text-gray-200 Poppins-font"
              >
                Italy
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Roma
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Milano
              </motion.span>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-1 items-center"
            >
              <motion.span
                variants={countryVariants}
                className="text-2xl text-gray-200 Poppins-font"
              >
                Spain
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Mallorca
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Ibiza
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Madrid
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Malaga
              </motion.span>
              <motion.span
                variants={cityVariants}
                className="text-base text-white Poppins-font"
              >
                Barcelona
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
        <motion.video
          variants={videoVariants}
          className="w-[500px] rounded-3xl"
          src="https://myyuhubucket.s3.us-east-2.amazonaws.com/video-output-A46683D6-84E3-4524-8FB5-E6C7BF446550.mov"
          controls
          autoPlay
          loop
        />
      </motion.div>
    </div>
  );
}
