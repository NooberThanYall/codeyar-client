"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { tokuni } = useParams();
  const router = useRouter();

  async function pay() {
    const res = await fetch(`http://127.0.0.1:5000/plan/verify-payment`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return;

    const { path } = await res.json();

    router.replace(path);
  }

  return (
    <>
      <h1>پرداخت برای اشتراک</h1>
      <h4>{tokuni}</h4>
      <button
        onClick={() => {
          pay();
        }}
      >
        پرداخت
      </button>
    </>
  );
};

export default Page;
