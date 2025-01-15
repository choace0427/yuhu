"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

import { IconMoonStars } from "@tabler/icons-react";

export default function ThemeSwitch() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === "light" ? "black" : "yellow"}
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      title="Toggle color scheme"
      size={"lg"}
    >
      {colorScheme === "light" ? (
        <IconSun style={{ width: 18, height: 18 }} />
      ) : (
        <IconMoonStars style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}
