"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { ResumeManagement } from "@/app/components/resume-management";
import { createClient } from "@/app/utils/supabase/client";
import { supabase } from "@/supabase";
import {
  Avatar,
  Box,
  Button,
  Container,
  FileInput,
  Flex,
  Group,
  Loader,
  Modal,
  NumberInput,
  Paper,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Dropzone } from "@mantine/dropzone";
import {
  IconCamera,
  IconDownload,
  IconEdit,
  IconFile,
  IconPdf,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { PDFDocumentProxy, PDFPageProxy, RenderTask } from "pdfjs-dist";
import { useRouter } from "next/navigation";

interface ResumeFile {
  name: string;
  url: string;
  updatedAt: string;
}

export default function GeneralProfileSignUp() {
  const { userInfo, setUserInfo } = useAuthStore();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [hourlyRate, setHourlyRate] = useState<any>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [summary, setSummary] = useState("");
  const [value, setValue] = useState<Date | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");

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

      setAvatarUrl(publicUrl);
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
        avatar_url: avatarUrl || userInfo?.avatar_url,
        resume_url: resumeUrl || userInfo?.resume_url,
        step: "services",
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
    // handlequery();
    router.push("/therapist/signup/services");
  };

  const supabase = createClient();
  const [existingResume, setExistingResume] = useState<ResumeFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    try {
      setUploading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/resume-${Date.now()}.${fileExt}`;

      if (existingResume) {
        await supabase.storage
          .from("resume")
          .remove([`${user.id}/${existingResume.name}`]);
      }

      const { error: uploadError } = await supabase.storage
        .from("resume")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("resume").getPublicUrl(fileName);

      setResumeUrl(publicUrl);

      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to upload resume and save information");
    } finally {
      setUploading(false);
    }
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  useEffect(() => {
    if (userInfo?.resume_url || existingResume?.url) {
      let isCancelled = false;

      (async function () {
        const pdfJS = await import("pdfjs-dist");

        pdfJS.GlobalWorkerOptions.workerSrc =
          window.location.origin + "/pdf.worker.min.mjs";

        const pdf: PDFDocumentProxy = await pdfJS.getDocument(
          userInfo?.resume_url || existingResume?.url
        ).promise;

        const page: PDFPageProxy = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Canvas element not found");
          return;
        }

        const canvasContext = canvas.getContext("2d");
        if (!canvasContext) {
          console.error("Could not get 2D context");
          return;
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (renderTaskRef.current) {
          await renderTaskRef.current.promise;
        }

        const renderContext = {
          canvasContext,
          viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        try {
          await renderTask.promise;
        } catch (error) {
          if (
            error instanceof Error &&
            error.name === "RenderingCancelledException"
          ) {
            console.log("Rendering cancelled.");
          } else {
            console.error("Render error:", error);
          }
        }

        if (!isCancelled) {
          console.log("Rendering completed");
        }
      })();

      return () => {
        isCancelled = true;
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }
      };
    }
  }, [existingResume, viewModalOpen]);

  //   if (loading) {
  //     return (
  //       <Stack align="center" gap="md">
  //         <Loader />
  //         <Text>Loading resume information...</Text>
  //       </Stack>
  //     );
  //   }

  return (
    <Container size="md" py="xl">
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
                color="initials"
                alt="Profile Avatar"
                name={userInfo?.name || name}
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
                prefix="$"
                value={hourlyRate}
                defaultValue={userInfo?.hourly_rate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
              <TextInput
                label="Full Name"
                placeholder="Your name"
                // value={name}
                defaultValue={userInfo?.name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>
          </Flex>
          <TextInput
            label="Phone"
            placeholder="Your phone number"
            // value={phone}
            defaultValue={userInfo?.phone || ""}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextInput
            label="Location"
            placeholder="Your location"
            // value={location}
            defaultValue={userInfo?.location || ""}
            onChange={(e) => setLocation(e.target.value)}
          />
          <DatePickerInput
            label="Birthday"
            placeholder="Pick date"
            // value={value}
            defaultDate={userInfo?.birthday || ""}
            onChange={(value) => setValue(value)}
          />
          <Textarea
            label="Professional Summary"
            placeholder="Write a brief description about yourself"
            maxRows={100}
            rows={7}
            // value={summary}
            defaultValue={userInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Stack>
        <Stack gap="md" mt={"md"}>
          <Text size="lg" fw={500}>
            Only CV
          </Text>
          {userInfo?.resume_url ? (
            <Stack gap="sm">
              <Group ps="apart">
                <Group>
                  <IconPdf size={20} />
                  <Text>My Resume</Text>
                </Group>
                <Text size="xs" color="dimmed">
                  Last updated:{" "}
                  {/* {new Date(existingResume.updatedAt).toLocaleDateString()} */}
                </Text>
              </Group>

              <Flex gap={"sm"} align={"center"}>
                <Button
                  leftSection={<IconDownload size={14} />}
                  variant="light"
                  // component="a"
                  // href={existingResume.url}
                  // target="_blank"
                  color="blue"
                  onClick={() => setViewModalOpen(true)}
                >
                  View Resume
                </Button>
                <Button
                  leftSection={<IconEdit size={14} />}
                  variant="light"
                  color="green"
                  onClick={() => setUpdateModalOpen(true)}
                >
                  Update Resume
                </Button>
              </Flex>
            </Stack>
          ) : (
            <Dropzone
              onDrop={handleUpload}
              loading={uploading}
              accept={[
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]}
              maxSize={5 * 1024 ** 2}
            >
              <Group
                ps="center"
                justify="center"
                gap={0}
                style={{ minHeight: 120, pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload size={24} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={24} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconFile size={24} stroke={1.5} />
                </Dropzone.Idle>

                <Stack gap={0} align="center">
                  <Text size="sm" inline>
                    Drag your resume here or click to select
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach your resume in PDF, DOC, or DOCX format (max 5MB)
                  </Text>
                </Stack>
              </Group>
            </Dropzone>
          )}

          <Modal
            opened={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            title="Update Resume"
            size="lg"
          >
            <Dropzone
              onDrop={handleUpload}
              loading={uploading}
              accept={[
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]}
              maxSize={5 * 1024 ** 2}
            >
              <Group
                ps="center"
                gap="xl"
                style={{ minHeight: 120, pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload size={50} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={50} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconFile size={50} stroke={1.5} />
                </Dropzone.Idle>

                <Stack gap={0} align="center">
                  <Text size="xl" inline>
                    Drag new resume here or click to select
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach your resume in PDF, DOC, or DOCX format (max 5MB)
                  </Text>
                </Stack>
              </Group>
            </Dropzone>
          </Modal>

          <Modal
            opened={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="View Resume"
            size="lg"
          >
            <canvas
              ref={canvasRef}
              style={{ height: "100vh", width: "100%" }}
            />
          </Modal>
        </Stack>
        <Button
          fullWidth
          color="teal"
          mt="md"
          loading={profileLoading}
          onClick={() => handleProfileUpdate()}
        >
          Submit Information
        </Button>
      </Paper>
    </Container>
  );
}
