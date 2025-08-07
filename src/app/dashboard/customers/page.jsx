"use client";

import Button from "@/components/ui/button/button";
import Loading from "@/components/ui/loading/loading";
import PaginationControls from "@/components/ui/paginationControls/paginationControls";
import cAxios from "@/lib/axios/cAxios";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const res = await cAxios.get(`/customers?page=${page}&limit=12`);
        setCustomers(res.data.customers);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error("Failed to load customers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [page]);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    async function deleteCustomer() {
      try {
        await cAxios.delete(`/customers/${id}`);
        setCustomers(customers.filter((c) => c._id !== id));
        toast.success("Customer deleted successfully");
      } catch (error) {
        toast.error("Failed to delete customer");
      }
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the customer and all related data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--primary)",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCustomer();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast("Customer deletion canceled");
      }
    });
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    router.push(`/dashboard/customers/${id}/edit`);
  };

  return (
    <main className="p-6">
      {/* خلفية منقطة */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
      />

      {/* رأس الصفحة */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold text-[var(--text)]">Customers</h1>
        <Link href="/dashboard/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>

      {/* بطاقات العملاء */}
      {isLoading ? (
        <Loading />
      ) : customers.length === 0 ? (
        <p className="text-center text-[var(--text-muted)]">No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {customers.map((customer) => (
            <Link href={`/dashboard/customers/${customer._id}`} key={customer._id}>
              <div className="border border-[var(--border)] p-4 rounded hover:shadow flex flex-col justify-between transition bg-[var(--card)] overflow-hidden h-full">
                <div className="mb-2">
                  <h2 className="font-semibold text-[var(--text)] truncate max-w-35">{customer.name}</h2>
                  <p className="text-[var(--text-muted)] text-sm">{customer.email}</p>
                  <p className="text-[var(--text-muted)] text-sm">{customer.phone}</p>
                </div>

                {/* أزرار التعديل والحذف */}
                <div className="flex items-end justify-end flex-1 gap-2 mt-4">
                  <Button size="sm" variant="secondary" onClick={(e) => handleEdit(e, customer._id)}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button size="sm" variant="danger" onClick={(e) => handleDelete(e, customer._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
