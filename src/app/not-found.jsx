import Button from "@/components/ui/button/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-70px)] container flex flex-col gap-5 justify-center items-center">
      <h1 className="text-[var(--text)] text-3xl text-center font-bold">OOPS, Looks like you're lost</h1>
      <Link href={"/"}>
        <Button variant="secondary" className={"mx-auto"}>
          Return Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
