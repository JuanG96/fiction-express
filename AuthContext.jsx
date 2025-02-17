import React, { createContext, useState } from "react";
import { fetchUser } from "./src/api/fetchUser";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const data = await fetchUser(username, password);

      if (data && data.length > 0) {
        const loggedUser = data[0];
        setUser(loggedUser);
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
