import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-8 text-white">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/admin/mahasiswa"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
          }
        >
          🎓 Mahasiswa
        </NavLink>

        <NavLink
          to="/admin/dosen"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
          }
        >
          👨‍🏫 Dosen
        </NavLink>
        <NavLink
          to="/admin/matakuliah"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
              : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
          }
        >
        📘 Matakuliah
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;
