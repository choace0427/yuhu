"use client";

import ExperienceRelaxionSection from "../components/home/ExperienceRelaxionSection";
import EventSection from "../components/events/Event";

export default function PricingPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <ExperienceRelaxionSection />
        <EventSection />
      </div>
    </>
  );
}
