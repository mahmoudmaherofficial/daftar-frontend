import Button from "@/components/ui/button/button";
import "./home.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col mt-[76]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 hero-section">
        <h2 className="text-4xl font-bold mb-4 text-[var(--text)]">Simplify Your Invoicing with Daftar</h2>
        <p className="text-lg text-[var(--text-muted)] max-w-xl mb-6">
          Daftar is a smart invoice management system that helps you track customers, manage inventory, and generate
          reports.
        </p>
        <Link href={"/login"}>
          <Button size="lg">Get started</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20" id="features">
        <h3 className="text-3xl font-bold text-center mb-12 text-[var(--text)]">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[var(--card)] p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2 text-[var(--text)]">Customer Management</h4>
            <p className="text-[var(--text-muted)]">
              Track and manage your customers efficiently with detailed profiles and invoice history.
            </p>
          </div>
          <div className="bg-[var(--card)] p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2 text-[var(--text)]">Inventory Tracking</h4>
            <p className="text-[var(--text-muted)]">
              Monitor product stocks and automate inventory adjustments based on sales and purchases.
            </p>
          </div>
          <div className="bg-[var(--card)] p-6 rounded shadow">
            <h4 className="text-xl font-semibold mb-2 text-[var(--text)]">Reporting Tools</h4>
            <p className="text-[var(--text-muted)]">
              Generate financial, inventory, and customer reports to gain valuable insights into your business.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20 bg-[var(--background)] text-center">
        <h3 className="text-3xl font-bold mb-6 text-[var(--text)]">Why Daftar?</h3>
        <p className="max-w-2xl mx-auto text-[var(--text-muted)]">
          Daftar is built for small and medium businesses to streamline operations. With an easy-to-use interface,
          real-time updates, and secure data management, you’ll save time and make better decisions.
        </p>
      </section>
    </main>
  );
}
