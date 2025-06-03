// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ⬅️ Tambahkan import ini
import Dashboard from "./pages/Dashboard";
import Mahasiswa from "./pages/Mahasiswa";
import Dosen from "./pages/Dosen";
import MahasiswaDetail from "./pages/MahasiswaDetail";
import AuthLayout from "./components/templates/AuthLayout";
import AdminLayout from "./components/templates/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { MahasiswaProvider } from "./context/MahasiswaContext";

const App = () => {
  return (
    <MahasiswaProvider>
      <Routes>
        {/* Halaman Login & Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ⬅️ Tambahkan route ini */}
        </Route>

        {/* Halaman Admin */}
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
          <Route path="Dosen" element={<Dosen />} />
          <Route path="mahasiswa/:id" element={<MahasiswaDetail />} />
        </Route>

        {/* Redirect semua ke login jika tidak cocok */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </MahasiswaProvider>
  );
};

export default App;
