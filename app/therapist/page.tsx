"use client";

import { Flex, Modal, Popover, Select, Textarea } from "@mantine/core";
import { useAuthStore } from "../_store/authStore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Calendar, DatePicker, DateValue } from "@mantine/dates";
import { Button, Card, Loader } from "@mantine/core";
import TherapistGeneralProfile from "../components/therapist/TherapistGeneralProfile";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import {
  IconCirclePlus,
  IconDotsVertical,
  IconEdit,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

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

export default function Therapist() {
  const { userInfo } = useAuthStore();
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
  const [loading, setLoading] = useState(true);
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
        } finally {
          setLoading(false);
        }
      }
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
    <>
      {userInfo ? (
        <div className="mx-auto flex flex-row max-w-7xl w-full py-10 gap-6">
          <div className="flex flex-col w-4/5 gap-6">
            <div className="flex w-full flex-col bg-[#46A7B0] px-10 py-6 rounded-lg gap-4 shadow-xl">
              <span className="text-white text-3xl font-bold Poppins-font">
                Welcome {userInfo?.name}
              </span>
              <span className="text-white text-xl Poppins-font">
                Let&apos;s create something amazing today—start by managing your
                schedule with ease!
              </span>
              <Button size="md" className="!text-black !bg-white !w-fit">
                Start Now
              </Button>
            </div>
            <div className="flex flex-row gap-6 w-full">
              <div className="flex w-2/5">
                <TherapistGeneralProfile />
              </div>
              <div className="w-3/5 flex border rounded-xl justify-center max-h-[730px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 shadow-xl">
                <div className="flex flex-col gap-4 items-center px-10 py-8 mb-4">
                  <span className="text-[#46A7B0] text-2xl font-bold Poppins-font">
                    My Services
                  </span>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div
                        className="flex flex-row border p-4 gap-2 items-center justify-center rounded-xl"
                        onClick={openAddService}
                      >
                        <IconCirclePlus className="w-10 h-10" />
                        <div className="flex flex-col">
                          <span className="text-black text-xl font-semibold Poppins-font">
                            Add a service
                          </span>
                          <span className="text-black text-base Poppins-font">
                            Add a service to showcase your expertise and attract
                            more clients.
                          </span>
                        </div>
                      </div>
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-2 w-full border border-[#46A7B0] rounded-xl p-4"
                        >
                          <div className="flex flex-row w-full justify-between Poppins-font items-center">
                            <div className="flex flex-row gap-2 items-end">
                              <span className="text-black font-medium text-xl">
                                {service.category}
                              </span>
                              <span className="text-black text-base">
                                {service.subcategory}
                              </span>
                            </div>
                            <Popover
                              width={200}
                              position="bottom"
                              withArrow
                              shadow="md"
                            >
                              <Popover.Target>
                                <IconDotsVertical size={"1.2rem"} />
                              </Popover.Target>
                              <Popover.Dropdown>
                                <div className="px-1 py-2 flex flex-col gap-2">
                                  <div
                                    className="flex flex-row gap-2 items-center cursor-pointer"
                                    onClick={() =>
                                      handleEditClick(index, service)
                                    }
                                  >
                                    <IconEdit className="w-4 h-4" />
                                    <span className="text-black Poppins-font">
                                      Edit
                                    </span>
                                  </div>
                                  <div
                                    className="flex flex-row gap-2 items-center cursor-pointer"
                                    onClick={() => handleDeleteService(index)}
                                  >
                                    <IconTrash className="w-4 h-4" />
                                    <span className="text-black Poppins-font">
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </Popover.Dropdown>
                            </Popover>
                          </div>
                          <span className="text-black Poppins-font text-sm items-start text-justify">
                            {service.description}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/5 Poppins-font gap-6 items-center">
            {/* <Calendar
                  value={value}
                  onChange={handleDateSelect}
                  className="rounded-lg"
                /> */}
            <Card radius={"sm"} shadow="md">
              {/* <Calendar
                getDayProps={(date) => ({
                  selected: selected.some((s) => dayjs(date).isSame(s, "date")),
                  onClick: () => handleSelect(date),
                })}
              /> */}
              <DatePicker
                key="outside"
                value={value}
                // onChange={(e) => handleDateSelect(e.target.value)}
                mx={"auto"}
                styles={{
                  month: {
                    width: "100%",
                  },
                  calendarHeader: {
                    marginInline: "auto",
                  },
                }}
              />
            </Card>
            {/* <Appointment />
                <Reviews /> */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[calc(100vh-74px)]">
          <Loader />
        </div>
      )}
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
          <Button
            className="!bg-[#46A7B0] text-white"
            onClick={handleCreateService}
          >
            Create Service
          </Button>
        </Flex>
      </Modal>
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
          <Button
            className="!bg-[#46A7B0] text-white"
            onClick={handleUpdateService}
          >
            Update Service
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
