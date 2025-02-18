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
import { useState } from "react";

interface CityStats {
  id: number;
  name: string;
  country: string;
  image: string;
  therapistCount: number;
  averageRating: number;
  specialties: number;
  averageExperience: number;
  topSpecialties: string[];
  description: string;
  growth: number;
}

const cityStats: CityStats[] = [
  // Italy
  {
    id: 1,
    name: "Rome",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 156,
    averageRating: 4.8,
    specialties: 12,
    averageExperience: 8.5,
    topSpecialties: ["Deep Tissue", "Sports Therapy", "Rehabilitation"],
    description:
      "The eternal city offers a perfect blend of traditional and modern wellness practices.",
    growth: 25,
  },
  {
    id: 2,
    name: "Milan",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1574401347928-9a8e4dae16e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 134,
    averageRating: 4.7,
    specialties: 10,
    averageExperience: 7.8,
    topSpecialties: ["Swedish Massage", "Aromatherapy", "Hot Stone"],
    description:
      "Fashion capital with a growing wellness community focused on innovative therapies.",
    growth: 32,
  },
  {
    id: 3,
    name: "Florence",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1543429257-3eb0b65d9c58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 98,
    averageRating: 4.9,
    specialties: 8,
    averageExperience: 9.1,
    topSpecialties: ["Therapeutic", "Reflexology", "Shiatsu"],
    description:
      "Renaissance city with a rich tradition of healing and wellness practices.",
    growth: 28,
  },
  {
    id: 4,
    name: "Venice",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 87,
    averageRating: 4.6,
    specialties: 9,
    averageExperience: 7.5,
    topSpecialties: ["Lymphatic Drainage", "Facial", "Aromatherapy"],
    description: "Unique floating city offering serene wellness experiences.",
    growth: 22,
  },
  {
    id: 5,
    name: "Naples",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 112,
    averageRating: 4.7,
    specialties: 11,
    averageExperience: 8.2,
    topSpecialties: ["Sports Therapy", "Deep Tissue", "Myofascial"],
    description:
      "Vibrant southern Italian city with diverse therapeutic offerings.",
    growth: 30,
  },
  // Spain
  {
    id: 6,
    name: "Barcelona",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 189,
    averageRating: 4.9,
    specialties: 15,
    averageExperience: 9.2,
    topSpecialties: ["Sports Therapy", "Therapeutic Massage", "Rehabilitation"],
    description:
      "Mediterranean wellness hub combining traditional and modern healing practices.",
    growth: 40,
  },
  {
    id: 7,
    name: "Madrid",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 167,
    averageRating: 4.8,
    specialties: 13,
    averageExperience: 8.7,
    topSpecialties: ["Deep Tissue", "Prenatal", "Myofascial Release"],
    description:
      "Vibrant capital city with a diverse range of wellness specialists.",
    growth: 35,
  },
  {
    id: 8,
    name: "Valencia",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1599991271439-d663e2ec95a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 145,
    averageRating: 4.7,
    specialties: 12,
    averageExperience: 8.4,
    topSpecialties: ["Sports Recovery", "Hot Stone", "Swedish"],
    description:
      "Coastal city offering modern wellness with Mediterranean influence.",
    growth: 33,
  },
  {
    id: 9,
    name: "Seville",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1559682468-a6a29e7d9517?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 123,
    averageRating: 4.8,
    specialties: 10,
    averageExperience: 7.9,
    topSpecialties: ["Therapeutic", "Aromatherapy", "Deep Tissue"],
    description:
      "Andalusian gem with a perfect blend of traditional and modern therapies.",
    growth: 28,
  },
  {
    id: 10,
    name: "Malaga",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1562677292-00d628e0b2bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    therapistCount: 134,
    averageRating: 4.6,
    specialties: 11,
    averageExperience: 8.1,
    topSpecialties: ["Beach Therapy", "Sports Recovery", "Relaxation"],
    description:
      "Coastal paradise offering unique wellness experiences by the Mediterranean.",
    growth: 31,
  },
];

export default function HomePage() {
  const [activeCountry, setActiveCountry] = useState("italy");
  const [sortBy, setSortBy] = useState<"rating" | "therapists" | "experience">(
    "rating"
  );

  const filteredCities = cityStats
    .filter((city) => city.country.toLowerCase() === activeCountry)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.averageRating - a.averageRating;
        case "therapists":
          return b.therapistCount - a.therapistCount;
        case "experience":
          return b.averageExperience - a.averageExperience;
        default:
          return 0;
      }
    });

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
        <Container size="xl">
          <Box style={{ maxWidth: rem(900) }}>
            <Title
              order={1}
              size={rem(72)}
              style={{
                color: "white",
                marginBottom: rem(24),
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Discover Wellness
              <Text span c="blue.4">
                {" "}
                Across Europe
              </Text>
            </Title>
            <Text
              size="xl"
              style={{
                color: "white",
                marginBottom: rem(48),
                opacity: 0.9,
                fontSize: rem(24),
                maxWidth: rem(600),
              }}
            >
              Connect with expert therapists in Italy and Spain's most vibrant
              cities
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
                    value="italy"
                    leftSection={<IconBuildingSkyscraper size={20} />}
                    style={{ color: "white", fontSize: rem(24) }}
                  >
                    Italy
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="spain"
                    leftSection={<IconBuildingSkyscraper size={20} />}
                    style={{ color: "white", fontSize: rem(24) }}
                  >
                    Spain
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <Group gap="xs">
                <Tooltip label="Sort by Rating">
                  <ActionIcon
                    variant={sortBy === "rating" ? "filled" : "light"}
                    color="blue"
                    size="lg"
                    onClick={() => setSortBy("rating")}
                  >
                    <IconStar size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Sort by Therapist Count">
                  <ActionIcon
                    variant={sortBy === "therapists" ? "filled" : "light"}
                    color="blue"
                    size="lg"
                    onClick={() => setSortBy("therapists")}
                  >
                    <IconUsers size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Sort by Experience">
                  <ActionIcon
                    variant={sortBy === "experience" ? "filled" : "light"}
                    color="blue"
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
          {filteredCities.map((city) => (
            <Carousel.Slide key={city.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Box style={{ position: "relative" }}>
                    <Image
                      src={city.image}
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
                            {city.name}
                          </Text>
                          <Group gap={4}>
                            <IconMapPin size={14} color="white" />
                            <Text size="sm" c="white">
                              {city.country}
                            </Text>
                          </Group>
                        </Box>
                        <Badge
                          size="lg"
                          variant="filled"
                          color="blue"
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
                    <ThemeIcon color="blue" variant="light" size="md">
                      <IconUsers size={16} />
                    </ThemeIcon>
                    <Text fw={500}>{city.therapistCount} Therapists</Text>
                    <Badge color="teal" variant="light" size="sm">
                      +{city.growth}%
                    </Badge>
                  </Group>
                  <Badge variant="light" color="blue">
                    {city.specialties} Specialties
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                  {city.description}
                </Text>

                <Divider my="xs" />

                <Box mb="md">
                  <Group justify="space-between" mb={4}>
                    <Text size="sm" fw={500}>
                      Experience Level
                    </Text>
                    <Text size="sm" c="dimmed">
                      {city.averageExperience} years avg
                    </Text>
                  </Group>
                  <Progress
                    value={city.averageExperience * 10}
                    color="blue"
                    size="sm"
                    radius="xl"
                  />
                </Box>

                <Group gap={8} mb="md">
                  {city.topSpecialties.map((specialty, index) => (
                    <Badge key={index} variant="dot" color="blue" size="sm">
                      {specialty}
                    </Badge>
                  ))}
                </Group>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="auto"
                  leftSection={<IconHeartHandshake size={16} />}
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
