import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../organisms/UserSidebar"; // Buat khusus untuk user
import Header from "../organisms/UserHeader";   // Buat khusus untuk user

const UserLayout = () => {
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
            © 2025 Student Portal. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
