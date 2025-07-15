"use client";
import React, { useEffect } from "react";
import { useUser } from "@/context/auth/UserCotext";
import { useRouter } from "next/navigation";

const AuthLayout =  ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  if (user) router.replace("/dashboard");
  return <>{children}</>;
};

export default AuthLayout;
