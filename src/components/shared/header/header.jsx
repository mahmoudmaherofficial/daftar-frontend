"use client";

import Button from "../../ui/button/button";
import Logo from "../../ui/logo/logo";
import Link from "next/link";
import useScrollPosition from "@/hooks/useScrollPosition";
import useWindowWidth from "@/hooks/useWindowWidth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggler from "./themeToggler";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const Header = () => {
  const scrolled = useScrollPosition(72);
  const width = useWindowWidth();
  const menuRef = useRef(null);
  const isMobile = width <= 768;
  const { user, loading, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      console.log("Logout response:", res.data);
      setUser(null);
      location.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background-transparent)] py-4 backdrop-blur-3xl rounded-full shadow-sm w-[95%] lg:w-[50%] left-[50%] translate-x-[-50%] top-2"
          : "bg-[var(--background)] py-4 shadow-md w-full left-0 top-0 h-[76px] content-center"
      }`}>
      <nav className="flex justify-between items-center px-6 relative">
        <Logo />

        {isMobile ? (
          <div className="relative">
            <div
              id="menu"
              onClick={handleMenu}
              className={`cursor-pointer transition-transform duration-300 ${menuOpen ? "rotate-90" : "rotate-0"}`}>
              <FontAwesomeIcon icon={faBars} className="text-[var(--text)]" size="xl" />
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-9 mt-4 bg-[var(--background)] text-[var(--text-muted)] border border-[var(--border)] shadow-lg rounded-lg p-4 flex flex-col items-center gap-3 min-w-[200px] z-50">
                  <Link href="#features" onClick={() => setMenuOpen(false)}>
                    Features
                  </Link>
                  <Link href="#about" onClick={() => setMenuOpen(false)}>
                    About
                  </Link>
                  <div className="flex flex-col w-full items-center gap-5 mt-5">
                    <div className="flex items-center justify-center gap-3">
                      light
                      <ThemeToggler />
                      dark
                    </div>
                    {!user && !loading ? (
                      <Link className="w-full" href={"/login"} onClick={() => setMenuOpen(false)}>
                        <Button className="w-full">Login</Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="danger" onClick={handleLogout}>
                        Logout
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            {!scrolled && (
              <ul className="flex gap-4 text-lg text-[var(--text-muted)]">
                <li>
                  <Link href={"#features"}>Features</Link>
                </li>
                <li>
                  <Link href={"#about"}>About</Link>
                </li>
              </ul>
            )}

            <div className="flex items-center gap-5">
              <ThemeToggler />
              {!user && !loading ? (
                <Link href={"/login"}>
                  <Button>Login</Button>
                </Link>
              ) : (
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
