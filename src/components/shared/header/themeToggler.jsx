"use client";
import { useEffect, useState } from "react";
import "./themeToggler.css";

const ThemeToggler = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // استعلام من localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // حفظ في localStorage
    setIsDark(!isDark);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className="slider shadow-md border-1 border-[var(--border)]"></span>
    </label>
  );
};

export default ThemeToggler;
