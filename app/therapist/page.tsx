"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Text,
  Title,
  Button,
  TextInput,
  Select,
  Textarea,
  Card,
  Group,
  ActionIcon,
  Stack,
  Badge,
  Avatar,
  PasswordInput,
  Flex,
  Menu,
  Loader,
  Modal,
} from "@mantine/core";
import { DatePicker, DatePickerInput, DateValue } from "@mantine/dates";
import {
  IconPlus,
  IconDotsVertical,
  IconCamera,
  IconEdit,
  IconTrash,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useAuthStore } from "../_store/authStore";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { createClient } from "../utils/supabase/client";
import { ResumeManagement } from "../components/resume-management";
import TherapistScheduleComponent from "../components/therapist/ScheduleComponent";
import DocumentComponent from "../components/therapist/DocumentComponent";
import CustomerBooking from "./availability";
import TherapistAvailability from "./TherapistAvailability";
import TherapistReview from "./reviews/TherapistReview";

interface Service {
  category: string;
  subcategory: string;
  description: string;
}

interface ServiceType {
  id: number;
  name: string;
  subcategory: string;
}

export default function TherapistDashboard() {
  const supabase = createClient();
  const { userInfo, setUserInfo } = useAuthStore();
  const [openedAddService, { open: openAddService, close: closeAddService }] =
    useDisclosure(false);
  const [
    openedEditService,
    { open: openEditService, close: closeEditService },
  ] = useDisclosure(false);

  const Categorys = [
    { value: "1", label: "Massage" },
    { value: "2", label: "Beauty Treatment" },
    { value: "3", label: "Personal Training" },
  ];

  const [value, setValue] = useState<any>(
    dayjs(new Date().toISOString().split("T")[0])
  );
  const [hourlyRate, setHourlyRate] = useState<any>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [newService, setNewService] = useState({
    service_type_id: "",
    description: "",
  });
  const [editingService, setEditingService] = useState<{
    index: number;
    service: Service;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<ServiceType[]>([]);

  //for Avatar Upload to supabase
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [profileLoading, setProfileLoading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !userInfo?.email) return;

    try {
      setUploading(true);

      if (avatarUrl) {
        const oldFilePath = avatarUrl.split("/").pop();
        if (oldFilePath) {
          await supabase.storage
            .from("avatars")
            .remove([`avatars/${oldFilePath}`]);
        }
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${userInfo.email}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from(
          userInfo?.role === "therapist" ? "therapist_list" : "customers_list"
        )
        .update({ avatar_url: publicUrl })
        .eq("id", userInfo?.id);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl + "?t=" + new Date().getTime());
      setUserInfo({
        ...userInfo,
        avatar_url: publicUrl + "?t=" + new Date().getTime(),
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to update profile avatar.");
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setProfileLoading(true);
    const { data, error } = await supabase
      .from("therapist_list")
      .update({
        name: name || userInfo?.name,
        hourly_rate: hourlyRate || userInfo?.hourly_rate,
        phone: phone || userInfo?.phone,
        location: location || userInfo?.location,
        summary: summary || userInfo?.summary,
        birthday: value || userInfo?.birthday,
      })
      .eq("id", userInfo?.id)
      .select();
    if (error) {
      console.log("error", error);
      toast.error("Failed to update profile");
    }
    if (data) {
      setUserInfo(data[0]);
      toast.success("Successful to update profile");
    }
    setProfileLoading(false);
    handlequery();
  };

  const getCategoryLabel = (categoryId: number) => {
    const category = Categorys.find(
      (cat: any) => Number(cat.value) === categoryId
    );
    return category ? category.label : "";
  };

  const handleCreateService = async () => {
    if (
      newService.service_type_id &&
      newService.description &&
      userInfo?.email
    ) {
      try {
        const { data: serviceTypeData, error: serviceTypeError } =
          await supabase
            .from("service_type")
            .select("*")
            .eq("id", newService.service_type_id)
            .single();

        if (serviceTypeError) {
          console.log(serviceTypeError);
          return;
        }

        const { error } = await supabase.from("services").insert([
          {
            name: userInfo?.name,
            email: userInfo.email,
            service_type_id: serviceTypeData.id,
            service_description: newService.description,
            user_id: userInfo?.id,
            created_at: new Date(),
          },
        ]);

        if (error) {
          toast.error("Failed to create service.");
          return;
        }

        const newServiceObj = {
          description: newService.description,
          category: getCategoryLabel(parseInt(selectedCategory)),
          subcategory: serviceTypeData.subcategory,
        };
        setServices([...services, newServiceObj]);

        setNewService({ service_type_id: "", description: "" });
        closeAddService();
        toast.success("Service created successfully.");
      } catch (error) {
        toast.error("An error occurred while creating the service.");
      }
    }
  };

  const handleDeleteService = async (index: number) => {
    if (!userInfo?.email) return;

    try {
      const serviceToDelete = services[index];
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("email", userInfo.email)
        .eq("service_description", serviceToDelete.description)
        .single();

      if (error) {
        toast.error("Failed to delete service.");
        return;
      }

      const updatedServices = services.filter((_, i) => i !== index);
      setServices(updatedServices);
      toast.success("Service deleted successfully.");
    } catch (error) {
      toast.error("An error occurred while deleting the service.");
    }
  };

  const handleEditClick = async (index: number, service: Service) => {
    setEditingService({ index, service });
    const categoryKey =
      Categorys.find(
        (cat) => cat.label === service.category
      )?.value.toString() || "";
    setSelectedCategory(categoryKey);

    try {
      const { data, error } = await supabase
        .from("service_type")
        .select("*")
        .eq("category_id", Number(categoryKey));

      if (error) {
        toast.error("Failed to fetch subcategories.");
        return;
      }

      setSubCategories(data || []);

      const serviceType = data?.find(
        (item: ServiceType) => item.subcategory === service.subcategory
      );

      if (serviceType) {
        setNewService({
          service_type_id: serviceType.id.toString(),
          description: service.description,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch subcategories.");
    }

    openEditService();
  };

  const handleUpdateService = async () => {
    if (editingService && newService.description && userInfo?.email) {
      try {
        const { data: serviceTypeData } = await supabase
          .from("service_type")
          .select("*")
          .eq("id", newService.service_type_id)
          .single();

        const { error } = await supabase
          .from("services")
          .update({
            service_type_id: serviceTypeData.id,
            service_description: newService.description,
          })
          .eq("email", userInfo.email)
          .eq("service_description", editingService.service.description);

        if (error) {
          console.log("error", error);
          return;
        }

        const updatedService = {
          description: newService.description,
          category: getCategoryLabel(parseInt(selectedCategory)),
          subcategory: serviceTypeData.subcategory,
        };

        const updatedServices = [...services];
        updatedServices[editingService.index] = updatedService;
        setServices(updatedServices);

        setNewService({ service_type_id: "", description: "" });
        setEditingService(null);
        closeEditService();
        toast.success("Service updated successfully.");
      } catch (error) {
        console.log(error);
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

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      if (userInfo?.email) {
        try {
          const { data: servicesData, error } = await supabase
            .from("services")
            .select(
              `
                service_description,
                service_type (
                  category_id,
                  subcategory
                )
              `
            )
            .eq("email", userInfo.email);
          if (!error && servicesData) {
            const formattedServices = servicesData.map((service: any) => ({
              description: service.service_description,
              category: getCategoryLabel(
                Number(service.service_type.category_id)
              ),
              subcategory: service.service_type.subcategory,
            }));
            setServices(formattedServices);
          }
        } catch (error) {
          toast.error("Failed to fetch services.");
        }
      }
      setLoading(false);
    };

    fetchServices();
  }, [userInfo?.email]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        try {
          const { data, error } = await supabase
            .from("service_type")
            .select("*")
            .eq("category_id", selectedCategory);
          if (error) {
            toast.error("Failed to fetch subcategories.");
            return;
          }
          setSubCategories(data || []);
        } catch (error) {
          toast.error("An error occurred while fetching subcategories.");
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategory]);

  return (
    <Container size="xl" py="xl">
      <TherapistScheduleComponent />
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
            <Title order={3} mb="lg">
              General Information
            </Title>
            <Stack gap="md">
              <Flex gap={"xl"} align={"center"}>
                <div
                  className="relative group cursor-pointer w-fit"
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    size={140}
                    src={avatarUrl || userInfo?.avatar_url}
                    name={userInfo?.name || ""}
                    color="initials"
                    alt="Profile Avatar"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconCamera className="w-8 h-8 text-white" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <Stack w={"100%"}>
                  <TextInput
                    label="Hourly Rate ($)"
                    placeholder="Enter your rate"
                    defaultValue={userInfo?.hourly_rate || 0}
                    prefix="$"
                    onChange={(e) => setHourlyRate(e.target.value)}
                  />
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    defaultValue={userInfo?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Stack>
              </Flex>
              <TextInput
                label="Phone"
                placeholder="Your phone number"
                defaultValue={userInfo?.phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextInput
                label="Location"
                placeholder="Your location"
                defaultValue={userInfo?.location || ""}
                onChange={(e) => setLocation(e.target.value)}
              />
              <DatePickerInput
                label="Birthday"
                placeholder="Pick date"
                // value={value}
                valueFormat="YYYY-MM-DD"
                defaultValue={
                  userInfo?.birthday ? new Date(userInfo.birthday) : null
                }
                onChange={setValue}
              />
              <Textarea
                label="Professional Summary"
                placeholder="Write a brief description about yourself"
                maxRows={100}
                rows={7}
                defaultValue={userInfo?.summary || ""}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Stack>
            <Button
              fullWidth
              color="teal"
              mt="md"
              loading={profileLoading}
              onClick={() => handleProfileUpdate()}
            >
              Update Information
            </Button>
          </Paper>
          <ChangePasswordComponent />
          <Suspense>
            <PaymentComponent />
          </Suspense>
          <Paper shadow="sm" radius="md" mt="xl" withBorder>
            <DocumentComponent />
          </Paper>
          {/* <CustomerBooking /> */}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
            <ResumeManagement />
          </Paper>
          {/* <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
            <DatePicker
              //   value={selectedDate}
              //   onChange={setSelectedDate}
              //   fullWidth
              minDate={new Date()}
              styles={{
                month: {
                  width: "100%",
                },
                calendarHeader: {
                  marginInline: "auto",
                },
              }}
            />
          </Paper> */}

          <ServicesComponent
            loading={loading}
            services={services}
            handleEditClick={handleEditClick}
            handleDeleteService={handleDeleteService}
            openedEditService={openedEditService}
            closeEditService={closeEditService}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            Categorys={Categorys}
            newService={newService}
            subCategories={subCategories}
            setNewService={setNewService}
            handleUpdateService={handleUpdateService}
            openedAddService={openedAddService}
            closeAddService={closeAddService}
            handleCreateService={handleCreateService}
            openAddService={openAddService}
          />

          <TherapistReview />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

const ChangePasswordComponent = () => {
  const supabase = createClient();
  const passwordform = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
          ? null
          : "Password must include uppercase, lowercase, and a number",
      confirmPassword: (value, values) =>
        value === "" && value !== values.password
          ? "Passwords did not match"
          : null,
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (values: any) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      toast.error(error?.message);
      passwordform.initialize({ password: "", confirmPassword: "" });
      setLoading(false);
      return;
    }

    passwordform.initialize({ password: "", confirmPassword: "" });
    setLoading(false);
    toast.success("Successfully changed password!");
  };

  return (
    <form
      onSubmit={passwordform.onSubmit((values) => handleChangePassword(values))}
    >
      <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
        <Title order={3} mb="lg">
          Change Password
        </Title>
        <Stack gap="md">
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            key={passwordform.key("password")}
            {...passwordform.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            key={passwordform.key("confirmPassword")}
            {...passwordform.getInputProps("confirmPassword")}
          />
          <Button color="teal" mt="md" loading={loading} type="submit">
            Update Password
          </Button>
        </Stack>
      </Paper>
    </form>
  );
};

const PaymentComponent = () => {
  const { userInfo } = useAuthStore();

  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder>
      <Flex
        gap={"sm"}
        align={"center"}
        mb={userInfo?.card_status === "false" ? "lg" : ""}
        justify={"space-between"}
      >
        <Title order={3}>Payment</Title>
        {userInfo?.card_status === "true" && (
          <Text color="green" className="flex gap-2" fw={600}>
            Verified
            <IconCircleCheck size={"1.2rem"} color="green" />
          </Text>
        )}
      </Flex>
    </Paper>
  );
};

const ServicesComponent = ({
  loading,
  services,
  handleEditClick,
  handleDeleteService,
  openedEditService,
  closeEditService,
  selectedCategory,
  setSelectedCategory,
  Categorys,
  newService,
  subCategories,
  setNewService,
  handleUpdateService,
  openedAddService,
  closeAddService,
  handleCreateService,
  openAddService,
}: any) => {
  return (
    <Paper shadow="sm" radius="md" p="xl" withBorder>
      <Flex justify={"space-between"} mb="lg">
        <Title order={3}>My Services</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          color="green"
          onClick={openAddService}
        >
          Add Service
        </Button>
      </Flex>

      <Stack gap="md">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader size={"sm"} color="green" />
          </div>
        ) : (
          <>
            {services.map((service: any, index: number) => {
              return (
                <Card withBorder padding="md" key={index}>
                  <Flex
                    justify={"space-between"}
                    wrap={"nowrap"}
                    align={"center"}
                    mb="xs"
                  >
                    <Text fw={500} className="text-wrap" lineClamp={3}>
                      {service.category}
                    </Text>
                    <Menu
                      shadow="md"
                      width={150}
                      position="bottom-end"
                      offset={2}
                      withArrow
                    >
                      <Menu.Target>
                        <ActionIcon variant="transparent" color="green">
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<IconEdit size={14} />}
                          onClick={() => handleEditClick(index, service)}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={<IconTrash size={14} />}
                          onClick={() => handleDeleteService(index)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>
                  <Text size="sm" c="dimmed" mb="xs">
                    {service.description}
                  </Text>

                  <Badge color="green" variant="light">
                    {service.subcategory}
                  </Badge>
                </Card>
              );
            })}
          </>
        )}
      </Stack>
      <Modal
        opened={openedEditService}
        onClose={closeEditService}
        title="Edit service"
      >
        <Select
          w={"100%"}
          mt={"sm"}
          label="Category"
          value={selectedCategory}
          data={Categorys}
          onChange={(value: any) => setSelectedCategory(value)}
        />
        {selectedCategory && (
          <Select
            w={"100%"}
            mt={"sm"}
            label="SubCategory"
            value={newService.service_type_id}
            data={subCategories.map((item: any) => ({
              value: item?.id.toString(),
              label: item?.subcategory,
            }))}
            onChange={(value: any) =>
              setNewService({
                ...newService,
                service_type_id: value,
              })
            }
          />
        )}

        <Textarea
          name="description"
          id="description"
          label="Description"
          w={"100%"}
          mt={"sm"}
          rows={4}
          value={newService.description}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            })
          }
        />
        <Flex gap={"sm"} justify={"end"} mt={"md"}>
          <Button variant="outline" color="red" onClick={closeEditService}>
            Close
          </Button>
          <Button variant="light" color="green" onClick={handleUpdateService}>
            Update Service
          </Button>
        </Flex>
      </Modal>
      <Modal
        opened={openedAddService}
        onClose={closeAddService}
        title="Create a service"
      >
        <Select
          w={"100%"}
          mt={"sm"}
          label="Category"
          data={Categorys}
          onChange={(value: any) => setSelectedCategory(value)}
        />
        {selectedCategory && (
          <Select
            w={"100%"}
            mt={"sm"}
            label="SubCategory"
            data={subCategories.map((item: any) => ({
              value: item?.id.toString(),
              label: item?.subcategory,
            }))}
            onChange={(value: any) =>
              setNewService({
                ...newService,
                service_type_id: value,
              })
            }
          />
        )}

        <Textarea
          name="description"
          id="description"
          label="Description"
          w={"100%"}
          mt={"sm"}
          rows={4}
          value={newService.description}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            })
          }
        />
        <Flex gap={"sm"} justify={"end"} mt={"md"}>
          <Button variant="outline" color="red" onClick={closeAddService}>
            Close
          </Button>
          <Button variant="light" color="green" onClick={handleCreateService}>
            Create Service
          </Button>
        </Flex>
      </Modal>
    </Paper>
  );
};
