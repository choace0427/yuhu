// "use client";

// import { supabase } from "@/supabase";
// import {
//   Container,
//   Title,
//   Text,
//   Card,
//   Badge,
//   Group,
//   SimpleGrid,
//   Avatar,
//   Stack,
//   Flex,
//   ActionIcon,
//   Skeleton,
//   Rating,
// } from "@mantine/core";
// import {
//   IconCalendar,
//   IconClock,
//   IconHeart,
//   IconMapPin,
//   IconStar,
// } from "@tabler/icons-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const router = useRouter();

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
//                     name,
//                     email,
//                     service_description,
//                     service_type!inner (
//                       subcategory
//                     ),
//                     therapist_list (*)
//                   `
//           )
//           .eq("service_type.id", serviceType);

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
//     <Container size="xl" py="xl">
//       <Stack align="center" mb="xl" gap="md">
//         <Title order={1} className="text-gray-900" ta="center">
//           Find Your Perfect {services[0]?.service_type?.subcategory || ""}{" "}
//           Therapist
//         </Title>
//         <Text size="lg" c="dimmed" className="max-w-2xl text-center">
//           Connect with certified Thai massage therapists who can help you
//           achieve balance, relaxation, and wellness
//         </Text>
//       </Stack>

//       <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
//         {loading
//           ? Array.from({ length: 3 }).map((_, index) => (
//               <TherapistCardSkeleton key={index} />
//             ))
//           : services.map((therapist, index) => (
//               <Card
//                 key={index}
//                 shadow="sm"
//                 padding="lg"
//                 radius="md"
//                 withBorder
//                 className="hover:shadow-lg transition-shadow duration-200"
//               >
//                 <Card.Section p="md" bg="gray.0">
//                   <Group justify="space-between" align="flex-start">
//                     <Group>
//                       <Avatar
//                         src={therapist?.therapist_list?.avatar_url}
//                         name={therapist?.therapist_list?.name}
//                         color="initials"
//                         size="xl"
//                         radius="md"
//                         className="border-2 border-gray-100"
//                       />
//                       <div>
//                         <Text fw={600} size="lg" className="text-gray-900">
//                           {therapist?.therapist_list?.name || "(Unknown)"}
//                         </Text>
//                         <Group gap={4} mb={4}>
//                           {Array.from({ length: therapist.rating }).map(
//                             (_, i) => (
//                               <IconStar
//                                 key={i}
//                                 size={16}
//                                 className="fill-yellow-400 text-yellow-400"
//                               />
//                             )
//                           )}
//                           <Rating value={therapist?.rating} readOnly />
//                         </Group>
//                         <Badge variant="light" color="blue" size="sm">
//                           {therapist?.summary || "10+ years"}
//                         </Badge>
//                       </div>
//                     </Group>
//                     <ActionIcon
//                       variant="subtle"
//                       color="gray"
//                       radius="xl"
//                       size="lg"
//                     >
//                       <IconHeart size={20} />
//                     </ActionIcon>
//                   </Group>
//                 </Card.Section>

//                 <Stack gap="xs" my="md">
//                   <Group gap="xs">
//                     <IconMapPin size={16} className="text-gray-600" />
//                     <Text size="sm" c="dimmed">
//                       {therapist?.therapist_list?.location || "Unknown"}
//                     </Text>
//                   </Group>
//                   <Group gap="xs">
//                     <IconClock size={16} className="text-gray-600" />
//                     <Text size="sm" c="dimmed">
//                       {therapist?.availability || "Mon-Fri, 9AM-7PM"}
//                     </Text>
//                   </Group>
//                   <Group gap="xs">
//                     <IconCalendar size={16} className="text-gray-600" />
//                     <Text size="sm" c="dimmed">
//                       Starting from{" "}
//                       <span className="font-bold">
//                         ${therapist?.therapist_list?.hourly_rate}
//                       </span>
//                       /hour
//                     </Text>
//                   </Group>
//                 </Stack>

//                 <Text size="sm" c="dimmed" lineClamp={3} mb="lg">
//                   {therapist?.therapist_list?.summary || "Unknown"}
//                 </Text>

//                 <Card.Section p="md" bg="gray.0">
//                   <Flex justify={"space-around"}>
//                     <button
//                       className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit"
//                       onClick={() =>
//                         router.push(`/booking/${therapist?.therapist_list?.id}`)
//                       }
//                     >
//                       <span className="text-[#46A7B0] md:text-xl sm:text-base">
//                         B
//                       </span>
//                       <span className="md:text-xl sm:text-base">ook</span>
//                       &nbsp;
//                       <span className="text-[#46A7B0] md:text-xl sm:text-base">
//                         S
//                       </span>
//                       <span className="md:text-xl sm:text-base">ession</span>
//                     </button>
//                     <button
//                       className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
//                       onClick={() =>
//                         router.push(
//                           `/therapist/detail/${therapist?.therapist_list?.id}_${serviceType}`
//                         )
//                       }
//                     >
//                       <span className="text-[#46A7B0] md:text-xl sm:text-base">
//                         V
//                       </span>
//                       <span className="md:text-xl sm:text-base">iew</span>
//                       &nbsp;
//                       <span className="text-[#46A7B0] md:text-xl sm:text-base">
//                         P
//                       </span>
//                       <span className="md:text-xl sm:text-base">rofile</span>
//                     </button>
//                   </Flex>
//                 </Card.Section>
//               </Card>
//             ))}
//       </SimpleGrid>
//     </Container>
//   );
// }

// const TherapistCardSkeleton = () => {
//   return (
//     <Card shadow="sm" padding="lg" radius="md" withBorder>
//       <Card.Section p="md" bg="gray.0">
//         <Group justify="space-between" align="flex-start">
//           <Group>
//             <Skeleton height={80} circle />
//             <div style={{ flex: 1 }}>
//               <Skeleton height={20} width={120} mb={8} />
//               <Skeleton height={16} width={100} mb={8} />
//               <Skeleton height={20} width={80} />
//             </div>
//           </Group>
//           <Skeleton height={32} circle />
//         </Group>
//       </Card.Section>

//       <Stack gap="xs" my="md">
//         <Skeleton height={16} width="70%" />
//         <Skeleton height={16} width="60%" />
//         <Skeleton height={16} width="80%" />
//       </Stack>

//       <Skeleton height={40} mb="lg" />

//       <Card.Section p="md" bg="gray.0">
//         <Group grow>
//           <Skeleton height={36} />
//           <Skeleton height={36} />
//         </Group>
//       </Card.Section>
//     </Card>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Group,
  Grid,
  Title,
  Paper,
  Stack,
  Text,
  Button,
  Select,
  MultiSelect,
  RangeSlider,
  Card,
  Image,
  Badge,
  Avatar,
  Rating,
  ActionIcon,
  Pagination,
  Box,
  Flex,
  SimpleGrid,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { IconHeart, IconMapPin } from "@tabler/icons-react";

import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/utils/supabase/client";

const TherapistCard = ({ data }: any) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card p={0} radius="md" withBorder>
      <Box className="relative">
        <Avatar
          src={data?.avatar_url}
          alt={data?.name}
          name={data?.name}
          size="xl"
          radius="xs"
          color="initials"
          className="object-cover object-top !h-[180px] !w-full"
        />
      </Box>

      <Box className="p-5">
        <Group ps="apart" mb="xs">
          <Box w={"100%"}>
            <Flex justify={"space-between"} align={"center"} w={"100%"}>
              <Text size="xl" fw={600} className="text-gray-900">
                {data?.name}
              </Text>
              <UnstyledButton
                className="w-8 h-8 mt-1 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <IconHeart
                  size={16}
                  className={isFavorite ? "text-red-500" : "text-gray-600"}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </UnstyledButton>
            </Flex>

            <Group gap={4} mt={"sm"}>
              <Rating
                value={
                  data?.reviews?.length > 0
                    ? data.reviews.reduce(
                        (total: any, review: any) => total + review?.rating,
                        0
                      ) / data.reviews.length
                    : 0
                }
                fractions={4}
                readOnly
              />
              <Text size="sm" color="dimmed">
                ({data?.reviews?.length} reviews)
              </Text>
            </Group>
          </Box>
        </Group>

        <Group gap="xl" mb={"md"}>
          <Flex align={"center"} gap={4}>
            <IconMapPin size={"1rem"} />
            <Text size="sm" className="text-gray-600">
              {data?.city}, {data?.country}
            </Text>
          </Flex>
        </Group>
        <Box mb="md">
          <Text size="sm" className="text-gray-600" lineClamp={4}>
            <span className="font-semibold">Summary:</span> <br />
            {data?.summary}
          </Text>
        </Box>

        <Box mb="md">
          <Text size="sm" fw={500} mb="xs" className="text-gray-700">
            Specialties
          </Text>
          <Group gap="xs">
            {data?.service_types?.map((service: any) => (
              <Badge
                key={service?.id}
                size="sm"
                radius="xl"
                variant="outline"
                color="blue"
              >
                {service?.subcategory}
              </Badge>
            ))}
          </Group>
        </Box>

        <Box className="mt-4 pt-4 border-t">
          <Group ps="apart" align="center">
            <Group gap={4}>
              <Text size="xl" fw={700} className="text-blue-500">
                ${data?.hourly_rate}
              </Text>
              <Text size="sm" color="dimmed">
                /hr
              </Text>
            </Group>
          </Group>
        </Box>

        <Flex justify={"space-between"} mt={"sm"}>
          <button
            className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse w-fit"
            onClick={() => router.push(`/booking/${data?.id}`)}
          >
            <span className="text-[#46A7B0] md:text-md sm:text-base">B</span>
            <span className="md:text-xl sm:text-base">ook</span>
            &nbsp;
            <span className="text-[#46A7B0] md:text-md sm:text-base">S</span>
            <span className="md:text-xl sm:text-base">ession</span>
          </button>
          <button
            className="font-bold Poppins-font border-b-2 border-[#46A7B0] text-black animate-pulse"
            onClick={() => router.push(`/therapist/detail/${data?.id}`)}
          >
            <span className="text-[#46A7B0] md:text-md sm:text-base">V</span>
            <span className="md:text-xl sm:text-base">iew</span>
            &nbsp;
            <span className="text-[#46A7B0] md:text-md sm:text-base">P</span>
            <span className="md:text-xl sm:text-base">rofile</span>
          </button>
        </Flex>
      </Box>
    </Card>
  );
};

const FilterSection = ({
  setTherapistData,
  currentPage,
  setTotalPages,
  setCurrentPage,
}: any) => {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [countriesAndCities, setCountriesAndCities] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]); // Fixed TypeScript issue

  const [categories, setCategories] = useState<string[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    []
  );
  const [categoriesAndServices, setCategoriesAndServices] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: countriesData, error: countriesError } = await supabase
          .from("location_country")
          .select("id, country");

        const { data: citiesData, error: citiesError } = await supabase
          .from("location_city")
          .select("city, country_id");

        if (countriesError || citiesError)
          throw new Error("Failed to fetch locations");

        const countriesAndCitiesMap: Record<string, string[]> = {};
        countriesData.forEach((country: { id: string; country: string }) => {
          countriesAndCitiesMap[country.country] = citiesData
            .filter(
              (city: { country_id: string }) => city.country_id === country.id
            )
            .map((city: { city: string }) => city.city);
        });

        setCountriesAndCities(countriesAndCitiesMap);
        setCountries(Object.keys(countriesAndCitiesMap));

        const { data: categoriesData, error: categoriesError } = await supabase
          .from("service_category")
          .select("id, category");

        const { data: serviceTypesData, error: serviceTypesError } =
          await supabase
            .from("service_type")
            .select("subcategory, category_id");

        if (categoriesError || serviceTypesError)
          throw new Error("Failed to fetch services");

        const categoriesAndServicesMap: Record<string, string[]> = {};
        categoriesData.forEach((category: { id: string; category: string }) => {
          categoriesAndServicesMap[category.category] = serviceTypesData
            .filter(
              (serviceType: { category_id: string }) =>
                serviceType.category_id === category.id
            )
            .map(
              (serviceType: { subcategory: string }) => serviceType.subcategory
            );
        });

        setCategoriesAndServices(categoriesAndServicesMap);
        setCategories(Object.keys(categoriesAndServicesMap));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const country = params.get("country");
    if (country) {
      setSelectedCountry(country);
      setCities(countriesAndCities[country] || []);
    }

    const citiesParam = params.get("cities");
    if (citiesParam) {
      setSelectedCities(citiesParam.split(","));
    }

    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
      setServiceTypes(categoriesAndServices[category] || []);
    }

    const serviceTypesParam = params.get("serviceTypes");
    if (serviceTypesParam) {
      setSelectedServiceTypes(serviceTypesParam.split(","));
    }

    const priceRangeParam = params.get("priceRange");
    if (priceRangeParam) {
      const [minPrice, maxPrice] = priceRangeParam.split(",").map(Number);
      setPriceRange([minPrice || 0, maxPrice || 300]);
    }
  }, [searchParams, countriesAndCities, categoriesAndServices]);

  const handleCountryChange = (countryName: string | null) => {
    setSelectedCountry(countryName);
    setSelectedCities([]);
    if (countryName) {
      setCities(countriesAndCities[countryName]);

      const params = new URLSearchParams(searchParams.toString());
      params.set("country", countryName);
      router.push(`?${params.toString()}`);
    } else {
      setCities([]);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("country");
      router.push(`?${params.toString()}`);
    }
  };

  const handleCitiesChange = (cities: string[]) => {
    setSelectedCities(cities);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (cities.length > 0) {
      params.set("cities", cities.join(","));
    } else {
      params.delete("cities");
    }
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setSelectedServiceTypes([]);
    if (categoryName) {
      setServiceTypes(categoriesAndServices[categoryName]);

      const params = new URLSearchParams(searchParams.toString());
      params.set("category", categoryName);
      router.push(`?${params.toString()}`);
    } else {
      setServiceTypes([]);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("category");
      router.push(`?${params.toString()}`);
    }
  };

  const handleServiceTypesChange = (serviceTypes: string[]) => {
    setSelectedServiceTypes(serviceTypes);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (serviceTypes.length > 0) {
      params.set("serviceTypes", serviceTypes.join(","));
    } else {
      params.delete("serviceTypes");
    }
    router.push(`?${params.toString()}`);
  };

  const PAGE_SIZE = 6;

  useEffect(() => {
    const fetchTherapists = async () => {
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      try {
        const { data, count, error } = await supabase.rpc(
          "get_filtered_therapists",
          {
            selected_cities: selectedCities.length > 0 ? selectedCities : null,
            selected_services:
              selectedServiceTypes.length > 0 ? selectedServiceTypes : null,
            min_price: priceRange[0],
            max_price: priceRange[1],
            page_size: PAGE_SIZE,
            page_offset: 0,
          }
        );

        if (error) {
          console.error("Error fetching therapists:", error);
          return;
        }

        setTherapistData(data || []);
        setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
      } catch (error) {
        console.error("Error in fetchTherapists:", error);
      }
    };

    fetchTherapists();
  }, [selectedCities, selectedServiceTypes, priceRange, currentPage]);

  return (
    <Stack gap="xl">
      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Location</Title>
          <Select
            label="Country"
            placeholder="Select country"
            data={countries}
            value={selectedCountry}
            onChange={handleCountryChange}
            searchable
          />
          <MultiSelect
            label="Cities"
            placeholder="Select cities"
            data={cities}
            value={selectedCities}
            onChange={handleCitiesChange}
            searchable
            disabled={!selectedCountry}
          />
        </Stack>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Service</Title>
          <Select
            label="Category"
            placeholder="Select category"
            data={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
            searchable
          />
          <MultiSelect
            label="Service Types"
            placeholder="Select service types"
            data={serviceTypes}
            value={selectedServiceTypes}
            onChange={handleServiceTypesChange}
            searchable
            disabled={!selectedCategory}
          />
        </Stack>
      </Paper>

      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Title order={4}>Price Range (per hour)</Title>
          <RangeSlider
            min={0}
            max={300}
            step={10}
            label={(value) => `$${value}`}
            value={priceRange}
            onChange={(value: [number, number]) => {
              setPriceRange(value);
              const params = new URLSearchParams(searchParams.toString());
              params.set("priceRange", value.join(","));
              router.push(`?${params.toString()}`);
            }}
            marks={[
              { value: 0, label: "$0" },
              { value: 150, label: "$150" },
              { value: 300, label: "$300" },
            ]}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

const TherapistList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [therapistData, setTherapistData] = useState([]);
  const [totalTherapists, setTotalTherapists] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group ps="apart" align="center">
          <Stack gap={4}>
            <Title order={1}>Find Your Perfect Therapist</Title>
          </Stack>
        </Group>

        <Grid gutter="50">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <FilterSection
              setTherapistData={setTherapistData}
              therapistData={therapistData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalTherapists={totalTherapists}
              setTotalTherapists={setTotalTherapists}
              setTotalPages={setTotalPages}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Stack gap="md">
              <SimpleGrid cols={3}>
                {therapistData?.map((therapist: any) => (
                  <TherapistCard key={therapist.id} data={therapist} />
                ))}
              </SimpleGrid>

              <Flex justify={"center"} w={"100%"} mt={"sm"}>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  size="md"
                  radius="md"
                  withEdges
                />
              </Flex>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default TherapistList;
