import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  role: null,
  login: async () => false,
  logout: () => {},
  token: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, password: string): boolean => {
    console.log("Intento de login:", { username, password });
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setRole("admin");
      return true;
    }
    if (username === "user" && password === "user") {
      setIsAuthenticated(true);
      setRole("user");
      return true;
    }
    return false;
  };  

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
