"use client";

import { motion } from "framer-motion";
import { Image } from "@mantine/core";
import Services from "../components/services/Services";
import Massage from "../components/massage/Massage";
import Training from "../components/training/Training";
import PersonalTraining from "../components/training/PersonalTraining";
import Gift from "../components/gift/Gift";

export default function ServicesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const headerVariants = {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col lg:gap-16 md:gap-12 gap-8 max-w-7xl sm:px-0 px-2 w-full mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="w-full flex sm:flex-row flex-col sm:gap-0 gap-2 items-center justify-between lg:pt-10 md:pt-8 pt-6">
        <motion.div
          className="flex flex-col lg:gap-4 md:gap-3 gap-2 max-w-[600px] sm:items-start items-center px-4"
          variants={headerVariants}
        >
          <motion.span
            className="lg:text-5xl md:text-4xl text-3xl md:px-0 px-4 text-[#46A7B0] Poppins-font font-semibold"
            variants={headerVariants}
          >
            Our Services
          </motion.span>
          <motion.span
            className="md:text-xl text-sm text-black Poppins-font sm:text-start text-center"
            variants={headerVariants}
          >
            Yuhu Wellness brings massages, fitness and beauty treatments to you.
            We offer mobile massage and personal training services tailored to
            your needs, available across Mallorca, Ibiza, Spain Rome, Milan, and
            throughout Italy. Save time and enjoy professional wellness
            experiences wherever you are, delivered by certified experts.
          </motion.span>
          <motion.button
            className="md:text-base text-sm font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
            variants={buttonVariants}
            whileHover="hover"
            initial="initial"
          >
            <span className="text-[#46A7B0] text-lg">B</span>
            <span className="text-lg">ook</span>&nbsp;
            <span className="text-[#46A7B0] text-lg">N</span>
            <span className="text-lg">ow</span>
          </motion.button>
        </motion.div>
        <motion.div variants={imageVariants}>
          <Image
            className="service-responsive"
            id="service"
            src="/img/service.png"
            alt="aboutus"
            width={550}
            height={460}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex w-full items-center justify-center"
        variants={sectionVariants}
      >
        <motion.div
          className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-8 md:gap-6 gap-4"
          variants={containerVariants}
        >
          <motion.span
            className="text-[#46A7B0] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold Poppins-font text-center"
            variants={headerVariants}
          >
            Our Main Services
          </motion.span>
          <motion.div
            className="flex sm:flex-row flex-col justify-between items-center w-full lg:gap-12 md:gap-10 gap-8"
            variants={containerVariants}
          >
            <Services
              src="/img/massage.png"
              title="Massage"
              body="Relax with Yuhu Mobile Wellness, offering professional massages in Mallorca, Ibiza, Spain, and soon across Italy. Choose from deep tissue, sports, or relaxing massages—all delivered to your home or workplace. Feel stress-free and rejuvenated."
            />
            <Services
              src="/img/training.png"
              title="Personal Training"
              body="Achieve your fitness goals with Yuhu Mobile Wellness. Our certified trainers offer tailored workouts at home, in Mallorca, Ibiza, Spain, and soon across Italy. Convenient sessions fit your schedule for weight loss, muscle gain, or overall fitness."
            />
            <Services
              src="/img/treatment.png"
              title="Beauty Treatment"
              body="Enjoy luxury beauty treatments with Yuhu Mobile Wellness in Mallorca, Ibiza, Spain, and soon across Italy. From facials to manicures, our mobile service brings expert care to your home. Look and feel your best effortlessly."
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4"
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
          variants={headerVariants}
        >
          Massage Categories
        </motion.span>
        <Massage />
      </motion.div>

      <motion.div
        className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4"
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
          variants={headerVariants}
        >
          Personal Training Categories
        </motion.span>
        <Training />
      </motion.div>

      <motion.div
        className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 md:px-0 px-4"
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
          variants={headerVariants}
        >
          Beauty Treatment Categories
        </motion.span>
        <PersonalTraining />
      </motion.div>

      <motion.div
        className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 pb-28 md:px-0 px-4"
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
          variants={headerVariants}
        >
          Gift Cards
        </motion.span>
        <Gift />
      </motion.div>
    </motion.div>
  );
}
