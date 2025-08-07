"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import cAxios from "@/lib/axios/cAxios";
import Loading from "@/components/ui/loading/loading";
import Button from "@/components/ui/button/button";
import Swal from "sweetalert2";

const EditCustomerPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await cAxios.get(`/customers/${id}`);
        setCustomer(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load customer:", error);
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cAxios.put(`/customers/${id}`, customer);
      Swal.fire({ icon: "success", title: "Customer updated successfully!" });
      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Failed to update customer:", error);
      Swal.fire({ icon: "error", title: "Update failed" });
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="max-w-2xl p-6 mx-auto mt-10 bg-[var(--background)] rounded-xl shadow">
      <h1 className="mb-6 text-3xl font-bold text-center text-[var(--text)]">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-[var(--text)]">Name</label>
          <input
            type="text"
            name="name"
            value={customer.name || ""}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-[var(--card)] text-[var(--text)] border-[var(--border)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-[var(--text)]">Email</label>
          <input
            type="email"
            name="email"
            value={customer.email || ""}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-[var(--card)] text-[var(--text)] border-[var(--border)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-[var(--text)]">Phone</label>
          <input
            type="text"
            name="phone"
            value={customer.phone || ""}
            onChange={handleChange}
            required
            className="w-full p-2 rounded border bg-[var(--card)] text-[var(--text)] border-[var(--border)]"
          />
        </div>

        <div className="text-right">
          <Button type="submit">Update Customer</Button>
        </div>
      </form>
    </main>
  );
};

export default EditCustomerPage;
