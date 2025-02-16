import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await fetch(
        `http://localhost:4444/users?username=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`
      );
      const data = await response.json();
      console.log({data})
      
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
