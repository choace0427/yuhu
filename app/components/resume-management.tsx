"use client";

import { useEffect, useRef, useState } from "react";
import {
  Group,
  Text,
  Button,
  Stack,
  Loader,
  Paper,
  Modal,
  Flex,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
// import { notifications } from "@mantine/notifications"
import {
  IconUpload,
  IconFile,
  IconX,
  IconDownload,
  IconEdit,
  IconPdf,
} from "@tabler/icons-react";
import { createClient } from "../utils/supabase/client";
import { PDFDocumentProxy, PDFPageProxy, RenderTask } from "pdfjs-dist";
import { toast } from "react-toastify";

interface ResumeFile {
  name: string;
  url: string;
  updatedAt: string;
}

export function ResumeManagement() {
  const supabase = createClient();
  const [existingResume, setExistingResume] = useState<ResumeFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    fetchExistingResume();
  }, []);

  const fetchExistingResume = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase.storage
        .from("resume")
        .list(`${user.id}/`);

      if (error) throw error;

      if (data && data.length > 0) {
        const mostRecent = data[0];
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("resume")
          .getPublicUrl(`${user.id}/${mostRecent.name}`);

        setExistingResume({
          name: mostRecent.name,
          url: publicUrl,
          updatedAt: mostRecent.updated_at,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch existing resume");
    } finally {
      setLoading(false);
    }
  };

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

      const { data: existingTherapist, error: fetchError } = await supabase
        .from("therapist_list")
        .select("id")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      const resumeData = {
        user_id: user.id,
        resume_file_name: fileName,
        resume_url: publicUrl,
        resume_updated_at: new Date().toISOString(),
      };

      if (existingTherapist) {
        const { error: updateError } = await supabase
          .from("therapist_list")
          .update({ resume_url: resumeData.resume_url })
          .eq("id", existingTherapist.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("therapist_list")
          .insert(resumeData);

        if (insertError) throw insertError;
      }

      await fetchExistingResume();
      toast.success(
        existingResume
          ? "Resume updated successfully"
          : "Resume uploaded successfully"
      );

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
    if (existingResume?.url) {
      let isCancelled = false;

      (async function () {
        const pdfJS = await import("pdfjs-dist");

        // pdfJS.GlobalWorkerOptions.workerSrc =
        //   window.location.origin + "/public/pdf.worker.min.mjs";
        pdfJS.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdf: PDFDocumentProxy = await pdfJS.getDocument(
          existingResume.url
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

  if (loading) {
    return (
      <Stack align="center" gap="md">
        <Loader />
        <Text>Loading resume information...</Text>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      <Text size="lg" fw={500}>
        Resume Management
      </Text>
      {existingResume ? (
        <Stack gap="sm">
          <Group ps="apart">
            <Group>
              <IconPdf size={20} />
              <Text>My Resume</Text>
            </Group>
            <Text size="xs" color="dimmed">
              Last updated:{" "}
              {new Date(existingResume.updatedAt).toLocaleDateString()}
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
        <canvas ref={canvasRef} style={{ height: "100vh", width: "100%" }} />
      </Modal>
    </Stack>
  );
}
