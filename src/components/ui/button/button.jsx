"use client";
import clsx from "clsx";

const VARIANTS = {
  primary:
    "cursor-pointer text-white bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] hover:from-[var(--primary)] hover:to-[var(--primary)]",
  secondary:
    "cursor-pointer text-white bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-hover)] hover:from-[var(--secondary)] hover:to-[var(--secondary)]",
  warning: "cursor-pointer text-white bg-[var(--warning)]",
  danger: "cursor-pointer text-white bg-[var(--danger)]",
  outline:
    "cursor-pointer border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white transition-all",
};

const SIZES = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const BASE = "rounded-lg font-semibold transition-all duration-200 ease-in-out text-shadow-md";

const DISABLED = "bg-gray-500 cursor-not-allowed opacity-70";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(BASE, SIZES[size], !disabled && VARIANTS[variant], disabled && DISABLED, className)}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
