import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import MainLayout from "./components/layouts/MainLayout";
import { Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { BlockedUserHandler } from "./components/BlockedUserHandler";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <MainLayout>
            <Suspense>
              <BlockedUserHandler />
            </Suspense>
            {children}
          </MainLayout>
        </MantineProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
