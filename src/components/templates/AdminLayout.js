// ADMIN LAYOUT (AdminLayout.js) => src/components/templates/AdminLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../organisms/Sidebar"; // Pindahkan komponen Sidebar ke file terpisah jika belum
import Header from "../organisms/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
        <footer className="bg-white text-center py-4 shadow-inner">
          <p className="text-sm text-gray-600">
            © 2025 Admin Dashboard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
