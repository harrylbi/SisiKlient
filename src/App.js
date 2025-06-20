// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mahasiswa from "./pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "./pages/MahasiswaDetail";
import Dosen from "./pages/Admin/Dosen/Dosen"; // ✅ Tambahkan ini
import Matakuliah from "./pages/Admin/Matakuliah/Matakuliah"; // 🆕

import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";
import ProtectedRoute from "../src/Routes/PrivateRoute";

import { AuthProvider } from "../src/Context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Halaman Login & Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Halaman Admin (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
          <Route path="dosen" element={<Dosen />} /> {/* ✅ Tambahkan ini */}
          <Route path="matakuliah" element={<Matakuliah />} /> // 
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
