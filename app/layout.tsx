import "./globals.css";
import React from "react";
import { NavBar } from "@/components";
import localFont from "next/font/local";
import { CounterContextProvider } from "@/context/counter";

export const metadata = {
  title: "Sandwave",
  description: "GitHub issue viewer",
};

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "./fonts/nimbus.woff2" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${myFont.className} gradient`}>
        <CounterContextProvider>
          <NavBar />
          {children}
        </CounterContextProvider>
      </body>
    </html>
  );
}
