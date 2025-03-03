"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  ActionIcon,
  rem,
  Title,
  Transition,
  Overlay,
  TextInput,
  Tooltip,
  Container,
  Flex,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import {
  IconUpload,
  IconEye,
  IconEdit,
  IconTrash,
  IconPhoto,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { createClient } from "@/app/utils/supabase/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../_store/authStore";

export default function DocumentComponent() {
  const supabase = createClient();
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<any | null>(null);
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [showDropzone, setShowDropzone] = useState(false);
  const [editDropzoneKey, setEditDropzoneKey] = useState(0);
  const [newImageName, setNewImageName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (userInfo?.id) fetchImages();
  }, [userInfo?.id]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("document")
        .list(`${userInfo?.id}/`);

      if (error) throw error;

      const imageFiles: any[] = await Promise.all(
        data.map(async (file) => {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("document")
            .getPublicUrl(`${userInfo?.id}/${file.name}`);

          return {
            url: publicUrl,
            path: `${userInfo?.id}/${file.name}`,
            name: file.name,
          };
        })
      );

      setImages(imageFiles);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileWithPath[]) => {
    if (!files || files.length === 0) return;

    if (files.length + images.length > 8) {
      toast.warn("Maximum of 8 document images can be uploaded.");
      return;
    }

    setUploading(true);
    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `${userInfo?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("document")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
      }

      await fetchImages();
      setShowDropzone(false);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (image: any) => {
    try {
      const { error } = await supabase.storage
        .from("document")
        .remove([image.path]);

      if (error) throw error;

      setImages(images.filter((img) => img.path !== image.path));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleEdit = async (files: FileWithPath[]) => {
    if (!editingImage || !files.length) return;

    setUploading(true);
    try {
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = newImageName
        ? `${newImageName}.${fileExt}`
        : `${editingImage.path.split("/").pop()?.split(".")[0]}.${fileExt}`;
      const filePath = `${userInfo?.id}/${fileName}`;

      await supabase.storage.from("document").remove([editingImage.path]);

      const { error: uploadError } = await supabase.storage
        .from("document")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      await fetchImages();
      setEditingImage(null);
      setShowEditModal(false);
      setNewImageName("");
      setEditDropzoneKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setUploading(false);
    }
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmitDocumentsImages = async () => {
    setSubmitLoading(true);
    const { data, error } = await supabase
      .from("therapist_list")
      .update({ documents: images.map((item) => item.url), step: "payment" })
      .eq("id", userInfo?.id);
    if (error) throw error;
    toast.success("Uploaded documents successfully");
    setSubmitLoading(false);
  };

  return (
    <Container size={"lg"} p={"lg"}>
      <Title order={4}>ID, Insurance and Diplomas</Title>
      <Stack gap="md" mt={"sm"}>
        <Transition
          mounted
          transition="slide-down"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Dropzone
              onDrop={handleFileUpload}
              onReject={(files) => {
                console.error("Files rejected:", files);
              }}
              maxSize={5 * 1024 ** 2}
              accept={["image/jpeg", "image/png", "image/gif", "image/webp"]}
              loading={uploading}
              maxFiles={8}
            >
              <Group
                justify="center"
                gap="xl"
                mih={100}
                style={{ pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag document images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Files should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          )}
        </Transition>

        <Grid mt={"lg"}>
          {loading ? (
            <Loader />
          ) : (
            images.map((image) => (
              <Grid.Col key={image.path} span={{ base: 12, sm: 6, md: 4 }}>
                <Paper shadow="sm" withBorder p="xs">
                  <Box pos="relative">
                    <Image
                      src={image.url}
                      alt={image.name}
                      h={150}
                      fit="cover"
                      radius="sm"
                    />
                    <Group
                      pos="absolute"
                      top={8}
                      right={8}
                      style={{ zIndex: 2 }}
                      gap={8}
                    >
                      <Tooltip label="Preview">
                        <ActionIcon
                          variant="filled"
                          color="blue"
                          size="sm"
                          radius="xl"
                          onClick={() => setPreviewImage(image)}
                        >
                          <IconEye size={"0.8rem"} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Edit">
                        <ActionIcon
                          variant="filled"
                          color="yellow"
                          size="sm"
                          radius="xl"
                          onClick={() => {
                            setEditingImage(image);
                            setShowEditModal(true);
                          }}
                        >
                          <IconEdit size={"0.8rem"} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="filled"
                          color="red"
                          size="sm"
                          radius="xl"
                          onClick={() => handleRemove(image)}
                        >
                          <IconTrash size={"0.8rem"} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Box>
                </Paper>
              </Grid.Col>
            ))
          )}
        </Grid>

        <Flex justify={"end"} mt={"lg"}>
          <Button
            color="#46A7B0"
            onClick={() => handleSubmitDocumentsImages()}
            loading={submitLoading}
          >
            Submit Documents
          </Button>
        </Flex>

        <Modal
          opened={!!previewImage}
          onClose={() => setPreviewImage(null)}
          size="xl"
          title="Image Preview"
          centered
        >
          {previewImage && (
            <>
              <Image
                src={previewImage.url}
                alt={previewImage.name}
                fit="contain"
                h={400}
              />
              <Text size="sm" c="dimmed" ta="center" mt="xs">
                {previewImage.name}
              </Text>
            </>
          )}
        </Modal>

        {/* Edit Modal */}
        <Modal
          opened={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingImage(null);
            setNewImageName("");
          }}
          title="Edit Image"
          centered
        >
          {editingImage && (
            <Stack>
              <Image
                src={editingImage.url}
                alt={editingImage.name}
                fit="contain"
                h={200}
              />
              <TextInput
                label="Image Name"
                placeholder="Enter new image name"
                value={newImageName}
                onChange={(event) => setNewImageName(event.currentTarget.value)}
              />
              <Dropzone
                key={`edit-${editDropzoneKey}`}
                onDrop={handleEdit}
                maxSize={5 * 1024 ** 2}
                accept={["image/jpeg", "image/png", "image/gif", "image/webp"]}
                loading={uploading}
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={120}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconCheck
                      style={{
                        width: rem(32),
                        height: rem(32),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(32),
                        height: rem(32),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconEdit
                      style={{
                        width: rem(32),
                        height: rem(32),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="md" inline>
                      Drop new image here or click to replace
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Files should not exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}
