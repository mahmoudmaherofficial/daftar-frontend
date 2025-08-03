"use client";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null معناها مش مسجل دخول

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  return <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
