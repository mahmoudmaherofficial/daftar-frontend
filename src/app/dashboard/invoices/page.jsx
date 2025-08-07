"use client";

import Button from "@/components/ui/button/button";
import Loading from "@/components/ui/loading/loading";
import PaginatonControls from "@/components/ui/paginationControls/paginatonControls";
import cAxios from "@/lib/axios/cAxios";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function InvoicesPage() {
  // State variables
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const router = useRouter();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const queryParam = filterStatus === "all" ? "" : `&search=${filterStatus}`;
        const response = await cAxios.get(`/invoices?page=${page}&limit=12${queryParam}`);
        setInvoices(response.data.invoices);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        toast.error("Failed to load invoices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [page, filterStatus]);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    async function deleteInvoice() {
      try {
        await cAxios.delete(`/invoices/${id}`);
        setInvoices(invoices.filter((inv) => inv._id !== id));
        toast.success("Invoice deleted successfully");
      } catch (err) {
        toast.error("Failed to delete invoice");
      }
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--primary)",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInvoice();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast("Invoice deletion canceled");
      }
    });
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    router.push(`/dashboard/invoices/${id}/edit`);
  };

  return (
    <main className="p-6">
      {/* خلفية منقطة */}
      <div
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
        className="absolute inset-0 -z-10 opacity-10"
      />

      {/* رأس الصفحة */}
      <div className="flex flex-wrap items-center justify-between gap-5 mb-4">
        <h1 className="text-2xl font-bold text-[var(--text)]">Invoices</h1>
        {/* أزرار الفلترة */}
        <div className="inline-flex order-2 sm:order-0 mx-auto sm:mx-0 border border-[var(--border)] rounded-lg overflow-hidden">
          {["all", "paid", "unpaid"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setPage(1);
                setFilterStatus(status);
              }}
              className={`px-5 py-2 font-medium text-sm cursor-pointer transition ${
                filterStatus === status
                  ? "bg-[var(--secondary)] text-white text-shadow-md"
                  : "bg-[var(--card)] text-[var(--text-muted)] hover:bg-[var(--card-hover)]"
              }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <Link href="/dashboard/invoices/new">
          <Button>Add Invoice</Button>
        </Link>
      </div>

      {/* بطاقات الفواتير */}
      {isLoading ? (
        <Loading />
      ) : invoices.length === 0 ? (
        <p className="text-center text-[var(--text-muted)]">No invoices found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md-grid-cols-2">
          {invoices.map((invoice) => (
            <Link href={`/dashboard/invoices/${invoice._id}`} key={invoice._id}>
              <div className="border border-[var(--border)] p-4 rounded hover:shadow flex flex-col justify-between transition bg-[var(--card)] overflow-hidden h-full">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-[var(--text)] truncate max-w-35">{invoice._id}</h2>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                    {invoice.status === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </div>
                <p className="text-[var(--text)]">Client: {invoice.customer?.name}</p>
                <p className="text-[var(--text)]">Amount: {invoice.totalAmount}</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Date: {format(new Date(invoice.createdAt), "dd/MM/yyyy HH:mm")}
                </p>

                {/* أزرار التعديل والحذف */}
                <div className="flex items-end justify-end flex-1 gap-2 mt-4">
                  <Button size="sm" variant="secondary" onClick={(e) => handleEdit(e, invoice._id)}>
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button size="sm" variant="danger" onClick={(e) => handleDelete(e, invoice._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <PaginatonControls page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
