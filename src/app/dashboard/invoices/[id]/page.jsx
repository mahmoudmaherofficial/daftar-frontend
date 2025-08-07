"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Loading from "@/components/ui/loading/loading";
import Link from "next/link";
import Button from "@/components/ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import cAxios from "@/lib/axios/cAxios";

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const response = await cAxios.get(`/invoices/${id}`);
          setInvoice(response.data);
        } catch (error) {
          console.error("Error fetching invoice details:", error);
        }
      };

      fetchInvoice();
    }
  }, [id]);

  console.log(invoice);

  if (!invoice) return <Loading />;

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
      <Link href="/dashboard/invoices">
        <Button className="mb-3" variant="outline">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Invoices
        </Button>
      </Link>
      <div className="max-w-5xl mx-auto overflow-hidden transition-all duration-300 transform shadow-xl bg-[var(--background)] rounded-2xl hover:shadow-2xl">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] sm:p-8">
          <h1 className="text-3xl font-extrabold text-white truncate sm:text-4xl">Invoice #{invoice._id}</h1>
          <div className="flex flex-col mt-4 text-sm text-white sm:flex-row sm:justify-between sm:text-base">
            <p>Created: {new Date(invoice.createdAt).toLocaleDateString()}</p>
            <p className="capitalize text-shadow-lg">
              Status:{" "}
              <span
                className={`font-semibold ${
                  invoice.status === "paid" ? "text-[var(--secondary)]" : "text-[var(--danger)]"
                }`}>
                {invoice.status}
              </span>
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-6 border-b border-[var(--border)] sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text)] sm:text-2xl">Customer Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-[var(--text)]">
            <p>
              <strong>Name:</strong> {invoice.customer?.name || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {invoice.customer?.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="p-6 border-b border-[var(--border)] sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text)] sm:text-2xl">Invoice Items</h2>
          {invoice.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-[var(--border)] rounded-lg">
                <thead className="text-[var(--text-muted)] bg-[var(--card)]">
                  <tr>
                    <th className="px-4 py-3 text-sm font-medium sm:text-base">#</th>
                    <th className="px-4 py-3 text-sm font-medium sm:text-base">Product</th>
                    <th className="px-4 py-3 text-sm font-medium sm:text-base">Quantity</th>
                    <th className="px-4 py-3 text-sm font-medium sm:text-base">Price</th>
                    <th className="px-4 py-3 text-sm font-medium sm:text-base">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr
                      key={item._id}
                      className="transition-colors duration-200 text-[var(--text)] border-t border-[var(--border)] hover:bg-[var(--card-hover)]">
                      <td className="px-4 py-3 text-sm sm:text-base">{index + 1}</td>
                      <td className="px-4 py-3 text-sm sm:text-base">{item.product.name}</td>
                      <td className="px-4 py-3 text-sm sm:text-base">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm sm:text-base">{item.price} EGP</td>
                      <td className="px-4 py-3 text-sm font-semibold sm:text-base">{item.price * item.quantity} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-600">No items in this invoice.</p>
          )}
        </div>

        {/* Notes */}
        <div className="p-6 border-b border-[var(--border)] sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-[var(--text)] sm:text-2xl">Notes</h2>
          <p className="p-4 text-[var(--text-muted)] whitespace-pre-wrap rounded-lg bg-[var(--card)]">
            {invoice.notes || "No notes available"}
          </p>
        </div>

        {/* Total */}
        <div className="p-6 text-right sm:p-8 bg-[var(--card)]">
          <h2 className="text-2xl font-bold text-[var(--text)] sm:text-3xl">
            Total: <span className="text-[var(--secondary)]">{invoice.totalAmount} EGP</span>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default InvoiceDetailsPage;
