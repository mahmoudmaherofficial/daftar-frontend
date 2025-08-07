"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Loading from "@/components/ui/loading/loading";
import Link from "next/link";
import Button from "@/components/ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import cAxios from "@/lib/axios/cAxios";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const res = await cAxios.get(`/customers/${id}`);
          setCustomer(res.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  if (!customer) return <Loading />;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
        className="absolute inset-0 -z-1 opacity-10"
      />

      <Link href="/dashboard/customers">
        <Button className="mb-3" variant="outline">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Customers
        </Button>
      </Link>

      <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-[var(--card)] rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-[var(--text)] mb-6">Customer Details</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-[var(--text)]">
          <p>
            <strong>Name:</strong> {customer.name || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone || "N/A"}
          </p>
          <p>
            <strong>ID:</strong> {customer._id}
          </p>
          <p>
            <strong>Created At:</strong> {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};

export default CustomerDetailsPage;
