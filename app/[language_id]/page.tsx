"use client";

import { useRouter } from "next/navigation";

import { motion, useScroll, useSpring } from "framer-motion";
import WhyChooseSection from "./components/home/WhyChooseSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import LocalServiceSection from "./components/home/LocalServiceSection";

export default function Home() {
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-[0%]"
        style={{ scaleX }}
      />
      <main className="flex h-full w-full flex-col items-center justify-between">
        <LocalServiceSection />
        <WhyChooseSection />
        <HowItWorksSection />
      </main>
    </>
  );
}
