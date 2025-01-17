"use client";

import { supabase } from "@/supabase";
import { Carousel } from "@mantine/carousel";
import {
  Image,
  Loader,
  Rating,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCircleCheck, IconCircleX, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TherapistDetailPage(params: any) {
  const { colorScheme } = useMantineColorScheme();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const [userId, setUserId] = useState(
    params.params.therapist_id.split("_")[0]
  );
  const [serviceType, setServiceType] = useState(
    params.params.therapist_id.split("_")[1]
  );

  const [reviews, setReviews] = useState<any[]>([
    {
      customer: "Jacob Kevin",
      review:
        "The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery.",
      rating: 5,
      verfied: true,
    },
    {
      customer: "Jacob Kevin",
      review:
        "The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery.",
      rating: 5,
      verfied: true,
    },
    {
      customer: "Jacob Kevin",
      review:
        "The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery.",
      rating: 5,
      verfied: true,
    },
    {
      customer: "Jacob Kevin",
      review:
        "The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery.",
      rating: 5,
      verfied: true,
    },
    {
      customer: "Jacob Kevin",
      review:
        "The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery.",
      rating: 5,
      verfied: true,
    },
  ]);

  useEffect(() => {
    getUserData(userId, serviceType);
  }, []);

  const getUserData = async (userId: string, serviceType: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select(
          `
              id,
              name,
              email,
              hourly_rate,
              phone,
              location,
              birthday,
              summary,
              avatar_url,
              services!inner (
                user_id,
                service_description,
                service_type!inner (
                  id,
                  subcategory
                )
              )
            `
        )
        .eq("id", userId)
        .eq("services.service_type.subcategory", serviceType)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = (therapist: string) => {
    router.push(`/booking/${userId}`);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center h-[calc(100vh-74px)]">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-col max-w-[900px] mx-auto items-center">
          <div className="flex flex-col w-full  gap-8 py-10">
            <div className="flex justify-between w-full items-start gap-12">
              <div className="w-full">
                <Image
                  className="rounded-md w-[250px] h-[250px]"
                  id="therapist"
                  src={userData?.avatar_url || ""}
                  alt="therapist"
                  width={250}
                  height={250}
                />
              </div>
              <div className="flex flex-col w-full gap-4 pr-20 pt-2">
                <span className=" text-3xl font-bold Poppins-font">
                  {userData?.name || ""}
                </span>
                <span className=" text-lg Poppins-font">Massage Therapist</span>
                <span className=" text-base Poppins-font">
                  {userData?.summary || ""}
                </span>
                <div className="flex flex-col w-full gap-4">
                  <div className="border-b-2 flex justify-center border-[#46A7B0] w-28 items-center p-1">
                    <span className="Poppins-font text-[#46A7B0] text-2xl">
                      Services
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <span className=" text-base Poppins-font font-semibold">
                      {userData?.services[0].service_type.subcategory}
                    </span>
                    <span className=" text-base Poppins-font font-semibold">
                      {userData?.hourly_rate}$/hour
                    </span>
                  </div>
                  <span className=" text-base Poppins-font">
                    {userData?.services[0].service_description}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 mt-10">
              <div className="border-b-2 flex justify-center border-[#46A7B0] w-28 items-center p-1">
                <span className="Poppins-font text-[#46A7B0] text-2xl">
                  Reviews
                </span>
              </div>
              <Carousel
                withIndicators
                height={200}
                slideSize="25%"
                slideGap="md"
                loop
                align="start"
                slidesToScroll={3}
              >
                {reviews &&
                  reviews.map((item, index) => {
                    return (
                      <Carousel.Slide my={"auto"} key={index}>
                        <div
                          className={`flex flex-col w-[300px] h-[150px] border rounded-md shadow-md ${
                            colorScheme === "light" ? "bg-[#F0F8F9]" : ""
                          } p-4 gap-4`}
                        >
                          <div className="flex flex-row w-full justify-between items-center">
                            <Rating defaultValue={item?.rating} readOnly />
                            <div className="flex flex-row items-center gap-1">
                              {item?.verfied ? (
                                <IconCircleCheck color="green" size={"1rem"} />
                              ) : (
                                <IconCircleX color="red" size={"1rem"} />
                              )}
                              <span className="text-sm Poppins-font">
                                {item?.verfied ? "Verified" : "Not Verified"}{" "}
                                appointment
                              </span>
                            </div>
                          </div>
                          <Text size="sm" lineClamp={4}>
                            {item?.review}
                          </Text>
                        </div>
                      </Carousel.Slide>
                    );
                  })}
              </Carousel>
              <div className="w-full justify-center flex py-8">
                <button
                  onClick={() => handleConfirmBooking(userData?.name)}
                  className="w-28 font-bold Poppins-font border-b-2 border-[#46A7B0]  animate-pulse"
                >
                  <span className="text-[#46A7B0] md:text-xl sm:text-base">
                    B
                  </span>
                  <span className="md:text-xl sm:text-base">ook</span>&nbsp;
                  <span className="text-[#46A7B0] md:text-xl sm:text-base">
                    N
                  </span>
                  <span className="md:text-xl sm:text-base">ow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
