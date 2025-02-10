"use client";

import { useAuthStore } from "@/app/_store/authStore";
import { createClient } from "@/app/utils/supabase/client";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Paper,
  Stepper,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Transition,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconBuildingBank,
  IconCheck,
  IconCreditCard,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

function PaymentSignUpComponent() {
  const supabase = createClient();
  const { userInfo, setUserInfo } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const handleInsertCard = async () => {
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
        .from("therapist_list")
        .update({ card_status: "true" })
        .eq("id", userInfo?.id)
        .select();
      if (userUpdateError) {
        console.error(userUpdateError);
        throw new Error("Failed to update user card status.");
      }
      setUserInfo(userUpdateData[0]);
      setActive(1);
      toast.success("Created your payment account successfully!");
    } catch (error) {
      console.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
      //   router.push("/therapist");
    }
  };

  const createStripeAccount = async () => {
    setLoading(true);
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

          setTimeout(() => {
            window.location.href = accountLinkResponse.accountLink?.url;
          }, 1000);
        } catch (error) {
          console.error("Error creating account link:", error);
          toast.error("An error occurred while creating the account link.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the account.");
    }
    setLoading(false);
  };

  const validateIBAN = (iban: string) => {
    const ibanRegex =
      /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/;
    return ibanRegex.test(iban.replace(/\s/g, ""));
  };

  const validateSWIFT = (swift: string) => {
    const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return swiftRegex.test(swift);
  };

  const form = useForm({
    initialValues: {
      iban: "",
      swift: "",
    },
    validate: {
      iban: (value) => (validateIBAN(value) ? null : "Invalid IBAN"),
      swift: (value) =>
        validateSWIFT(value) ? null : "Invalid SWIFT/BIC code",
    },
  });

  const handleSubmit = async (values: { iban: string; swift: string }) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("bank_list").insert({
        user_id: userInfo?.id,
        iban_number: values.iban,
        swift_number: values.swift,
      });

      if (error) throw error;
      const { error: updateError } = await supabase
        .from("therapist_list")
        .update({ step: "completed" })
        .eq("id", userInfo?.id);
      if (updateError) throw updateError;

      toast.success("Bank details saved successfully");
      router.push("/therapist");

      form.reset();
    } catch (error) {
      toast.error("Failed to save bank details");
    } finally {
      setLoading(false);
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
    <Paper shadow="md" radius="lg" p="xl" withBorder>
      <Title order={2} ta="center" mb="xl">
        Payment Setup
      </Title>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Step 1"
          description="Create Stripe Account"
          //   allowStepSelect={active > 0}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
            <Group ps="apart">
              <Text fw={500}>Stripe Account Status</Text>
              {userInfo?.card_status === "true" ? (
                <ThemeIcon color="green" variant="light" size="lg" radius="xl">
                  <IconCheck size="1.1rem" />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="yellow" variant="light" size="lg" radius="xl">
                  <IconAlertCircle size="1.1rem" />
                </ThemeIcon>
              )}
            </Group>
            <Text size="sm" color="dimmed" mt="md">
              {userInfo?.card_status === "true"
                ? "Your Stripe account is verified and ready to use."
                : "You need to create a Stripe account to receive payments."}
            </Text>
            {userInfo?.card_status === "false" && (
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                loading={loading}
                onClick={createStripeAccount}
                leftSection={<IconCreditCard size="1rem" />}
              >
                Create Stripe Account
              </Button>
            )}
          </Card>
        </Stepper.Step>
        <Stepper.Step
          label="Step 2"
          description="Bank Details"
          //   allowStepSelect={active > 1}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                required
                label="IBAN"
                placeholder="Enter IBAN"
                leftSection={<IconBuildingBank size="1rem" />}
                {...form.getInputProps("iban")}
              />
              <TextInput
                required
                mt="md"
                label="SWIFT/BIC Code"
                placeholder="Enter SWIFT/BIC Code"
                leftSection={<IconBuildingBank size="1rem" />}
                {...form.getInputProps("swift")}
              />
              <Flex justify={"end"} mt="xl">
                <Button
                  type="submit"
                  loading={loading}
                  color="#46A7B0"
                  ps={"end"}
                >
                  Submit Bank Details
                </Button>
              </Flex>
            </form>
          </Card>
        </Stepper.Step>
        <Stepper.Completed>
          <Transition
            mounted={active === 2}
            transition="fade"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mt="md"
                style={styles}
              >
                <Group>
                  <ThemeIcon color="green" size="xl" radius="xl">
                    <IconCheck size="1.5rem" />
                  </ThemeIcon>
                  <Box>
                    <Text fw={500}>Setup Complete</Text>
                    <Text size="sm" color="dimmed">
                      Your payment information has been successfully set up.
                    </Text>
                  </Box>
                </Group>
              </Card>
            )}
          </Transition>
        </Stepper.Completed>
      </Stepper>
    </Paper>
  );
}
export default function PaymentSignUp() {
  return (
    <>
      <Suspense>
        <PaymentSignUpComponent />
      </Suspense>
    </>
  );
}
