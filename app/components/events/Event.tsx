"use client";

import {
  Animator,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  batch,
} from "react-scroll-motion";
import { motion } from "framer-motion";
import { Image } from "@mantine/core";

export default function EventSection() {
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

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      <motion.div
        className="flex flex-col items-center lg:gap-6 md:gap-4 gap-3 text-center py-10"
        variants={headerVariants}
      >
        <motion.h2
          className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font"
          variants={headerVariants}
        >
          Mobile Wellness Events
        </motion.h2>
        <motion.p
          className="text-black md:text-lg text-base Poppins-font"
          variants={headerVariants}
        >
          Tailored Wellness Experiences in Mallorca, Ibiza and across Spain
        </motion.p>
        <motion.p
          className="text-black md:text-base text-sm Poppins-font max-w-3xl"
          variants={headerVariants}
        >
          We specialize in creating unique wellness events that bring relaxation
          and rejuvenation directly to you. Whether you&apos;re organizing a
          corporate wellness retreat, private event, or group wellness in
          Mallorca, Ibiza or across Spain to suit your needs. Our expert
          therapists are licensed, insured, and thoroughly vetted to ensure the
          highest standards of care and professionalism.
        </motion.p>
      </motion.div>
      <ScrollContainer>
        <ScrollPage>
          <motion.div
            className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 w-full"
            variants={cardContainerVariants}
          >
            <Animator animation={batch(MoveIn(0, 165), MoveOut(0, -500))}>
              <motion.div
                className="flex flex-col rounded-xl shadow-lg border p-6 gap-4"
                variants={cardVariants}
                whileHover="hover"
              >
                {[
                  {
                    title: "Sports Events",
                    description:
                      "Yuhu offers stress-free sports event support in Mallorca, Ibiza, and Spain. Our mobile wellness services, including massages and personal training, ensure athletes recover and perform at their best.",
                    image: "/img/event1.png",
                    reverse: false,
                  },
                  {
                    title: "Weddings",
                    description:
                      "Make your wedding in Mallorca, Ibiza, or Spain unforgettable with Yuhu's mobile wellness services. From pre-wedding pampering to post-event recovery, we ensure relaxation for you and your guests.",
                    image: "/img/event2.png",
                    reverse: true,
                  },
                  {
                    title: "Charity Events",
                    description:
                      "Enhance your charity event in Mallorca, Ibiza, or Spain with Yuhu Wellness. We provide stress-relief treatments for organizers, participants, and volunteers, creating a calm and focused atmosphere.",
                    image: "/img/event3.png",
                    reverse: false,
                  },
                  {
                    title: "Retreats",
                    description:
                      "Yuhu delivers tailored wellness experiences for retreats in Mallorca, Ibiza, and Spain. From massages to relaxation therapies, we help create unforgettable, restorative getaways.",
                    image: "/img/event4.png",
                    reverse: true,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                      item.reverse ? "flex-row-reverse" : ""
                    }`}
                    variants={cardVariants}
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                        {item.title}
                      </h3>
                      <p className="text-black text-sm">{item.description}</p>
                    </div>
                    <Image
                      className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={120}
                      height={120}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </Animator>

            <Animator
              animation={batch(MoveOut(0, 100))}
              className="h-fit my-auto"
            >
              <motion.div
                className="flex flex-col rounded-xl shadow-lg border p-6 gap-4 "
                variants={cardVariants}
                whileHover="hover"
              >
                {[
                  {
                    title: "Employee Wellness",
                    description:
                      "Yuhu Wellness brings mobile wellness services to Mallorca, Ibiza, and Spain, reducing workplace stress and boosting productivity with stress-relieving massages and fitness sessions.",
                    image: "/img/event5.png",
                    reverse: false,
                  },
                  {
                    title: "Incentives",
                    description:
                      "Reward your team with Yuhu Wellness' mobile massages and treatments in Mallorca, Ibiza, and Spain, motivating them with a rejuvenating and memorable experience.",
                    image: "/img/event6.png",
                    reverse: true,
                  },
                  {
                    title: "Client Hospitality",
                    description:
                      "Impress clients with Yuhu Wellness' luxurious massages and treatments across Mallorca, Ibiza, and Spain, creating relaxing and memorable hospitality experiences.",
                    image: "/img/event7.png",
                    reverse: false,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                      item.reverse ? "flex-row-reverse" : ""
                    }`}
                    variants={cardVariants}
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                        {item.title}
                      </h3>
                      <p className="text-black text-sm">{item.description}</p>
                    </div>
                    <Image
                      className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={120}
                      height={120}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </Animator>

            <Animator animation={batch(MoveIn(0, 165), MoveOut(0, -500))}>
              <motion.div
                className="flex flex-col rounded-xl shadow-lg border p-6 gap-4"
                variants={cardVariants}
                whileHover="hover"
              >
                {[
                  {
                    title: "Massage Gun",
                    description:
                      "Relax and relieve muscle tension. Perfect for post-workout recovery or daily muscle relief, it delivers powerful, soothing vibrations to target tight spots and promote relaxation.",
                    image: "/img/event8.png",
                    reverse: false,
                  },
                  {
                    title: "Oils",
                    description:
                      "Our oils are designed to nourish and hydrate your skin while providing a calming, soothing experience. Ideal for massages or daily self-care routines, they leave you feeling relaxed and rejuvenated.",
                    image: "/img/event9.png",
                    reverse: true,
                  },
                  {
                    title: "Super Patch",
                    description:
                      "Is a powerful, easy-to-use solution for quick muscle recovery. Simply apply to sore or tight areas to experience targeted relief, helping you get back to your routine faster and with less discomfort.",
                    image: "/img/event10.png",
                    reverse: false,
                  },
                  {
                    title: "Massage Candles",
                    description:
                      "Once melted, the wax transforms into a warm, luxurious massage oil that deeply moisturizes the skin while soothing your body and mind with a calming fragrance.",
                    image: "/img/event11.png",
                    reverse: true,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-row justify-between items-center border rounded-xl p-4 shadow-md gap-4 ${
                      item.reverse ? "flex-row-reverse" : ""
                    }`}
                    variants={cardVariants}
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="text-black font-bold md:text-lg text-base Poppins-font">
                        {item.title}
                      </h3>
                      <p className="text-black text-sm">{item.description}</p>
                    </div>
                    <Image
                      className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={120}
                      height={120}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </Animator>
          </motion.div>
        </ScrollPage>
      </ScrollContainer>
    </>
  );
}
