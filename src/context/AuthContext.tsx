import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("localbite-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user: User, token: string) => {
    localStorage.setItem("localbite-token", token);
    localStorage.setItem("localbite-user", JSON.stringify(user));

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("localbite-token");
    localStorage.removeItem("localbite-user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}