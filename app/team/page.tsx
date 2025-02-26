"use client";

import { Image } from "@mantine/core";
import { motion } from "framer-motion";

const TeamSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
    <motion.div
      className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full px-4 mx-auto my-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full flex md:flex-row flex-col md:gap-10 gap-2 items-center justify-between">
        <motion.div
          className="flex flex-col gap-4 max-w-[600px] md:items-start items-center"
          variants={itemVariants}
        >
          <motion.span
            className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold"
            variants={itemVariants}
          >
            Meet the Team
          </motion.span>
          <motion.span
            className="lg:text-lg md:text-base text-sm text-black Poppins-font md:text-start text-center"
            variants={itemVariants}
          >
            All of our professional massage therapists are fully licensed,
            insured, and rigorously vetted through our industry-leading security
            protocols. When you book a Yuhu Wellness service, be it a relaxing
            massage, a sports massage, a personal training or our beauty
            treatment sessions, you will receive a confirmation with your
            therapist&apos;s full name, professional bio, and details about
            their expertise, ensuring transparency and trust. We are committed
            to providing the highest level of comfort and security.
          </motion.span>
          <div className="flex gap-10 items-center mt-10">
            <motion.button
              className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
              variants={buttonVariants}
              whileHover="hover"
              initial="initial"
            >
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">ook</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">T</span>
              <span className="md:text-lg sm:text-base">oday</span>
            </motion.button>
            <motion.button
              className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
              variants={buttonVariants}
              whileHover="hover"
              initial="initial"
            >
              <span className="text-[#46A7B0] md:text-lg sm:text-base">A</span>
              <span className="md:text-lg sm:text-base">pply</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
              <span className="md:text-lg sm:text-base">ow</span>
            </motion.button>
          </div>
        </motion.div>
        <motion.div variants={imageVariants}>
          <Image
            className="team-responsive"
            id="team"
            src="/img/team.png"
            alt="team"
            width={550}
            height={460}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamSection;
