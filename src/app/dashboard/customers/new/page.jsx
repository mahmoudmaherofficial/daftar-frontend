"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/button";
import cAxios from "@/lib/axios/cAxios";

export default function CreateCustomerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await cAxios.post("/customers", { name, email, phone });
      toast.success(res.data.message || "Customer created successfully");
      router.push("/dashboard/customers");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main>
      <div
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
        className="absolute inset-0 -z-1 opacity-10"
      />

      <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[var(--text)]">Create New Customer</h1>

        <div>
          <label className="block text-[var(--text)] mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--text)]"
            placeholder="Customer Name"
          />
        </div>

        <div>
          <label className="block text-[var(--text)] mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--text)]"
            placeholder="Customer Email"
          />
        </div>

        <div>
          <label className="block text-[var(--text)] mb-1">Phone</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--text)]"
            placeholder="Phone Number"
          />
        </div>

        <Button variant="secondary" type="submit">
          Create Customer
        </Button>
      </form>
    </main>
  );
}
