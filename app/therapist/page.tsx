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
  NumberInput,
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
  IconCreditCard,
  IconCamera,
  IconEdit,
  IconTrash,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useAuthStore } from "../_store/authStore";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { userInfo } from "os";

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
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

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

  const [selected, setSelected] = useState<Service[]>([]);

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
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subCategories, setSubCategories] = useState<ServiceType[]>([]);
  const [availability, setAvailability] = useState<string>("");

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

      console.log("=========", data);

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

  const handleDateSelect = (date: any) => {
    setValue(date);
    setSelectedDate(date);
    // onDateOpen();
  };

  const handleSaveSchedule = async () => {
    if (!selectedDate || !userInfo || !availability) return;

    try {
      if (availability === "available") {
        const { error } = await supabase.from("service_available_time").insert([
          {
            available_time: selectedDate.toString(),
            user_id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            created_at: new Date(),
          },
        ]);
        if (error) {
          toast.error("Failed to save schedule.");
          return;
        }
        toast.success("Schedule saved successfully.");
      }
      //   onDateOpenChange();
      setAvailability("");
    } catch (error) {
      toast.error("An error occurred while saving schedule.");
    }
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

  //for Avatar Upload to supabase
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

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
        .from("users")
        .update({ avatar_url: publicUrl })
        .eq("email", userInfo.email);

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

  return (
    <Container size="xl" py="xl">
      <Paper
        radius="md"
        p="xl"
        mb="xl"
        bg="var(--mantine-color-teal-6)"
        c="white"
      >
        <Group align="flex-start">
          <Stack gap="xs">
            <Title order={1}>Welcome, Test_therapist</Title>
            <Text size="lg">
              Manage your schedule and services all in one place
            </Text>
            <Button
              variant="white"
              color="teal"
              size="md"
              mt="md"
              style={{ width: "fit-content" }}
            >
              View Schedule
            </Button>
          </Stack>
        </Group>
      </Paper>

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
                  <NumberInput
                    label="Hourly Rate ($)"
                    placeholder="Enter your rate"
                    defaultValue={0}
                    min={0}
                    prefix="$"
                    hideControls
                  />
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    defaultValue="Test_therapist"
                  />
                </Stack>
              </Flex>
              <TextInput
                label="Phone"
                placeholder="Your phone number"
                defaultValue={userInfo?.phone || ""}
              />
              <Select
                label="Location"
                placeholder="Select your location"
                defaultValue="US"
                data={[
                  { value: "US", label: "United States" },
                  { value: "CA", label: "Canada" },
                ]}
              />
              <DatePickerInput
                label="Birthday"
                placeholder="Pick date"
                value={value}
                onChange={setValue}
              />
              <Textarea
                label="Professional Summary"
                placeholder="Write a brief description about yourself"
                maxRows={100}
                rows={7}
                defaultValue={userInfo?.summary || ""}
              />
            </Stack>
            <Button fullWidth color="teal" mt="md" loading={loading}>
              Update Information
            </Button>
          </Paper>
          <ChangePasswordComponent />
          <Suspense>
            <PaymentComponent />
          </Suspense>
          {/* <Elements stripe={stripePromise}>
          </Elements> */}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" radius="md" p="xl" mb="xl" withBorder>
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
          </Paper>

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
        </Grid.Col>
      </Grid>
    </Container>
  );
}

const ChangePasswordComponent = () => {
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
  const { userInfo, setUserInfo } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleInsertCard = async () => {
    console.log("---------", searchParams.get("account_id"));
    try {
      setLoading(true);

      const { data: selectCardData, error: selectCardError } = await supabase
        .from("credit_card")
        .select()
        .eq("account_id", searchParams.get("account_id"))
        .eq("user_id", userInfo?.id);

      if (selectCardError) {
        console.error(selectCardError);
        throw new Error("Failed to fetch existing card data.");
      }

      if (selectCardData.length > 0) {
        toast.warn("You created account already!");
        return;
      }

      const { error: insertCardError } = await supabase
        .from("credit_card")
        .insert({
          account_id: searchParams.get("account_id"),
          user_id: userInfo?.id,
        });

      if (insertCardError) {
        console.error(insertCardError);
        throw new Error("Failed to insert new card.");
      }
      const { data: userUpdateData, error: userUpdateError } = await supabase
        .from("users")
        .update({ card_status: "true" })
        .eq("id", userInfo?.id)
        .select();
      if (userUpdateError) {
        console.error(userUpdateError);
        throw new Error("Failed to update user card status.");
      }
      setUserInfo(userUpdateData[0]);
      toast.success("Created your account successfully!");
    } catch (error) {
      console.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
      router.push("/therapist");
    }
  };

  const createStripeAccount = async () => {
    try {
      const response = await fetch("/api/create-express-account", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe account");
      }

      const data = await response.json();
      if (data) {
        try {
          const response = await fetch("/api/create-account-link", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              connectedAccountId: data.account.id,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create account link");
          }

          const accountLinkResponse = await response.json();
          console.log("Account link created:", accountLinkResponse.accountLink);
          toast.success("You create stripe account link successfully.");
          toast.success("Please complete your account now");

          window.location.href = accountLinkResponse.accountLink?.url;
        } catch (error) {
          console.error("Error creating account link:", error);
          toast.error("An error occurred while creating the account link.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the account.");
    }
  };

  useEffect(() => {
    if (
      userInfo?.card_status === "false" &&
      userInfo?.id &&
      searchParams.get("account_id")
    ) {
      handleInsertCard();
    }
  }, [userInfo]);

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
      <Stack gap="md">
        {/* <div style={{ border: "1px solid black", padding: "5px 10px" }}>
          <CardNumberElement
            options={{ showIcon: true, iconStyle: "default" }}
          />
        </div>
        <Group grow>
          <CardExpiryElement />
          <CardCvcElement />
        </Group> */}
      </Stack>
      {userInfo?.card_status === "false" && (
        <Button color="green" variant="light" loading={loading}>
          Create Stripe Account
        </Button>
      )}
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
    <Paper shadow="sm" radius="md" p="xl">
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
                  <Flex justify={"space-between"} align={"center"} mb="xs">
                    <Text fw={500}>{service.category}</Text>
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
