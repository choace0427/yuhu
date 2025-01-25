"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ExperienceRelaxionSection() {
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
    <motion.div
      className="flex flex-col lg:gap-6 md:gap-4 gap-2 max-w-7xl items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="font-bold lg:text-3xl md:text-2xl text-xl text-black Poppins-font text-center"
        variants={itemVariants}
      >
        Mobile Massage Mallorca - experience relaxation
      </motion.span>

      <motion.span
        className="font-semibold lg:text-2xl md:text-xl text-lg text-center text-black Poppins-font"
        variants={itemVariants}
      >
        Relaxation, beauty treatments and wellness near you, delivered to your
        doorstep or workplace in Mallorca, Ibiza and across Spain
      </motion.span>

      <motion.span
        className="text-base text-black Poppins-font text-center"
        variants={itemVariants}
      >
        Looking for the perfect way to unwind in the beautiful surroundings? Our
        expert mobile massage services in Mallorca, Ibiza and Spain bring
        relaxation to you-whether you&apos;re at home, a hotel, or a private
        villa. From deep tissue to soothing relaxation massages, we ensure a
        tailored experience to meet your needs. Yuhu Wellness brings
        professional massage therapists to your villa, home, hotel, yacht, or
        workplace anywhere in Mallorca, Ibiza & Spain, offering the ultimate
        convenience and luxury for your wellbeing. Whether you are on holidays
        or a resident, with Yuhu Wellness, you can enjoy expert massage and
        beauty treatments in the comfort of your own space and on your schedule.
      </motion.span>

      <motion.div
        className="flex flex-row gap-4 justify-center w-full"
        variants={itemVariants}
      >
        <Link href="/services">
          <motion.button
            className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
            variants={buttonVariants}
            whileHover="hover"
          >
            <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
            <span className="md:text-lg sm:text-base">ook</span>&nbsp;
            <span className="text-[#46A7B0] md:text-lg sm:text-base">S</span>
            <span className="md:text-lg sm:text-base">ervice</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
