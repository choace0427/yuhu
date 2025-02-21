// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// export default function LocalServiceSection() {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
//   const scale = useTransform(
//     scrollYProgress,
//     [0, 0.2, 0.8, 1],
//     [0.8, 1, 1, 0.8]
//   );

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const countryVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   const cityVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const videoVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       ref={sectionRef}
//       style={{ opacity, scale }}
//       className="bg-[#46A7B0] py-14 w-full flex justify-center"
//     >
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         className="flex flex-row w-full justify-between max-w-7xl"
//       >
//         <motion.div
//           variants={containerVariants}
//           className="flex flex-col gap-4 items-center w-[500px]"
//         >
//           <motion.span
//             variants={titleVariants}
//             className="Poppins-font text-white text-3xl font-bold"
//           >
//             Find your local massage service:
//           </motion.span>
//           <div className="flex flex-row justify-between w-full px-20">
//             <motion.div
//               variants={containerVariants}
//               className="flex flex-col gap-1 items-center"
//             >
//               <motion.span
//                 variants={countryVariants}
//                 className="text-2xl text-gray-200 Poppins-font"
//               >
//                 Italy
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Roma
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Milano
//               </motion.span>
//             </motion.div>
//             <motion.div
//               variants={containerVariants}
//               className="flex flex-col gap-1 items-center"
//             >
//               <motion.span
//                 variants={countryVariants}
//                 className="text-2xl text-gray-200 Poppins-font"
//               >
//                 Spain
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Mallorca
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Ibiza
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Madrid
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Malaga
//               </motion.span>
//               <motion.span
//                 variants={cityVariants}
//                 className="text-base text-white Poppins-font"
//               >
//                 Barcelona
//               </motion.span>
//             </motion.div>
//           </div>
//         </motion.div>
//         <motion.video
//           variants={videoVariants}
//           className="w-[500px] rounded-3xl"
//           src="https://myyuhubucket.s3.us-east-2.amazonaws.com/video-output-A46683D6-84E3-4524-8FB5-E6C7BF446550.mov"
//           controls
//           autoPlay
//           loop
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";

import { supabase } from "@/supabase";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  Title,
  Text,
  Group,
  Image,
  Badge,
  Button,
  Box,
  rem,
  Paper,
  ThemeIcon,
  SimpleGrid,
  Progress,
  Tabs,
  ActionIcon,
  Tooltip,
  Card,
  Divider,
} from "@mantine/core";
import {
  IconMapPin,
  IconUsers,
  IconStethoscope,
  IconStar,
  IconCertificate,
  IconBuildingSkyscraper,
  IconChartBar,
  IconHeartHandshake,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();

  const [activeCountry, setActiveCountry] = useState("Italy");
  const [sortBy, setSortBy] = useState<"rating" | "therapists" | "experience">(
    "rating"
  );

  const [cities, setCities] = useState<any[]>([]);

  const handleCities = async (country: string) => {
    const { data, error } = await supabase
      .from("location_city")
      .select("*, therapist_list (*), location_country!inner (*))")
      .eq("location_country.country", country);

    if (error) throw error;

    setCities(data);
  };

  useEffect(() => {
    handleCities(activeCountry);
  }, [activeCountry]);

  return (
    <Box w={"100%"}>
      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden flex items-center">
        {/* Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-[50%] left-[50%] w-full h-full object-cover z-[-1]"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <source
            src="https://myyuhuawsbucket.s3.us-east-2.amazonaws.com/intro-yuhu.mov"
            type="video/mp4"
          />
        </video>

        {/* Content rendered on top of the video */}
        <Container size="xl" mt={-80}>
          <Box style={{ maxWidth: rem(1200) }}>
            <Title
              order={1}
              size={rem(48)}
              style={{
                color: "white",
                marginBottom: rem(24),
                fontWeight: 800,
                lineHeight: 1.1,
              }}
              className="Poppins-font"
            >
              Premium Massage & Wellness Services
            </Title>
            <Title
              order={1}
              size={rem(48)}
              style={{
                color: "white",
                marginBottom: rem(24),
                fontWeight: 800,
                lineHeight: 1.1,
              }}
              className="Poppins-font"
            >
              Anytime, Anywhere in Italy & Spain
            </Title>
            <Text
              size="xl"
              style={{
                color: "white",
                marginBottom: rem(48),
                opacity: 0.9,
                fontSize: rem(18),
                // maxWidth: rem(600),
              }}
              className="Poppins-font"
            >
              Rejuvenate your mind and body with expert massage therapy and
              wellness experiences tailored to your needs. Whether you're
              seeking a relaxing massage, sports massage massage, or a spa day
              at home ,our top massage therapists in Spain and Italy bring
              wellness directly to you—on your schedule, wherever you are.
            </Text>

            <Group gap="md" mb="xl">
              <Tabs
                value={activeCountry}
                onChange={(value) => setActiveCountry(value as string)}
                variant="pills"
                radius="xl"
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="Italy"
                    leftSection={<IconBuildingSkyscraper size={20} />}
                    style={{ color: "white", fontSize: rem(24) }}
                    color="#46A7B0"
                  >
                    Italy
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="Spain"
                    leftSection={<IconBuildingSkyscraper size={20} />}
                    style={{ color: "white", fontSize: rem(24) }}
                    color="#46A7B0"
                  >
                    Spain
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Group gap="xs">
                <Tooltip label="Sort by Rating">
                  <ActionIcon
                    variant={sortBy === "rating" ? "filled" : "light"}
                    color="#46A7B0"
                    size="lg"
                    onClick={() => setSortBy("rating")}
                  >
                    <IconStar size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Sort by Therapist Count">
                  <ActionIcon
                    variant={sortBy === "therapists" ? "filled" : "light"}
                    color="#46A7B0"
                    size="lg"
                    onClick={() => setSortBy("therapists")}
                  >
                    <IconUsers size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Sort by Experience">
                  <ActionIcon
                    variant={sortBy === "experience" ? "filled" : "light"}
                    color="#46A7B0"
                    size="lg"
                    onClick={() => setSortBy("experience")}
                  >
                    <IconChartBar size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          </Box>
        </Container>
      </div>

      {/* Cities Section */}
      <Container
        size="xl"
        style={{ marginTop: rem(-160), position: "relative", zIndex: 2 }}
      >
        <Carousel
          slideSize="33.333333%"
          slideGap="md"
          align="start"
          slidesToScroll={3}
          controlsOffset="xl"
          controlSize={44}
          withControls={false}
          loop
          dragFree
          nextControlIcon={<IconChevronRight size={24} />}
          previousControlIcon={<IconChevronLeft size={24} />}
          styles={{
            control: {
              backgroundColor: "white",
              border: "1px solid #e9ecef",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              "&:hover": {
                backgroundColor: "#f8f9fa",
              },
            },
          }}
        >
          {cities.map((city) => (
            <Carousel.Slide key={city.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Box style={{ position: "relative" }}>
                    <Image
                      src={city.image || ""}
                      alt={city.name}
                      className="h-[200px]"
                    />
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.8))",
                        padding: rem(12),
                      }}
                    >
                      <Group justify="space-between" align="center">
                        <Box>
                          <Text size="xl" fw={700} c="white">
                            {city.city}
                          </Text>
                          <Group gap={4}>
                            <IconMapPin size={14} color="white" />
                            <Text size="sm" c="white">
                              {city.location_country?.country}
                            </Text>
                          </Group>
                        </Box>
                        <Badge
                          size="lg"
                          variant="filled"
                          color="#46A7B0"
                          leftSection={<IconStar size={12} />}
                        >
                          {city.averageRating}
                        </Badge>
                      </Group>
                    </Box>
                  </Box>
                </Card.Section>

                <Group mt="md" mb="xs" justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon color="#46A7B0" variant="light" size="md">
                      <IconUsers size={16} />
                    </ThemeIcon>
                    <Text fw={500}>
                      {city.therapist_list?.length || 0} Therapists
                    </Text>
                    <Badge color="teal" variant="light" size="sm">
                      +{city.growth}%
                    </Badge>
                  </Group>
                  <Text lineClamp={4}>{city?.description}</Text>
                </Group>

                <Button
                  variant="light"
                  color="#46A7B0"
                  fullWidth
                  mt="md"
                  leftSection={<IconHeartHandshake size={16} />}
                  onClick={() =>
                    router.push(
                      `/therapist/list?country=${city.location_country?.country}&cities=${city?.city}`
                    )
                  }
                >
                  Find Therapists
                </Button>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
