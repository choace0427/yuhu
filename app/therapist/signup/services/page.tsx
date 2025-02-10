"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Paper,
  Title,
  Button,
  Loader,
  Card,
  Text,
  Menu,
  ActionIcon,
  Badge,
  Modal,
  Select,
  Textarea,
  Group,
  Stack,
  Grid,
  Container,
  Transition,
  Divider,
  TextInput,
  Flex,
} from "@mantine/core";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconDotsVertical,
  IconSearch,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { createClient } from "@/app/utils/supabase/client";
import { useAuthStore } from "@/app/_store/authStore";
import { useRouter } from "next/navigation";

const supabase = createClient();

// Types
interface Service {
  id: number;
  category: string;
  category_id: number;
  subcategory: string;
  service_type_id: number;
  description: string;
}

interface ServiceType {
  id: number;
  name: string;
  subcategory: string;
  category_id: number;
}

interface Category {
  value: string;
  label: string;
}

// Service Actions
async function fetchServices(email: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
      id,
      service_description,
      service_type:service_type_id (
        id,
        subcategory,
        category:category_id (
          id,
          category
        )
      )
    `
    )
    .eq("email", email);

  if (error) throw error;

  return data.map((service: any) => ({
    id: service.id,
    description: service.service_description,
    category: service.service_type.category.category,
    category_id: service.service_type.category.id,
    subcategory: service.service_type.subcategory,
    service_type_id: service.service_type.id,
  }));
}

async function createService(
  serviceData: Partial<any> & {
    email: string;
    name: string;
    user_id: string;
  }
): Promise<any> {
  const { data, error } = await supabase
    .from("services")
    .insert({
      name: serviceData.name,
      email: serviceData.email,
      service_type_id: serviceData.service_type_id,
      service_description: serviceData.description,
      user_id: serviceData.user_id,
    })
    .select(
      `
      id,
      service_description,
      service_type:service_type_id (
        id,
        subcategory,
        category:category_id (
          id,
          category
        )
      )
    `
    )
    .single();

  if (error) throw error;

  return {
    id: data.id,
    description: data.service_description,
    category: (data.service_type as any).category.category,
    category_id: (data.service_type as any).category.id,
    subcategory: (data.service_type as any).subcategory,
    service_type_id: (data.service_type as any).id,
  };
}

async function updateService(
  serviceData: Partial<any> & { email: string }
): Promise<any> {
  const { data, error } = await supabase
    .from("services")
    .update({
      service_type_id: serviceData.service_type_id,
      service_description: serviceData.description,
    })
    .eq("id", serviceData.id)
    .eq("email", serviceData.email)
    .select(
      `
      id,
      service_description,
      service_type:service_type_id (
        id,
        subcategory,
        category:category_id (
          id,
          category
        )
      )
    `
    )
    .single();

  if (error) throw error;

  return {
    id: data.id,
    description: data.service_description,
    category: (data.service_type as any).category.category,
    category_id: (data.service_type as any).category.id,
    subcategory: (data.service_type as any).subcategory,
    service_type_id: (data.service_type as any).id,
  };
}

async function deleteService(serviceId: number, email: string): Promise<void> {
  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId)
    .eq("email", email);

  if (error) throw error;
}

// ServiceForm Component
interface ServiceFormProps {
  categories: Category[];
  subCategories: ServiceType[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  newService: Partial<Service>;
  setNewService: React.Dispatch<React.SetStateAction<Partial<Service>>>;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
  loading?: boolean;
}

function ServiceForm({
  categories,
  subCategories,
  selectedCategory,
  setSelectedCategory,
  newService,
  setNewService,
  onSubmit,
  onCancel,
  submitLabel,
  loading = false,
}: ServiceFormProps) {
  return (
    <Stack gap="md">
      <Select
        label="Category"
        placeholder="Select a category"
        data={categories}
        value={selectedCategory}
        onChange={(value: any) => setSelectedCategory(value)}
      />
      {selectedCategory && (
        <Select
          label="Subcategory"
          placeholder="Select a subcategory"
          data={subCategories.map((item) => ({
            value: item.id.toString(),
            label: item.subcategory,
          }))}
          value={newService.service_type_id?.toString()}
          onChange={(value: any) =>
            setNewService({
              ...newService,
              service_type_id: Number.parseInt(value),
            })
          }
        />
      )}
      <Textarea
        label="Description"
        placeholder="Enter service description"
        minRows={4}
        value={newService.description}
        onChange={(e) =>
          setNewService({
            ...newService,
            description: e.target.value,
          })
        }
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="#46A7B0" onClick={onSubmit} loading={loading}>
          {submitLabel}
        </Button>
      </Group>
    </Stack>
  );
}

// Main ServicesComponent
export default function ServicesComponent() {
  const supabase = createClient();
  const router = useRouter();
  const { userInfo } = useAuthStore();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [newService, setNewService] = useState<any>({
    service_type_id: undefined,
    description: "",
  });
  const [editingService, setEditingService] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<any[]>([]);

  const [openedAddService, { open: openAddService, close: closeAddService }] =
    useDisclosure(false);
  const [
    openedEditService,
    { open: openEditService, close: closeEditService },
  ] = useDisclosure(false);

  const filteredServices = services.filter(
    (service) =>
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setSelectedCategory(service.category_id.toString());
    setNewService({
      service_type_id: service.service_type_id,
      description: service.description,
    });
    openEditService();
  };

  const handleDeleteService = async (serviceId: number) => {
    if (!userInfo?.email) return;
    try {
      await deleteService(serviceId, userInfo.email);
      setServices(services.filter((s) => s.id !== serviceId));
      toast.success("Service deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete service.");
    }
  };

  const handleUpdateService = async () => {
    if (editingService && newService.description && userInfo?.email) {
      try {
        const updatedService = await updateService({
          ...editingService,
          ...newService,
          email: userInfo.email,
        });
        setServices(
          services.map((s) => (s.id === updatedService.id ? updatedService : s))
        );
        closeEditService();
        toast.success("Service updated successfully.");
      } catch (error) {
        toast.error("Failed to update service.");
      }
    }
  };

  const handleCreateService = async () => {
    if (
      newService.service_type_id &&
      newService.description &&
      userInfo?.email
    ) {
      try {
        setLoading(true);
        const createdService = await createService({
          ...newService,
          email: userInfo.email,
          name: userInfo.name || "",
          user_id: userInfo.id || "",
        });
        setServices([...services, createdService]);
        setNewService({ service_type_id: undefined, description: "" });
        closeAddService();
        toast.success("Service created successfully.");
      } catch (error) {
        toast.error("Failed to create service.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlequery = async () => {
    const { data: therapist_list, error } = await supabase.rpc(
      "get_therapist",
      {
        input_therapist_id: userInfo?.id,
      }
    );

    if (error) {
      console.error("Error fetching chat members:", error);
    }
    await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/api/train-therapist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(therapist_list[0]),
    });
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmitServices = async () => {
    setSubmitLoading(true);
    const { error } = await supabase
      .from("therapist_list")
      .update({ step: "verify" })
      .eq("id", userInfo?.id);
    if (error) throw error;
    await handlequery();
    router.push("/therapist/signup/verify");
    setSubmitLoading(false);
  };

  useEffect(() => {
    const loadServices = async () => {
      if (userInfo?.email) {
        setLoading(true);
        try {
          const fetchedServices = await fetchServices(userInfo.email);
          setServices(fetchedServices);
        } catch (error) {
          toast.error("Failed to fetch services.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadServices();
  }, [userInfo?.email, supabase]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("service_category")
          .select();
        if (error) throw error;
        setCategories(
          data.map((item) => ({
            value: item.id.toString(),
            label: item.category,
          }))
        );
      } catch (error) {
        toast.error("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, [supabase]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        try {
          const { data, error } = await supabase
            .from("service_type")
            .select("*")
            .eq("category_id", selectedCategory);
          if (error) throw error;
          setSubCategories(data || []);
        } catch (error) {
          toast.error("Failed to fetch subcategories.");
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategory, supabase]);

  return (
    <Container size="lg" my="xl">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={2}>My Services</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            color="#46A7B0"
            onClick={openAddService}
          >
            Add Service
          </Button>
        </Group>

        <Divider my="md" />

        <Group justify="space-between" mb="md">
          <Text size="sm" fw={500} color="dimmed">
            {filteredServices.length} services found
          </Text>
          <TextInput
            placeholder="Search services..."
            leftSection={<IconSearch size={14} />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
        </Group>

        {loading ? (
          <Group justify="center" my="xl">
            <Loader size="lg" type="dots" />
          </Group>
        ) : (
          <Transition
            mounted={!loading}
            transition="fade"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Grid gutter="md" style={styles}>
                {filteredServices.map((service) => (
                  <Grid.Col key={service.id} span={12}>
                    <Card withBorder padding="lg" radius="md" shadow="sm">
                      <Card.Section withBorder inheritPadding py="xs">
                        <Group justify="space-between">
                          <Text fw={500} size="lg">
                            {service.category}
                          </Text>
                          <Menu
                            shadow="md"
                            width={200}
                            position="bottom-end"
                            withArrow
                          >
                            <Menu.Target>
                              <ActionIcon
                                variant="light"
                                color="#46A7B0"
                                size="lg"
                                radius={"xl"}
                              >
                                <IconDotsVertical size={16} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<IconEdit size={14} />}
                                onClick={() => handleEditClick(service)}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                color="red"
                                leftSection={<IconTrash size={14} />}
                                onClick={() => handleDeleteService(service.id)}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
                      </Card.Section>

                      <Text
                        size="sm"
                        color="dimmed"
                        mt="sm"
                        mb="md"
                        lineClamp={3}
                      >
                        {service.description}
                      </Text>

                      <Card.Section inheritPadding mt="sm" pb="md">
                        <Badge color="#46A7B0" variant="light" size="lg">
                          {service.subcategory}
                        </Badge>
                      </Card.Section>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            )}
          </Transition>
        )}
        <Flex mt={"xl"} align={"center"} gap={"xl"} justify={"end"}>
          <Button
            onClick={() => router.push("/therapist/signup/general")}
            leftSection={<IconArrowLeft size={"1rem"} />}
            variant="outline"
            color="blue"
          >
            Update Information
          </Button>
          <Button
            onClick={() => handleSubmitServices()}
            color="#46A7B0"
            loading={submitLoading}
          >
            Submit Services
          </Button>
        </Flex>
      </Paper>

      <Modal
        opened={openedEditService}
        onClose={closeEditService}
        title="Edit Service"
        size="lg"
      >
        <ServiceForm
          categories={categories}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          newService={newService}
          setNewService={setNewService}
          onSubmit={handleUpdateService}
          onCancel={closeEditService}
          submitLabel="Update Service"
        />
      </Modal>

      <Modal
        opened={openedAddService}
        onClose={closeAddService}
        title="Create a Service"
        size="lg"
      >
        <ServiceForm
          categories={categories}
          subCategories={subCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          newService={newService}
          setNewService={setNewService}
          onSubmit={handleCreateService}
          onCancel={closeAddService}
          submitLabel="Create Service"
          loading={loading}
        />
      </Modal>
    </Container>
  );
}
