"use client";

import { motion } from "framer-motion";
import { Image } from "@mantine/core";
import TeamSection from "../components/home/TeamSection";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

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
    <motion.div
      className="flex flex-col lg:gap-16 md:gap-12 sm:gap-8 gap-4 max-w-7xl w-full px-4 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About Us Section */}
      <motion.div
        className="w-full flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between lg:pt-10 md:pt-8 pt-6"
        variants={sectionVariants}
      >
        <motion.div
          className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center"
          variants={textVariants}
        >
          <motion.span
            className="lg:text-5xl md:text-4xl text-3xl text-[#46A7B0] Poppins-font font-semibold"
            variants={textVariants}
          >
            About Us
          </motion.span>
          <motion.span
            className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center"
            variants={textVariants}
          >
            At Yuhu Wellness, we believe in bringing wellness and fitness
            directly to you. As a leading provider of mobile massage and
            personal training services, we deliver tailored experiences across
            Mallorca, Ibiza, the Balearic Islands, Rome, Milan, and Italy. With
            a team of certified professionals, we ensure personalized care in
            the comfort of your home, office, or event.
          </motion.span>
        </motion.div>
        <motion.div variants={imageVariants}>
          <Image
            className="about-responsive w-full md:max-w-[550px] h-auto object-cover rounded-lg"
            id="aboutus"
            src="/img/aboutus1.png"
            alt="aboutus"
            width={550}
            height={460}
          />
        </motion.div>
      </motion.div>

      {/* Our Mission Section */}
      <motion.div
        className="w-full flex md:gap-0 gap-2 md:flex-row flex-col items-center justify-between"
        variants={sectionVariants}
      >
        <motion.div variants={imageVariants}>
          <Image
            className="about-responsive w-full md:max-w-[450px] h-auto object-cover rounded-lg"
            id="aboutus"
            src="/img/aboutus2.png"
            alt="aboutus"
            width={450}
            height={350}
          />
        </motion.div>
        <motion.div
          className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center"
          variants={textVariants}
        >
          <motion.span
            className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font font-semibold"
            variants={textVariants}
          >
            Our Mission
          </motion.span>
          <motion.span
            className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center"
            variants={textVariants}
          >
            Our mission is to make wellness accessible, convenient, and
            personalized. By combining expert care, flexibility, and on-demand
            services, we empower individuals to prioritize their health and
            well-being. Whether you seek relaxation, recovery, or fitness
            improvement, Yuhu Wellness is here to help.
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Our Vision Section */}
      <motion.div
        className="w-full flex md:flex-row md:gap-0 gap-2 flex-col items-center justify-between"
        variants={sectionVariants}
      >
        <motion.div
          className="flex flex-col lg:gap-4 md:gap-2 gap-1 max-w-[600px] md:items-start items-center"
          variants={textVariants}
        >
          <motion.span
            className="lg:text-3xl md:text-2xl text-xl text-[#46A7B0] Poppins-font font-semibold"
            variants={textVariants}
          >
            Our Vision
          </motion.span>
          <motion.span
            className="lg:text-xl md:text-lg sm:text-base text-sm text-black Poppins-font md:text-start text-center"
            variants={textVariants}
          >
            We envision a world where wellness is a lifestyle, not a luxury. At
            Yuhu Wellness, we strive to revolutionize the way people approach
            self-care by creating seamless, accessible, and stress-free
            experiences across Spain and Italy.
          </motion.span>
        </motion.div>
        <motion.div variants={imageVariants}>
          <Image
            className="about-responsive w-full md:max-w-[450px] h-auto object-cover rounded-lg"
            id="aboutus"
            src="/img/aboutus3.png"
            alt="aboutus"
            width={450}
            height={350}
          />
        </motion.div>
      </motion.div>

      {/* What We Do Section */}
      <motion.div
        className="w-full flex flex-col lg:gap-10 md:gap-8 sm:gap-6 gap-4 items-center justify-center"
        variants={sectionVariants}
      >
        <motion.span
          className="text-[#46A7B0] lg:text-5xl md:text-4xl text-3xl font-bold Poppins-font"
          variants={textVariants}
        >
          What We Do?
        </motion.span>
        <motion.div
          className="grid md:grid-cols-3 grid-cols-1 gap-8 w-full"
          variants={containerVariants}
        >
          {/* Service Cards */}
          <motion.div
            className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-start p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            whileHover="hover"
          >
            <Image
              id="facial-massage"
              src="/img/facial-massage.png"
              alt="massage"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              We offer
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Massages: therapeutic, relaxing, and sports.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Beauty treatments (Facials, Manicure, pedicure, etc)
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Personal training programs customized to your goals.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:gap-4 md:gap-3 gap-2 items-center justify-start p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            whileHover="hover"
          >
            <Image
              id="personal-training"
              src="/img/personal-training.png"
              alt="personal-training"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              How It Works
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Simply select what you need, your favorite therapist (upon
                availability) along with the time and place.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Make your payment and We will deliver the service directly to
                you.
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col mb-10 lg:gap-4 md:gap-3 gap-2 items-center justify-start p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            variants={cardVariants}
            whileHover="hover"
          >
            <Image
              id="beauty-treatment"
              src="/img/facial-massage.png"
              alt="beauty-treatment"
              w={30}
              h={30}
            />
            <span className="md:text-base text-sm font-bold text-black Poppins-font">
              Who and Where We Serve
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                We cater to:
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Private clients, Corporate events, Retreats and more.
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Locations include: Mallorca, Ibiza, Spain Rome, Milan, and
                across Italy
              </span>
              <span className="text-black md:text-sm text-xs Poppins-font text-center">
                Wherever you are, we bring wellness to you.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
