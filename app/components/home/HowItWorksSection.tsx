"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HowItWorksSectionProps {
  isAuthenticated: boolean;
}

export default function HowItWorksSection() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
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
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="flex w-full justify-center item-center lg:pt-10 md:pt-8 pt-6 lg:pb-10 md:pb-8 pb-6 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex md:flex-row flex-col gap-4 justify-between w-full max-w-7xl items-center"
      >
        <motion.div
          variants={imageVariants}
          className="border rounded-2xl overflow-hidden"
        >
          <Image
            className="blog-responsive"
            id="blog-2"
            src="/img/blog-2.png"
            alt="dashboard"
            width={556}
            height={480}
          />
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="flex flex-col lg:gap-8 md:gap-6 gap-4 max-w-[650px] md:items-start items-center"
        >
          <motion.span
            variants={itemVariants}
            className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font"
          >
            How it works?
          </motion.span>
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2"
          >
            <motion.span
              custom={0}
              variants={stepVariants}
              className="text-black md:text-base text-sm Poppins-font"
            >
              1. Choose your wellness service. Select from a variety of massage
              and beauty treatments.
            </motion.span>
            <motion.span
              custom={1}
              variants={stepVariants}
              className="text-black md:text-base text-sm Poppins-font"
            >
              2. Set your location and preferred time. Whether it&apos;s your
              home, villa, or hotel.
            </motion.span>
            <motion.span
              custom={2}
              variants={stepVariants}
              className="text-black md:text-base text-sm Poppins-font"
            >
              3. Book instantly-enjoy same-day availability or schedule in
              advance.
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="text-black md:text-base text-sm Poppins-font"
            >
              Yuhu Wellness and Massage makes it simple to access luxury
              wellness services at affordable prices. Experience the convenience
              of on-demand mobile wellness services, whether you are in Mallorca
              Ibiza, or another Spanish city, our team is ready to deliver
              relaxation and rejuvenation.
            </motion.span>
          </motion.div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black"
            onClick={() => {
              if (isAuthenticated) {
                router.push("/customer");
              } else {
                router.push("/role");
              }
            }}
          >
            <span className="text-[#46A7B0] md:text-lg sm:text-base">T</span>
            <span className="md:text-lg sm:text-base">ry</span>&nbsp;
            <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
            <span className="md:text-lg sm:text-base">ow</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
