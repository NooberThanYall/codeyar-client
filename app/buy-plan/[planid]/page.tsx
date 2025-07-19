"use client";

import { useParams, useRouter } from "next/navigation";

const page = ({ params }) => {
  const { planid } = useParams();
  const router = useRouter();

  async function goToPayment() {
    const res = await fetch("http://127.0.0.1:5000/plan/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId: planid }),
    });

    if (!res.ok) return;

    const { path } = await res.json();

    router.replace(path);
  }
  return (
    <>
      <h2>{planid}</h2>
      <button
        onClick={() => {
          goToPayment();
        }}
      >
        خرید
      </button>
    </>
  );
};

export default page;
