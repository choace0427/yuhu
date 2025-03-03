"use client";

import { Accordion } from "@mantine/core";

export default function FAQ() {
  const faqData = [
    {
      title: "How do I book a massage?",
      content:
        "You can book a massage online by filling out our booking form or contacting us directly. We recommend booking in advance, but same-day appointments might be possible depending on therapist availability.",
    },
    {
      title: "Where can I receive a mobile massage?",
      content:
        "You can book a massage online by filling out our booking form or contacting us directly. We recommend booking in advance, but same-day appointments might be possible depending on therapist availability.",
    },
    {
      title: "What do I need to prepare?",
      content:
        "You can book a massage online by filling out our booking form or contacting us directly. We recommend booking in advance, but same-day appointments might be possible depending on therapist availability.",
    },
    {
      title: "Do you provide the necessary equipment?",
      content:
        "You can book a massage online by filling out our booking form or contacting us directly. We recommend booking in advance, but same-day appointments might be possible depending on therapist availability.",
    },

    {
      title: "What if I live in an apartment without an elevator?",
      content:
        "You can book a massage online by filling out our booking form or contacting us directly. We recommend booking in advance, but same-day appointments might be possible depending on therapist availability.",
    },
  ];
  return (
    <div className="w-full flex my-8">
      <div className="w-full max-w-7xl flex flex-col md:gap-6 gap-4 items-center">
        <div className="w-full lg:text-4xl md:text-3xl text-2xl font-semibold text-center text-[#46A7B0] Poppins-font px-10">
          Frequently asked questions
        </div>
        <div className="text-center text-black md:text-lg text-base Poppins-font">
          Everything you need to know about the product and billing.
        </div>
        <Accordion
          defaultValue="Apples"
          styles={{
            item: {
              borderBottomColor: "#46A7B0",
            },
          }}
          w={800}
        >
          {faqData &&
            faqData.map((item, index) => {
              return (
                <Accordion.Item key={index} value={item.title}>
                  <Accordion.Control>{item.title}</Accordion.Control>
                  <Accordion.Panel>{item.content}</Accordion.Panel>
                </Accordion.Item>
              );
            })}
        </Accordion>
      </div>
    </div>
  );
}
