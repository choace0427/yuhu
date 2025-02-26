"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./_store/authStore";
import Link from "next/link";
import TeamMember from "./components/team/TeamMembers";
import Event from "./components/events/Event";
import Contacts from "./components/contacts/Contacts";

import { motion, useScroll, useSpring } from "framer-motion";
import LocalServiceSection from "./components/home/LocalServiceSection";
import ExperienceRelaxionSection from "./components/home/ExperienceRelaxionSection";
import WhyChooseSection from "./components/home/WhyChooseSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import TeamSection from "./components/home/TeamSection";
import EventsSection from "./components/events/Event";
import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function Home() {
  const { isAuthenticated } = useAuthStore();
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
        {/* <ExperienceRelaxionSection /> */}
        <WhyChooseSection />
        <HowItWorksSection />
        {/* <TeamSection /> */}
        {/* <EventsSection /> */}
        {/* <Contacts /> */}
      </main>
    </>
  );
}
