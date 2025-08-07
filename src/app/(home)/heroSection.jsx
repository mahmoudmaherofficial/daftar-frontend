"use client";
import Button from "@/components/ui/button/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/dashboard");
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 hero-section">
      <h2 className="text-4xl font-bold mb-4 text-[var(--text)]">Simplify Your Invoicing with Daftar</h2>
      <p className="text-lg text-[var(--text-muted)] max-w-xl mb-6">
        Daftar is a smart invoice management system that helps you track customers, manage inventory, and generate
        reports.
      </p>
      <Link href={user ? "/dashboard" : "/login"}>
        <Button size="lg">{user ? "Explore Dashboard" : "Get started"}</Button>
      </Link>
    </section>
  );
};

export default HeroSection;
