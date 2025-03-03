"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Animator,
  batch,
  MoveIn,
  ScrollContainer,
  ScrollPage,
} from "react-scroll-motion";
import { useAuthStore } from "../../_store/authStore";

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

  return (
    <ScrollContainer className="w-full">
      <ScrollPage>
        <div className="flex justify-center items-center h-full w-full lg:pt-12 md:pt-10 pt-8 lg:pb-12 md:pb-10 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex md:flex-row flex-col justify-between w-full gap-20 max-w-7xl items-center px-4"
          >
            <Animator animation={batch(MoveIn(-600, 0))}>
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
            </Animator>
            <Animator animation={batch(MoveIn(600, 0))}>
              <motion.div
                variants={containerVariants}
                className="flex flex-col md:gap-4 gap-2 max-w-[600px] md:items-start items-center md:pb-0 pb-4"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-black lg:text-3xl md:text-2xl text-xl font-bold Poppins-font md:text-start text-center"
                >
                  How it works?
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-black Poppins-font text-base"
                >
                  1. Choose your wellness service. Select from a variety of
                  massage and beauty treatments.
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-black Poppins-font text-base"
                >
                  2. Set your location and preferred time. Whether it&apos;s
                  your home, villa, or hotel.
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-black Poppins-font text-base"
                >
                  3. Book instantly-enjoy same-day availability or schedule in
                  advance.
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-black Poppins-font text-base"
                >
                  Yuhu Wellness and Massage makes it simple to access luxury
                  wellness services at affordable prices. Experience the
                  convenience of on-demand mobile wellness services, whether you
                  are in Mallorca Ibiza, or another Spanish city, our team is
                  ready to deliver relaxation and rejuvenation.
                </motion.span>
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
                  <span className="text-[#46A7B0] md:text-lg sm:text-base">
                    T
                  </span>
                  <span className="md:text-lg sm:text-base">ry</span>&nbsp;
                  <span className="text-[#46A7B0] md:text-lg sm:text-base">
                    N
                  </span>
                  <span className="md:text-lg sm:text-base">ow</span>
                </motion.button>
              </motion.div>
            </Animator>
          </motion.div>
        </div>
      </ScrollPage>
    </ScrollContainer>
  );
}
