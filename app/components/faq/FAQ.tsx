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
        {/* <div className="lg:w-9/12 w-full px-10 flex">
          <ul className="divide-y divide-[#46A7B0] w-full">
            <li>
              <details className="group" open>
                <summary className="flex items-center justify-between gap-3 md:py-3 py-2 font-medium marker:content-none hover:cursor-pointer">
                  <span className="text-black Poppins-font md:text-base text-sm group-open:text-[#46A7B0]">
                    How do I book a massage?
                  </span>
                  <svg
                    className="text-gray-400 transition-all rotate-90 group-open:-rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </summary>
                <article className="md:pb-4 pb-2">
                  <p className="text-black Poppins-font md:text-base text-sm">
                    You can book a massage online by filling out our booking
                    form or contacting us directly. We recommend booking in
                    advance, but same-day appointments might be possible
                    depending on therapist availability.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 md:py-3 py-2 font-medium marker:content-none hover:cursor-pointer">
                  <span className="text-black Poppins-font md:text-base text-sm group-open:text-[#46A7B0]">
                     Where can I receive a mobile massage?
                  </span>
                  <svg
                    className="text-gray-400 transition-all rotate-90 group-open:-rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </summary>
                <article className="md:pb-4 pb-2">
                  <p className="text-black Poppins-font md:text-base text-sm">
                    You can book a massage online by filling out our booking
                    form or contacting us directly. We recommend booking in
                    advance, but same-day appointments might be possible
                    depending on therapist availability.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 md:py-3 py-2 font-medium marker:content-none hover:cursor-pointer">
                  <span className="text-black Poppins-font md:text-base text-sm group-open:text-[#46A7B0]">
                    What do I need to prepare?
                  </span>
                  <svg
                    className="text-gray-400 transition-all rotate-90 group-open:-rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </summary>
                <article className="md:pb-4 pb-2">
                  <p className="text-black Poppins-font md:text-base text-sm">
                    You can book a massage online by filling out our booking
                    form or contacting us directly. We recommend booking in
                    advance, but same-day appointments might be possible
                    depending on therapist availability.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 md:py-3 py-2 font-medium marker:content-none hover:cursor-pointer">
                  <span className="text-black Poppins-font md:text-base text-sm group-open:text-[#46A7B0]">
                     Do you provide the necessary equipment?
                  </span>
                  <svg
                    className="text-gray-400 transition-all rotate-90 group-open:-rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </summary>
                <article className="md:pb-4 pb-2">
                  <p className="text-black Poppins-font md:text-base text-sm">
                    You can book a massage online by filling out our booking
                    form or contacting us directly. We recommend booking in
                    advance, but same-day appointments might be possible
                    depending on therapist availability.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 md:py-3 py-2 font-medium marker:content-none hover:cursor-pointer">
                  <span className="text-black Poppins-font md:text-base text-sm group-open:text-[#46A7B0]">
                    What if I live in an apartment without an elevator?
                  </span>
                  <svg
                    className="text-gray-400 transition-all rotate-90 group-open:-rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </summary>
                <article className="md:pb-4 pb-2">
                  <p className="text-black Poppins-font md:text-base text-sm">
                    You can book a massage online by filling out our booking
                    form or contacting us directly. We recommend booking in
                    advance, but same-day appointments might be possible
                    depending on therapist availability.
                  </p>
                </article>
              </details>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
