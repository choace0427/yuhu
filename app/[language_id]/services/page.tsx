// "use client";

// import { motion } from "framer-motion";
// import { Image } from "@mantine/core";
// import Services from "../components/services/Services";
// import Massage from "../components/massage/Massage";
// import Training from "../components/training/Training";
// import PersonalTraining from "../components/training/PersonalTraining";
// import Gift from "../components/gift/Gift";

// export default function ServicesPage() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const headerVariants = {
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

//   const imageVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   const buttonVariants = {
//     initial: { scale: 1 },
//     hover: {
//       scale: 1.05,
//       transition: {
//         duration: 0.2,
//         ease: "easeInOut",
//       },
//     },
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="flex flex-col lg:gap-16 md:gap-12 gap-8 max-w-7xl sm:px-0 px-2 w-full mx-auto"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.div
//         className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 pb-28 md:px-0 px-4"
//         variants={sectionVariants}
//         whileInView="visible"
//         initial="hidden"
//         viewport={{ once: true, margin: "-100px" }}
//       >
//         <motion.span
//           className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
//           variants={headerVariants}
//         >
//           Gift Cards
//         </motion.span>
//         <Gift />
//       </motion.div>
//     </motion.div>
//   );
// }

"use client";

import {
  Button,
  Card,
  Container,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import Gift from "../components/gift/Gift";

export default function CustomerPage() {
  const supabase = createClient();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any[]>([]);

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleBooking = (service: string) => {
    router.replace(`/${currentLanguage}/therapist/list?service=${service}`);
  };

  const handlefetchCategory = async () => {
    const { data, error } = await supabase
      .from("service_category")
      .select()
      .order("id");
    if (error) {
      console.log("error", error);
      return;
    }
    setCategory(data);
  };

  const handlefetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("service_type").select();
    if (error) {
      console.log("error", error);
      return;
    }
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    handlefetchServices();
    handlefetchCategory();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language_id") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack align="center" gap="xl" style={{ color: "white" }}>
            <Title order={1} size="3rem">
              Welcome to Wellness
            </Title>
            <Text size="xl" style={{ maxWidth: 600 }} ta="center">
              Discover a world of relaxation, fitness, and beauty treatments
              tailored to your needs
            </Text>
            <Button size="lg" color="blue">
              Book Appointment
            </Button>
          </Stack>
        </div>
      </div>

      {/* Services Sections */}
      <Container size="lg" py="xl">
        <Tabs
          defaultValue={"1"}
          color="#46A7B0"
          styles={{
            tabLabel: {
              fontSize: "1.05rem",
              fontWeight: 600,
            },
          }}
        >
          <Tabs.List grow mb="xl">
            {category?.map((category, index) => {
              return (
                <Tabs.Tab
                  value={String(category.id)}
                  key={index}
                  // leftSection={<IconMassage size={16} />}
                >
                  {category?.category}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {loading ? (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))}
            </SimpleGrid>
          ) : (
            <>
              {category?.map((category, index) => {
                return (
                  <Tabs.Panel value={String(category?.id)} key={index}>
                    <Title order={2} ta="center" mb="xl">
                      {category?.category}
                    </Title>
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                      {services
                        ?.filter((item) => item.category_id === category?.id)
                        .map((service) => (
                          <ServiceCard
                            key={service.name}
                            service={service}
                            handleBooking={handleBooking}
                          />
                        ))}
                    </SimpleGrid>
                  </Tabs.Panel>
                );
              })}
            </>
          )}
        </Tabs>
      </Container>

      <motion.div
        className="flex flex-col lg:gap-16 md:gap-12 gap-8 max-w-7xl sm:px-0 px-2 w-full mx-auto mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col w-full lg:gap-6 md:gap-4 gap-2 pb-28 md:px-0 px-4"
          variants={sectionVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            className="text-black font-bold lg:text-3xl md:text-2xl text-xl"
            variants={headerVariants}
          >
            Gift Cards
          </motion.span>
          <Gift />
        </motion.div>
      </motion.div>
    </main>
  );
}

const ServiceCard = ({ service, handleBooking }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`${service?.image_url}`}
          height={200}
          alt={service?.subcategory}
        />
      </Card.Section>

      <Title order={3} mt="md" mb="xs" size="h4">
        {service?.subcategory}
      </Title>

      <Text size="sm" c="dimmed" mb="md">
        {service?.service_content}
      </Text>
      <button
        className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit mx-auto"
        onClick={() => handleBooking(service?.id)}
      >
        <span className="text-[#46A7B0] md:text-xl sm:text-base">B</span>
        <span className="md:text-xl sm:text-base">ook</span>
        &nbsp;
        <span className="text-[#46A7B0] md:text-xl sm:text-base">N</span>
        <span className="md:text-xl sm:text-base">ow</span>
      </button>
    </Card>
  );
};

const ServiceCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={200} />
      </Card.Section>

      <Stack mt="md" gap="sm">
        <Skeleton height={24} width="60%" />
        <Skeleton height={16} />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
        <Skeleton height={36} mt="md" />
      </Stack>
    </Card>
  );
};
