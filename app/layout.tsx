import type React from "react";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import UserContextProvider from "@/context/auth/UserCotext";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "کدیار - ابزار توسعه هوشمند",
  description: "پلتفرم مدیریت قطعه کدها و ابزارهای توسعه",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
