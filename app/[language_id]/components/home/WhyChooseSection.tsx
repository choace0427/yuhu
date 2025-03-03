"use client";

import { Image } from "@mantine/core";
import {
  Animator,
  MoveIn,
  ScrollContainer,
  ScrollPage,
  batch,
} from "react-scroll-motion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../_store/authStore";

import { useParams } from "next/navigation";
import translations from "@/app/utils/language";
type TranslationKeys = keyof typeof translations;

export default function WhyChooseSection() {
  const { isAuthenticated } = useAuthStore();
  const params = useParams();
  const router = useRouter();

  const languageId = params.language_id as TranslationKeys;
  const currentLanguage = translations[languageId] || translations.en;

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

  return (
    <ScrollContainer className="w-full h-fit">
      <ScrollPage>
        <div className="flex justify-center items-center h-full bg-[#f5f5f5] w-full lg:pt-12 md:pt-10 pt-8 lg:pb-12 md:pb-10 pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex md:flex-row flex-col justify-between w-full gap-20 max-w-7xl items-center px-4"
          >
            <Animator animation={batch(MoveIn(-600, 0))}>
              <motion.div
                variants={containerVariants}
                className="flex flex-col md:gap-4 gap-2 max-w-[600px] md:items-start items-center md:pb-0 pb-4"
              >
                <motion.span
                  variants={itemVariants}
                  className="text-black lg:text-3xl md:text-2xl text-xl font-bold Poppins-font md:text-start text-center"
                >
                  Why Choose Yuhu Wellness?
                  {currentLanguage?.home_choose_wellness}
                </motion.span>
                <motion.span
                  variants={itemVariants}
                  className="text-black Poppins-font text-base"
                >
                  {currentLanguage?.home_choose_wellness_content_1}
                </motion.span>
                <motion.div
                  variants={containerVariants}
                  className="flex flex-col gap-2"
                >
                  <motion.span
                    variants={itemVariants}
                    className="text-black md:text-base text-sm Poppins-font"
                  >
                    • {currentLanguage?.home_choose_wellness_content_2}
                  </motion.span>
                  <motion.span
                    variants={itemVariants}
                    className="text-black md:text-base text-sm Poppins-font"
                  >
                    • {currentLanguage?.home_choose_wellness_content_3}
                  </motion.span>
                  <motion.span
                    variants={itemVariants}
                    className="text-black md:text-base text-sm Poppins-font"
                  >
                    • {currentLanguage?.home_choose_wellness_content_4}
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
                  <span className="text-[#46A7B0] md:text-lg sm:text-base">
                    B
                  </span>
                  <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                  <span className="text-[#46A7B0] md:text-lg sm:text-base">
                    N
                  </span>
                  <span className="md:text-lg sm:text-base">ow</span>
                </motion.button>
              </motion.div>
            </Animator>
            <Animator animation={batch(MoveIn(600, 0))}>
              <motion.div
                variants={imageVariants}
                className="border rounded-2xl overflow-hidden"
              >
                <Image
                  className="blog-responsive"
                  id="blog-1"
                  src="/img/blog-1.png"
                  alt="dashboard"
                  width={550}
                  height={380}
                />
              </motion.div>
            </Animator>
          </motion.div>
        </div>
      </ScrollPage>
    </ScrollContainer>
  );
}
