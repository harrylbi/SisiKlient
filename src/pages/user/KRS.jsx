// src/pages/User/KRS.jsx

import React from "react";
import { useAuth } from "../../Context/AuthContext";

const KRS = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Kartu Rencana Studi (KRS)</h1>
      <p className="text-gray-700">
        Selamat datang, {user?.name || "Mahasiswa"}! Ini adalah halaman KRS kamu.
      </p>
      {/* Kamu bisa tambahkan daftar mata kuliah di sini */}
    </div>
  );
};

export default KRS;
