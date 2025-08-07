"use client";
import { createContext, useEffect, useState, useContext } from "react";

import cAxios from "@/lib/axios/cAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await cAxios.get(`/auth/me`);
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
