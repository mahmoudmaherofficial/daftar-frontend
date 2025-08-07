"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Button from "@/components/ui/button/button";
import cAxios from "@/lib/axios/cAxios";

export default function CreateInvoicePage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [items, setItems] = useState([{ product: "", quantity: 1 }]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("unpaid");

  useEffect(() => {
    const fetchData = async () => {
      const [customersRes, productsRes] = await Promise.all([cAxios.get(`/customers`), cAxios.get(`/products`)]);
      setCustomers(customersRes.data.customers);
      setProducts(productsRes.data.products);
    };

    fetchData();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1 }]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await cAxios.post(`/invoices`, {
        customer: selectedCustomer,
        items,
        notes,
        status,
      });
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
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
      <form onSubmit={handleSubmit} className="max-w-2xl p-4 mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-[var(--text)]">Create New Invoice</h1>

        <label className="text-[var(--text)] mb-2 block">Customer</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-2 rounded">
          <option value="" className="text-[var(--text-muted)]">
            Select a customer
          </option>
          {customers.map((c) => (
            <option className="text-[var(--text)]" key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <div>
          <label className="text-[var(--text)] mb-2 block">Items</label>
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <select
                value={item.product}
                onChange={(e) => handleItemChange(index, "product", e.target.value)}
                className="flex-1 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-2 rounded">
                <option value="" className="text-[var(--text-muted)]">
                  Select product
                </option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                className="w-20 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-2 rounded"
              />
              <button type="button" onClick={() => removeItem(index)} className="text-[var(--danger)]">
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors mt-1">
            + Add Item
          </button>
        </div>

        <label className="text-[var(--text)] mb-2 block">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-2 rounded"
        />

        <label className="text-[var(--text)] mb-2 block">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-2 rounded">
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <Button variant="secondary" type="submit">
          Create Invoice
        </Button>
      </form>
    </main>
  );
}
