"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Button from "@/components/ui/button/button";
import Loading from "@/components/ui/loading/loading";
import cAxios from "@/lib/axios/cAxios";

const EditInvoicePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch invoice, customers, and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [invoiceRes, customersRes, productsRes] = await Promise.all([
          cAxios.get(`/invoices/${id}`),
          cAxios.get("/customers"),
          cAxios.get("/products"),
        ]);

        setInvoice(invoiceRes.data);
        setCustomers(customersRes.data.customers);
        setProducts(productsRes.data.products);

        // Pre-populate form fields
        setSelectedCustomer(invoiceRes.data.customer?._id || "");
        setItems(
          invoiceRes.data.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.price,
          }))
        );
        setNotes(invoiceRes.data.notes || "");
        setStatus(invoiceRes.data.status || "unpaid");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load invoice data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle item field changes
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    setItems(updated);
  };

  // Add a new item
  const addItem = () => {
    setItems([...items, { product: "", quantity: 1, price: 0 }]);
  };

  // Remove an item
  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }
    if (items.length === 0 || items.some((item) => !item.product || item.quantity <= 0 || item.price <= 0)) {
      toast.error("Please ensure all items have a valid product, quantity, and price");
      return;
    }

    const updatedInvoice = {
      customer: selectedCustomer,
      items,
      notes,
      status,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save changes to this invoice?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "var(--danger)",
      confirmButtonText: "Yes, save changes",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await cAxios.put(`/invoices/${id}`, updatedInvoice);
          toast.success(response.data.message || "Invoice updated successfully");
          router.push(`/dashboard/invoices/${id}`);
        } catch (error) {
          console.error("Error updating invoice:", error);
          toast.error(error.response?.data?.message || "Failed to update invoice");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast("Changes not saved");
      }
    });
  };

  if (isLoading || !invoice) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
        className="absolute inset-0 -z-10 opacity-10"
      />
      <div className="max-w-5xl mx-auto overflow-hidden transition-all duration-300 transform shadow-xl bg-[var(--background)] rounded-2xl hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6 sm:p-8">
          <h1 className="text-3xl font-extrabold text-[var(--text)] sm:text-4xl">Edit Invoice #{invoice._id}</h1>

          {/* Customer Information */}
          <div className="space-y-2">
            <label className="text-[var(--text)] text-lg font-semibold">Customer</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]">
              <option value="" className="text-[var(--text-muted)]">
                Select a customer
              </option>
              {customers.map((c) => (
                <option key={c._id} value={c._id} className="text-[var(--text)]">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Invoice Items */}
          <div className="space-y-2">
            <label className="text-[var(--text)] text-lg font-semibold">Items</label>
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:gap-4">
                <select
                  value={item.product}
                  onChange={(e) => handleItemChange(index, "product", e.target.value)}
                  className="flex-1 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]">
                  <option value="" className="text-[var(--text-muted)]">
                    Select product
                  </option>
                  {products.map((p) => (
                    <option key={p._id} value={p._id} className="text-[var(--text)]">
                      {p.name} ({p.price} EGP)
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  className="w-full sm:w-24 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  className="w-full sm:w-24 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="Price"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-[var(--danger)] hover:text-[var(--danger-hover)] transition-colors">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-medium">
              + Add Item
            </button>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[var(--text)] text-lg font-semibold">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
              rows="4"
              placeholder="Enter any notes"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-[var(--text)] text-lg font-semibold">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-3 rounded-lg focus:ring-2 focus:ring-[var(--primary)]">
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Total (Display Only) */}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Total:{" "}
              <span className="text-[var(--secondary)]">
                {items.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0).toFixed(2)} EGP
              </span>
            </h2>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="danger" onClick={() => router.push(`/dashboard/invoices/${id}`)}>
              Cancel
            </Button>
            <Button variant="secondary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditInvoicePage;
