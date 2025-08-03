import LoginForm from "@/components/forms/loginForm";

const Page = () => {
  return (
    <main className="min-h-[calc(100vh-70px)] container flex justify-center items-center">
      <div
        style={{
          backgroundColor: "transparent",
          backgroundImage: "radial-gradient(var(--text) 1.05px, var(--background) 1.05px)",
          backgroundSize: "21px 21px",
        }}
        className="absolute inset-0 -z-1 opacity-10"
      />
      <LoginForm />
    </main>
  );
};

export default Page;
