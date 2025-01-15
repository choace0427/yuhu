"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";
import {
  Avatar,
  Grid,
  Image,
  Loader,
  Rating,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Link from "next/link";

export default function TherapistListPage() {
  const [loading, setLoading] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParams = urlParams.get("service");
    if (serviceParams) {
      setServiceType(serviceParams);
    }
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("services")
          .select(
            `
                name,
                email,
                service_description,
                service_type!inner (
                  subcategory
                ),
                users (
                  id,
                  hourly_rate,
                  phone,
                  location,
                  summary,
                  avatar_url
                )
              `
          )
          .eq("service_type.subcategory", serviceType);

        if (error) {
          throw error;
        }

        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        console.log("error");
      }
      setLoading(false);
    };

    if (serviceType) {
      fetchServices();
    }
  }, [serviceType]);

  return (
    <>
      {loading ? (
        <div className="w-full flex items-center justify-center h-[calc(100vh-74px)]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full max-w-7xl items-center gap-8 py-10  mx-auto">
            <div className="flex flex-col gap-4 items-center pt-4">
              <span className="text-[#46A7B0] Poppins-font text-4xl font-bold">
                Therapists for Thai Massage
              </span>
              <span className="Poppins-font text-lg">
                Browse therapists specializing in Massage Therapy and book a
                session that suits your schedule
              </span>
            </div>
            {services && services?.length > 0 ? (
              <SimpleGrid cols={3}>
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 border-2 border-[#46A7B0] p-2 w-[350px] h-[300px] rounded-lg"
                  >
                    <div className="flex flex-row w-full gap-5 pb-2 border-b-1">
                      <Avatar
                        radius="sm"
                        src={service?.users?.avatar_url || ""}
                        size={120}
                      />
                      <div className="flex flex-col gap-0.5">
                        <div className="flex flex-row w-full items-center">
                          <Text size="sm" fw={600}>
                            Name:
                          </Text>
                          <Text size="md" ml={4} mb={-2}>
                            {service.name}
                          </Text>
                        </div>
                        <div className="flex flex-row w-full items-center">
                          <Text size="sm" fw={600}>
                            Rating:
                          </Text>
                          <Rating defaultValue={5} readOnly ml={4} />
                        </div>
                        <div className="flex flex-row w-full items-center">
                          <Text size="sm" fw={600}>
                            Speciality:
                          </Text>
                          <Text size="md" ml={4} mb={-2}>
                            Thai Massage
                          </Text>
                        </div>
                        <div className="flex flex-row w-full items-center">
                          <Text size="sm" fw={600}>
                            Hourly Rate:
                          </Text>
                          <Text
                            size="md"
                            ml={4}
                            mb={-2}
                            className="!text-[#46A7B0]"
                          >
                            ${service?.users?.hourly_rate}
                          </Text>
                        </div>
                        <div className="flex flex-row w-full items-center">
                          <Text size="sm" fw={600}>
                            Experience:
                          </Text>
                          <Text size="md" ml={4} mb={-2}>
                            10+ years
                          </Text>
                        </div>
                        <Link
                          href={`/therapist/detail/${service?.users?.id}_${serviceType}`}
                          className=" text-sm mt-2 Poppins-font underline decoration-[#46A7B0]"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Text size="sm" fw={600}>
                        Summary:
                      </Text>
                      <Text size="md" ml={4} mb={-2}>
                        {service?.users?.summary}
                      </Text>
                    </div>
                  </div>
                ))}
              </SimpleGrid>
            ) : (
              <div className="flex flex-row gap-2 items-center min-h-60">
                <div className="text-[#46A7B0] text-2xl Poppins-font">
                  The therapist you want doesn&apos;t exist.
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
