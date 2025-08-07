import DashboardCard from "@/components/ui/dashboardCard/dashboardCard";
import sAxios from "@/lib/axios/sAxios";
import { Suspense } from "react";

export default async function DashboardPage() {
  try {
    // Fetch invoices, customers, and products
    const [{ data: invoices }, { data: customers }, { data: products }] = await Promise.all([
      sAxios.get("/invoices"),
      sAxios.get("/customers"),
      sAxios.get("/products"),
    ]);
    return (
      <main className="relative p-6 bg-[var(--background)]">
        <div
          style={{
            backgroundColor: "transparent",
            backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
            backgroundSize: "21px 21px",
          }}
          className="absolute inset-0 opacity-10"
        />
        <div className="relative z-1">
          <h1 className="text-3xl font-bold mb-4 text-[var(--text)] text-center">Welcome to dashboard</h1>

          <Suspense fallback={<div>Loading...</div>}>
            <section className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              <DashboardCard title="Invoices" value={invoices.total} />
              <DashboardCard title="Customers" value={customers.total} />
              <DashboardCard title="Products" value={products.total} />
            </section>
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex items-center justify-center p-6 bg-[var(--background)]">
        <h1 className="text-3xl font-bold text-[var(--danger)]">Error loading data: {error.message}</h1>
      </main>
    );
  }
}
