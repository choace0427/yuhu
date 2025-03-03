"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../_store/authStore";

export default function TeamSection() {
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

  const textVariants = {
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

  const imageRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="flex w-full bg-[#f5f5f5] items-center justify-center py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-8 md:gap-6 gap-4"
      >
        <motion.span
          variants={titleVariants}
          className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font text-center"
        >
          Our Team
        </motion.span>
        <div className="flex md:flex-row flex-col md:gap-0 gap-4 w-full justify-between items-center">
          <motion.div
            variants={containerVariants}
            className="flex flex-col lg:gap-4 md:gap-3 gap-2 max-w-[500px] md:items-start items-center"
          >
            <motion.span
              variants={textVariants}
              className="text-black font-bold lg:text-2xl md:text-xl text-lg Poppins-font md:text-start text-center"
            >
              Meet Our Exceptional Team Members
            </motion.span>
            <motion.span
              variants={textVariants}
              className="text-black md:text-base text-sm Poppins-font md:text-start text-center"
            >
              All professionals in our network are fully licensed, insured, and
              rigorously vetted through our industry-leading security protocols.
              When you book a Yuhu Wellness service either a relaxing
              massage,sports massage, personal training or beauty treatment
              session, you&apos;ll receive a confirmation with the
              therapist&apos;s full name, professional bio, and details about
              their expertise, ensuring transparency and trust. We are committed
              to providing the highest level of comfort and security.
            </motion.span>
            <motion.button
              variants={textVariants}
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
              <span className="text-[#46A7B0] md:text-lg sm:text-base">B</span>
              <span className="md:text-lg sm:text-base">ook</span>&nbsp;
              <span className="text-[#46A7B0] md:text-lg sm:text-base">N</span>
              <span className="md:text-lg sm:text-base">ow</span>
            </motion.button>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <motion.div
              variants={imageRowVariants}
              className="flex flex-row gap-2"
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div key={i} variants={imageVariants}>
                  <Image
                    className="ellipse-responsive"
                    id={`ellipse-${i}`}
                    src={`/img/ellipse${i}.png`}
                    alt="team member"
                    width={120}
                    height={120}
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={imageRowVariants}
              className="flex flex-row gap-2"
            >
              {[5, 6, 7].map((i) => (
                <motion.div key={i} variants={imageVariants}>
                  <Image
                    className="ellipse-responsive"
                    id={`ellipse-${i}`}
                    src={`/img/ellipse${i}.png`}
                    alt="team member"
                    width={120}
                    height={120}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
