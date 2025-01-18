// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/supabase";
// import {
//   Avatar,
//   Grid,
//   Image,
//   Loader,
//   Rating,
//   SimpleGrid,
//   Text,
// } from "@mantine/core";
// import Link from "next/link";

// export default function TherapistListPage() {
//   const [loading, setLoading] = useState(false);
//   const [serviceType, setServiceType] = useState("");
//   const [services, setServices] = useState<any[]>([]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const serviceParams = urlParams.get("service");
//     if (serviceParams) {
//       setServiceType(serviceParams);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchServices = async () => {
//       setLoading(true);
//       try {
//         const { data, error } = await supabase
//           .from("services")
//           .select(
//             `
//                 name,
//                 email,
//                 service_description,
//                 service_type!inner (
//                   subcategory
//                 ),
//                 users (
//                   id,
//                   hourly_rate,
//                   phone,
//                   location,
//                   summary,
//                   avatar_url
//                 )
//               `
//           )
//           .eq("service_type.subcategory", serviceType);

//         if (error) {
//           throw error;
//         }

//         if (data) {
//           setServices(data);
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         console.log("error");
//       }
//       setLoading(false);
//     };

//     if (serviceType) {
//       fetchServices();
//     }
//   }, [serviceType]);

//   return (
//     <>
//       {loading ? (
//         <div className="w-full flex items-center justify-center h-[calc(100vh-74px)]">
//           <Loader />
//         </div>
//       ) : (
//         <>
//           <div className="flex flex-col w-full max-w-7xl items-center gap-8 py-10  mx-auto">
//             <div className="flex flex-col gap-4 items-center pt-4">
//               <span className="text-[#46A7B0] Poppins-font text-4xl font-bold">
//                 Therapists for Thai Massage
//               </span>
//               <span className="Poppins-font text-lg">
//                 Browse therapists specializing in Massage Therapy and book a
//                 session that suits your schedule
//               </span>
//             </div>
//             {services && services?.length > 0 ? (
//               <SimpleGrid cols={3}>
//                 {services.map((service, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col gap-2 border-2 border-[#46A7B0] p-2 w-[350px] h-[300px] rounded-lg"
//                   >
//                     <div className="flex flex-row w-full gap-5 pb-2 border-b-1">
//                       <Avatar
//                         radius="sm"
//                         src={service?.users?.avatar_url || ""}
//                         size={120}
//                       />
//                       <div className="flex flex-col gap-0.5">
//                         <div className="flex flex-row w-full items-center">
//                           <Text size="sm" fw={600}>
//                             Name:
//                           </Text>
//                           <Text size="md" ml={4} mb={-2}>
//                             {service.name}
//                           </Text>
//                         </div>
//                         <div className="flex flex-row w-full items-center">
//                           <Text size="sm" fw={600}>
//                             Rating:
//                           </Text>
//                           <Rating defaultValue={5} readOnly ml={4} />
//                         </div>
//                         <div className="flex flex-row w-full items-center">
//                           <Text size="sm" fw={600}>
//                             Speciality:
//                           </Text>
//                           <Text size="md" ml={4} mb={-2}>
//                             Thai Massage
//                           </Text>
//                         </div>
//                         <div className="flex flex-row w-full items-center">
//                           <Text size="sm" fw={600}>
//                             Hourly Rate:
//                           </Text>
//                           <Text
//                             size="md"
//                             ml={4}
//                             mb={-2}
//                             className="!text-[#46A7B0]"
//                           >
//                             ${service?.users?.hourly_rate}
//                           </Text>
//                         </div>
//                         <div className="flex flex-row w-full items-center">
//                           <Text size="sm" fw={600}>
//                             Experience:
//                           </Text>
//                           <Text size="md" ml={4} mb={-2}>
//                             10+ years
//                           </Text>
//                         </div>
//                         <Link
//                           href={`/therapist/detail/${service?.users?.id}_${serviceType}`}
//                           className=" text-sm mt-2 Poppins-font underline decoration-[#46A7B0]"
//                         >
//                           View Profile
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Text size="sm" fw={600}>
//                         Summary:
//                       </Text>
//                       <Text size="md" ml={4} mb={-2}>
//                         {service?.users?.summary}
//                       </Text>
//                     </div>
//                   </div>
//                 ))}
//               </SimpleGrid>
//             ) : (
//               <div className="flex flex-row gap-2 items-center min-h-60">
//                 <div className="text-[#46A7B0] text-2xl Poppins-font">
//                   The therapist you want doesn&apos;t exist.
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// }

"use client";

import { supabase } from "@/supabase";
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Button,
  SimpleGrid,
  Avatar,
  Stack,
  Flex,
  ActionIcon,
  Skeleton,
  Rating,
} from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconHeart,
  IconMapPin,
  IconStar,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const therapists = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    speciality: "Thai Massage",
    hourlyRate: "80",
    experience: "10+ years",
    summary:
      "Certified Thai massage therapist with expertise in traditional techniques and modern therapeutic approaches.",
    location: "New York, NY",
    availability: "Mon-Fri, 9AM-7PM",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    speciality: "Thai Massage",
    hourlyRate: "75",
    experience: "10+ years",
    summary:
      "Specializing in therapeutic Thai massage with a focus on stress relief and muscle recovery.",
    location: "Los Angeles, CA",
    availability: "Mon-Sat, 8AM-8PM",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    speciality: "Thai Massage",
    hourlyRate: "85",
    experience: "10+ years",
    summary:
      "Expert in traditional Thai massage techniques, combining ancient wisdom with modern wellness practices.",
    location: "Chicago, IL",
    availability: "Tue-Sun, 10AM-6PM",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
  },
];

export default function Home() {
  const router = useRouter();

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
    <Container size="xl" py="xl">
      <Stack align="center" mb="xl" gap="md">
        <Title order={1} className="text-gray-900" ta="center">
          Find Your Perfect Thai Massage Therapist
        </Title>
        <Text size="lg" c="dimmed" className="max-w-2xl text-center">
          Connect with certified Thai massage therapists who can help you
          achieve balance, relaxation, and wellness
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <TherapistCardSkeleton key={index} />
            ))
          : services.map((therapist, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <Card.Section p="md" bg="gray.0">
                  <Group justify="space-between" align="flex-start">
                    <Group>
                      <Avatar
                        src={therapist?.users?.avatar_url}
                        name={therapist?.users?.name}
                        size="xl"
                        radius="md"
                        className="border-2 border-gray-100"
                      />
                      <div>
                        <Text fw={600} size="lg" className="text-gray-900">
                          {therapist?.name || "(Unknown)"}
                        </Text>
                        <Group gap={4} mb={4}>
                          {Array.from({ length: therapist.rating }).map(
                            (_, i) => (
                              <IconStar
                                key={i}
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                          <Rating value={therapist?.rating} readOnly />
                        </Group>
                        <Badge variant="light" color="blue" size="sm">
                          {therapist?.summary || "10+ years"}
                        </Badge>
                      </div>
                    </Group>
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      radius="xl"
                      size="lg"
                    >
                      <IconHeart size={20} />
                    </ActionIcon>
                  </Group>
                </Card.Section>

                <Stack gap="xs" my="md">
                  <Group gap="xs">
                    <IconMapPin size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      {therapist?.location || "Unknown"}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconClock size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      {therapist?.availability || "Mon-Fri, 9AM-7PM"}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar size={16} className="text-gray-600" />
                    <Text size="sm" c="dimmed">
                      Starting from ${therapist?.users?.hourly_rate}/hour
                    </Text>
                  </Group>
                </Stack>

                <Text size="sm" c="dimmed" lineClamp={2} mb="lg">
                  {therapist?.summary || "Unknown"}
                </Text>

                <Card.Section p="md" bg="gray.0">
                  <Group grow>
                    <Button variant="filled" color="blue">
                      Book Session
                    </Button>
                    <Button
                      variant="light"
                      onClick={() =>
                        router.push(
                          `/therapist/detail/${therapist?.users?.id}_${serviceType}`
                        )
                      }
                    >
                      View Profile
                    </Button>
                  </Group>
                </Card.Section>
              </Card>
            ))}
      </SimpleGrid>
    </Container>
  );
}

const TherapistCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p="md" bg="gray.0">
        <Group justify="space-between" align="flex-start">
          <Group>
            <Skeleton height={80} circle />
            <div style={{ flex: 1 }}>
              <Skeleton height={20} width={120} mb={8} />
              <Skeleton height={16} width={100} mb={8} />
              <Skeleton height={20} width={80} />
            </div>
          </Group>
          <Skeleton height={32} circle />
        </Group>
      </Card.Section>

      <Stack gap="xs" my="md">
        <Skeleton height={16} width="70%" />
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} width="80%" />
      </Stack>

      <Skeleton height={40} mb="lg" />

      <Card.Section p="md" bg="gray.0">
        <Group grow>
          <Skeleton height={36} />
          <Skeleton height={36} />
        </Group>
      </Card.Section>
    </Card>
  );
};
