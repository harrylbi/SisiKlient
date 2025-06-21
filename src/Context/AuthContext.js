import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../Utils/Apis/AuthApis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("🟡 LocalStorage user (raw):", storedUser); // debug

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🟢 Parsed user:", parsedUser); // debug
        setUser(parsedUser);
      } catch (error) {
        console.error("Gagal parse user dari localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const safeUser = await loginApi(email, password);
      if (!safeUser) {
        throw new Error("Login gagal. User tidak ditemukan.");
      }

      console.log("✅ Login berhasil, menyimpan user ke localStorage:", safeUser); // debug
      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
      return safeUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("🚪 Logout, menghapus user dari localStorage"); // debug
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const canAccess = (permission) => user?.permissions?.includes(permission);
  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user,
        login,
        logout,
        canAccess,
        hasRole,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
