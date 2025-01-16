"use client";

import { Image, Loader } from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import Service from "../components/service/Service";
import { useRouter } from "next/navigation";

export default function CustomerPage() {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const handleBooking = (service: string) => {
    router.push(`/therapist/list?service=${service}`);
  };

  return (
    <>
      {userInfo ? (
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col w-full max-w-7xl items-center gap-8 py-10">
            <div className="flex flex-col gap-4 items-center pt-4">
              <span className="text-[#46A7B0] Poppins-font text-4xl font-bold">
                Explore Our Services
              </span>
              <span className="Poppins-font text-lg">
                Discover professionals skilled in various massage techniques.
                Choose the best fit for your needs
              </span>
            </div>
            <div className="flex sm:flex-row flex-col justify-between items-center w-full lg:gap-12 md:gap-10 gap-8">
              <Service
                src={`/img/massage.png`}
                title={`Massage`}
                body={`Relax with Yuhu Mobile Wellness, offering professional massages in Mallorca, Ibiza, Spain, and soon across Italy. Choose from deep tissue, sports, or relaxing massages—all delivered to your home or workplace. Feel stress-free and rejuvenated.`}
              />
              <Service
                src={`/img/training.png`}
                title={`Personal Training`}
                body={`Achieve your fitness goals with Yuhu Mobile Wellness. Our certified trainers offer tailored workouts at home, in Mallorca, Ibiza, Spain, and soon across Italy. Convenient sessions fit your schedule for weight loss, muscle gain, or overall fitness.`}
              />
              <Service
                src={`/img/treatment.png`}
                title={`Beauty Treatment`}
                body={`Enjoy luxury beauty treatments with Yuhu Mobile Wellness in Mallorca, Ibiza, Spain, and soon across Italy. From facials to manicures, our mobile service brings expert care to your home. Look and feel your best effortlessly.`}
              />
            </div>
            <div className="flex flex-col gap-2 items-center w-full pt-10">
              <span className="Poppins-font text-2xl font-bold">
                Massage Therapy
              </span>
              <span className=" Poppins-font text-base">
                Relax and rejuvenate with professional massage services.
              </span>
              <div className="grid grid-cols-4 gap-4 w-full pt-8">
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/Kobido.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Kobido
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      An ancient Japanese facial massage known for its
                      anti-aging effects, Kobido focuses on improving skin
                      elasticity, reducing wrinkles, and promoting a youthful
                      appearance by stimulating facial muscles and circulation.
                    </span>
                    <button
                      onClick={() => handleBooking("Kobido")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/swedish-massage.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Swedish Massage
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      An ancient Japanese facial massage known for its
                      anti-aging effects, Kobido focuses on improving skin
                      elasticity, reducing wrinkles, and promoting a youthful
                      appearance by stimulating facial muscles and circulation.
                    </span>
                    <button
                      onClick={() => handleBooking("Swedish Massage")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/deep-tissue-massage.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Deep Tissue Massage
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      This massage technique targets the deeper layers of
                      muscles and connective tissues. It&apos;s especially
                      helpful for people with chronic pain or muscle tension.
                    </span>
                    <button
                      onClick={() => handleBooking("Deep Tissue Massage")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0]  animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/thai-massage.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Thai Massage
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Combining acupressure, Indian Ayurvedic principles, and
                      assisted yoga postures, Thai massage stretches and
                      releases tension throughout the body, enhancing
                      flexibility and energy flow
                    </span>
                    <button
                      onClick={() => handleBooking("Thai Massage")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0]  animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/aromatherapy-massage.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Aromatherapy Massage
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      An ancient Japanese facial massage known for its
                      anti-aging effects, Kobido focuses on improving skin
                      elasticity, reducing wrinkles, and promoting a youthful
                      appearance by stimulating facial muscles and circulation.
                    </span>
                    <button
                      onClick={() => handleBooking("Aromatherapy Massage")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0]  animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px] rounded-xl"
                    id="massage"
                    src="/img/hot_stone_massage.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold  Poppins-font">
                    Hot Stone Massage
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      An ancient Japanese facial massage known for its
                      anti-aging effects, Kobido focuses on improving skin
                      elasticity, reducing wrinkles, and promoting a youthful
                      appearance by stimulating facial muscles and circulation.
                    </span>
                    <button
                      onClick={() => handleBooking("Hot Stone Massage")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full pt-10">
              <span className="Poppins-font text-2xl font-bold">
                Personal Training
              </span>
              <span className="Poppins-font text-base">
                Relax and rejuvenate with professional massage services.
              </span>
              <div className="grid grid-cols-4 gap-4 w-full pt-8">
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/p-training.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Personal Training
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      One-on-one training sessions tailored to individual
                      fitness goals such as weight loss, muscle building, or
                      general health improvement. The trainer customizes
                      workouts based on the client&apos;s needs and fitness
                      level.
                    </span>
                    <button
                      onClick={() => handleBooking("Personal Training")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/partner-training.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Couples/Partner Training
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Designed for pairs (couples, friends, or family members)
                      who want to work out together. This type of training
                      builds teamwork and motivation while allowing each person
                      to pursue individual goals with shared guidance.
                    </span>
                    <button
                      onClick={() => handleBooking("Couples/Partner Training")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/yoga-training.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Yoga Training
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Focuses on improving flexibility, strength, and
                      mindfulness through various yoga styles like Hatha,
                      Vinyasa, or Power Yoga. Suitable for individuals seeking a
                      holistic approach to fitness and stress relief.
                    </span>
                    <button
                      onClick={() => handleBooking("Yoga Training")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/online-training.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Online Training
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Offers flexibility by providing personalized workout plans
                      and guidance through virtual platforms. Ideal for clients
                      who prefer remote sessions, need convenience, or cannot
                      attend in-person training regularly.
                    </span>
                    <button
                      onClick={() => handleBooking("Online Training")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center w-full pt-10">
              <span className="Poppins-font text-2xl font-bold">
                Beauty Treatment
              </span>
              <span className="Poppins-font text-base">
                Relax and rejuvenate with professional massage services.
              </span>
              <div className="grid grid-cols-4 gap-4 w-full pt-8">
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/manicure.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Manicure
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      A beauty treatment for hands and nails that includes nail
                      shaping, cuticle care, and often polish or nail art for
                      aesthetic enhancement.
                    </span>
                    <button
                      onClick={() => handleBooking("Manicure")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/pedicure.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Pedicure
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      A foot care treatment that includes nail trimming,
                      exfoliation, and massage, leaving feet looking groomed and
                      feeling refreshed.
                    </span>
                    <button
                      onClick={() => handleBooking("Pedicure")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/facial-treatments.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Facial Treatments
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Skincare treatments designed to cleanse, exfoliate, and
                      nourish the skin, improving the complexion and addressing
                      specific skin concerns
                    </span>
                    <button
                      onClick={() => handleBooking("Facial Treatments")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px] rounded-lg"
                    id="massage"
                    src="/img/aculifting.jpeg"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Aculifting
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Aculifting also known as the Hollywood Lifting is a
                      natural anti-aging treatment using fine needles on the
                      face and body acupoints to rejuvenate the skin and provide
                      aesthetic and wellness benefits.
                    </span>
                    <button
                      onClick={() => handleBooking("Aculifting")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px] rounded-lg"
                    id="massage"
                    src="/img/acupuncture.jpg"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Acupuncture
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      Acupuncture involves inserting thin needles into specific
                      points on the body to treat pain, promote wellness, and
                      manage stress. It stimulates nerves, muscles, and
                      connective tissue, potentially enhancing the body&apos;s
                      natural functions.
                    </span>
                    <button
                      onClick={() => handleBooking("Acupuncture")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center lg:gap-4 md:gap-3 gap-2 w-[280px] h-[400px] border lg:p-4 md:p-3 p-2 rounded-lg ">
                  <Image
                    className="massage-responsive w-[230px] h-[150px]"
                    id="massage"
                    src="/img/botox.png"
                    alt="dashboard"
                    width={230}
                    height={150}
                  />
                  <span className="md:text-base text-sm font-semibold Poppins-font">
                    Botox
                  </span>
                  <div className="flex flex-col justify-between h-full items-center">
                    <span className="md:text-sm text-xs Poppins-font text-justify">
                      A non-surgical cosmetic procedure involving injections of
                      botulinum toxin to relax facial muscles, reducing fine
                      lines and wrinkles.
                    </span>
                    <button
                      onClick={() => handleBooking("Botox")}
                      className="w-24 font-bold Poppins-font border-b-2 border-[#46A7B0] animate-pulse"
                    >
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        B
                      </span>
                      <span className="md:text-lg sm:text-base">ook</span>&nbsp;
                      <span className="text-[#46A7B0] md:text-lg sm:text-base">
                        N
                      </span>
                      <span className="md:text-lg sm:text-base">ow</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
          <Loader />
        </div>
      )}
    </>
  );
}
