import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check local storage for existing session on load using lazy initialization
    const storedUser = localStorage.getItem("mini_merch_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password, role = "user") => {
    // Mock Logic
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem("mini_merch_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mini_merch_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
