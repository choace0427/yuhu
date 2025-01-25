"use client";

import { Image } from "@mantine/core";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "../components/text/AnimatedText";

export default function Event() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sideY = useTransform(scrollYProgress, [0, 0.2], [100, -100]);
  const middleY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-[200vh]">
      {/* <motion.section
        className="flex w-full items-center justify-center lg:pt-10 md:pt-8 pt-6 lg:pb-10 md:pb-8 pb-6 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col justify-between w-full max-w-7xl items-center lg:gap-6 md:gap-4 gap-2">
          <AnimatedText
            text="Mobile Wellness Events"
            className="text-black lg:text-4xl md:text-3xl text-2xl font-bold Poppins-font text-center"
          />
          <span className="text-black md:text-base text-sm Poppins-font text-center">
            Tailored Wellness Experiences in Mallorca, Ibiza and across Spain
          </span>
          <span className="text-black md:text-base text-sm Poppins-font text-center">
            We specialize in creating unique wellness events that bring
            relaxation and rejuvenation directly to you. Whether you&apos;re
            organizing a corporate wellness retreat, private event, or group
            wellness in Mallorca, Ibiza or across Spain to suit your needs. Our
            expert therapists are licensed, insured, and thoroughly vetted to
            ensure the highest standards of care and professionalism.
          </span>
          <Event />
        </div>
      </motion.section> */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid grid-cols-3 gap-8">
          {/* Left Section */}
          <motion.div style={{ y: sideY, opacity }} className="space-y-6">
            <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-center">
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Sports Events
                  </span>
                  <span className="text-black text-xs">
                    Yuhu offers stress-free sports event support in Mallorca,
                    Ibiza, and Spain. Our mobile wellness services, including
                    massages and personal training, ensure athletes recover and
                    perform at their best.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event1.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event2.png"
                  alt="event"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Weddings
                  </span>
                  <span className="text-black text-xs">
                    Make your wedding in Mallorca, Ibiza, or Spain unforgettable
                    with Yuhu&apos;s mobile wellness services. From pre-wedding
                    pampering to post-event recovery, we ensure relaxation for
                    you and your guests.
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Charity Events
                  </span>
                  <span className="text-black text-xs">
                    Enhance your charity event in Mallorca, Ibiza, or Spain with
                    Yuhu Wellness. We provide stress-relief treatments for
                    organizers, participants, and volunteers, creating a calm
                    and focused atmosphere.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event3.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event4.png"
                  alt="event"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Retreats
                  </span>
                  <span className="text-black text-xs">
                    Yuhu delivers tailored wellness experiences for retreats in
                    Mallorca, Ibiza, and Spain. From massages to relaxation
                    therapies, we help create unforgettable, restorative
                    getaways.
                  </span>
                </div>
              </div>
              <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  I
                </span>
                <span className="md:text-lg sm:text-base">NFO</span>
              </button>
            </div>
          </motion.div>

          {/* Middle Section */}
          <motion.div
            style={{ y: middleY, opacity }}
            className="col-span-1 space-y-6"
          >
            <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-around">
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Employee Wellness
                  </span>
                  <span className="text-black text-xs">
                    Yuhu Wellness brings mobile wellness services to Mallorca,
                    Ibiza, and Spain, reducing workplace stress and boosting
                    productivity with stress-relieving massages and fitness
                    sessions.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event5.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event6.png"
                  alt="event"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Incentives
                  </span>
                  <span className="text-black text-xs">
                    Reward your team with Yuhu Wellness&apos; mobile massages
                    and treatments in Mallorca, Ibiza, and Spain, motivating
                    them with a rejuvenating and memorable experience.
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Client Hospitality
                  </span>
                  <span className="text-black text-xs">
                    Impress clients with Yuhu Wellness&apos; luxurious massages
                    and treatments across Mallorca, Ibiza, and Spain, creating
                    relaxing and memorable hospitality experiences.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event7.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  I
                </span>
                <span className="md:text-lg sm:text-base">NFO</span>
              </button>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div style={{ y: sideY, opacity }} className="space-y-6">
            <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-center">
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Massage Gun
                  </span>
                  <span className="text-black text-xs">
                    Relax and relieve muscle tension . Perfect for post-workout
                    recovery or daily muscle relief, it delivers powerful,
                    soothing vibrations to target tight spots and promote
                    relaxation.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event8.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event9.png"
                  alt="event"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Oils
                  </span>
                  <span className="text-black text-xs">
                    Our oils are designed to nourish and hydrate your skin while
                    providing a calming, soothing experience. Ideal for massages
                    or daily self-care routines, they leave you feeling relaxed
                    and rejuvenated.
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Super Patch
                  </span>
                  <span className="text-black text-xs">
                    Is a powerful, easy-to-use solution for quick muscle
                    recovery. Simply apply to sore or tight areas to experience
                    targeted relief, helping you get back to your routine faster
                    and with less discomfort.
                  </span>
                </div>
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event10.png"
                  alt="event"
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
                <Image
                  className="rounded-xl w-[120px] h-[120px]"
                  id="event"
                  src="/img/event11.png"
                  alt="event"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
                    Massage Candles
                  </span>
                  <span className="text-black text-xs">
                    Once melted, the wax transforms into a warm, luxurious
                    massage oil that deeply moisturizes the skin while soothing
                    your body and mind with a calming fragrance.
                  </span>
                </div>
              </div>
              <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
                <span className="text-[#46A7B0] md:text-lg sm:text-base">
                  I
                </span>
                <span className="md:text-lg sm:text-base">NFO</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    // <div className="w-full max-w-7xl flex flex-row justify-between gap-8">
    //   <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-center">
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Sports Events
    //         </span>
    //         <span className="text-black text-xs">
    //           Yuhu offers stress-free sports event support in Mallorca, Ibiza,
    //           and Spain. Our mobile wellness services, including massages and
    //           personal training, ensure athletes recover and perform at their
    //           best.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event1.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event2.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Weddings
    //         </span>
    //         <span className="text-black text-xs">
    //           Make your wedding in Mallorca, Ibiza, or Spain unforgettable with
    //           Yuhu&apos;s mobile wellness services. From pre-wedding pampering
    //           to post-event recovery, we ensure relaxation for you and your
    //           guests.
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Charity Events
    //         </span>
    //         <span className="text-black text-xs">
    //           Enhance your charity event in Mallorca, Ibiza, or Spain with Yuhu
    //           Wellness. We provide stress-relief treatments for organizers,
    //           participants, and volunteers, creating a calm and focused
    //           atmosphere.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event3.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event4.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Retreats
    //         </span>
    //         <span className="text-black text-xs">
    //           Yuhu delivers tailored wellness experiences for retreats in
    //           Mallorca, Ibiza, and Spain. From massages to relaxation therapies,
    //           we help create unforgettable, restorative getaways.
    //         </span>
    //       </div>
    //     </div>
    //     <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
    //       <span className="text-[#46A7B0] md:text-lg sm:text-base">I</span>
    //       <span className="md:text-lg sm:text-base">NFO</span>
    //     </button>
    //   </div>
    //   <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-around">
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Employee Wellness
    //         </span>
    //         <span className="text-black text-xs">
    //           Yuhu Wellness brings mobile wellness services to Mallorca, Ibiza,
    //           and Spain, reducing workplace stress and boosting productivity
    //           with stress-relieving massages and fitness sessions.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event5.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event6.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Incentives
    //         </span>
    //         <span className="text-black text-xs">
    //           Reward your team with Yuhu Wellness&apos; mobile massages and
    //           treatments in Mallorca, Ibiza, and Spain, motivating them with a
    //           rejuvenating and memorable experience.
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Client Hospitality
    //         </span>
    //         <span className="text-black text-xs">
    //           Impress clients with Yuhu Wellness&apos; luxurious massages and
    //           treatments across Mallorca, Ibiza, and Spain, creating relaxing
    //           and memorable hospitality experiences.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event7.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
    //       <span className="text-[#46A7B0] md:text-lg sm:text-base">I</span>
    //       <span className="md:text-lg sm:text-base">NFO</span>
    //     </button>
    //   </div>
    //   <div className="flex flex-col lg:w-[420px] md:w-[320px] w-[250px] rounded-xl shadow-2xl lg:gap-4 md:gap-3 gap-2 border p-4 items-center justify-center">
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Massage Gun
    //         </span>
    //         <span className="text-black text-xs">
    //           Relax and relieve muscle tension . Perfect for post-workout
    //           recovery or daily muscle relief, it delivers powerful, soothing
    //           vibrations to target tight spots and promote relaxation.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event8.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event9.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Oils
    //         </span>
    //         <span className="text-black text-xs">
    //           Our oils are designed to nourish and hydrate your skin while
    //           providing a calming, soothing experience. Ideal for massages or
    //           daily self-care routines, they leave you feeling relaxed and
    //           rejuvenated.
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Super Patch
    //         </span>
    //         <span className="text-black text-xs">
    //           Is a powerful, easy-to-use solution for quick muscle recovery.
    //           Simply apply to sore or tight areas to experience targeted relief,
    //           helping you get back to your routine faster and with less
    //           discomfort.
    //         </span>
    //       </div>
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event10.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //     </div>
    //     <div className="flex flex-row justify-between border rounded-xl p-2 shadow-lg w-full gap-4">
    //       <Image
    //         className="rounded-xl w-[120px] h-[120px]"
    //         id="event"
    //         src="/img/event11.png"
    //         alt="event"
    //         width={120}
    //         height={120}
    //       />
    //       <div className="flex flex-col gap-1">
    //         <span className="text-black font-bold md:text-lg text-base Poppins-font md:text-start text-center">
    //           Massage Candles
    //         </span>
    //         <span className="text-black text-xs">
    //           Once melted, the wax transforms into a warm, luxurious massage oil
    //           that deeply moisturizes the skin while soothing your body and mind
    //           with a calming fragrance.
    //         </span>
    //       </div>
    //     </div>
    //     <button className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse">
    //       <span className="text-[#46A7B0] md:text-lg sm:text-base">I</span>
    //       <span className="md:text-lg sm:text-base">NFO</span>
    //     </button>
    //   </div>
    // </div>
  );
}
