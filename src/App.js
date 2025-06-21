import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mahasiswa from "./pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "./pages/MahasiswaDetail";
import Dosen from "./pages/Admin/Dosen/Dosen";
import Matakuliah from "./pages/Admin/Matakuliah/Matakuliah";
import KRS from "./pages/user/KRS";
import UserRoles from "./pages/Admin/Users/UserRoles";
import Kelas from "./pages/Admin/Kelas/Kelas";
import KelasMahasiswa from "./pages/user/KelasMahasiswa";

// Layouts
import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* ========== AUTH ROUTES ========== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ========== DASHBOARD ROUTES ========== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={["admin", "user", "mahasiswa"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Default redirect */}
          <Route index element={<Navigate to="home" replace />} />

          {/* ===== ADMIN ONLY ROUTES ===== */}
          <Route
            path="home"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="mahasiswa"
            element={
              <ProtectedRoute role="admin">
                <Mahasiswa />
              </ProtectedRoute>
            }
          />
          <Route
            path="mahasiswa/:id"
            element={
              <ProtectedRoute role="admin">
                <MahasiswaDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="dosen"
            element={
              <ProtectedRoute role="admin">
                <Dosen />
              </ProtectedRoute>
            }
          />
          <Route
            path="matakuliah"
            element={
              <ProtectedRoute role="admin">
                <Matakuliah />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute role="admin">
                <UserRoles />
              </ProtectedRoute>
            }
          />
          <Route
            path="kelas"
            element={
              <ProtectedRoute role="admin">
                <Kelas />
              </ProtectedRoute>
            }
          />

          {/* ===== USER / MAHASISWA ===== */}
          <Route
            path="krs"
            element={
              <ProtectedRoute role={["user", "mahasiswa"]}>
                <KRS />
              </ProtectedRoute>
            }
          />
          <Route
            path="kelas-saya"
            element={
              <ProtectedRoute role={["user", "mahasiswa"]}>
                <KelasMahasiswa />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ========== CATCH-ALL ROUTE ========== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
