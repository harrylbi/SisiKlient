import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-yellow-300 border-r-8 border-black p-6">
      <h2 className="text-3xl font-extrabold mb-10 text-black uppercase tracking-wide border-b-4 border-black pb-2">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-black text-yellow-300 px-5 py-3 border-4 border-black font-bold uppercase"
              : "flex items-center gap-3 hover:bg-black hover:text-yellow-300 px-5 py-3 border-4 border-transparent font-bold uppercase transition-colors duration-200"
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/admin/mahasiswa"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-black text-yellow-300 px-5 py-3 border-4 border-black font-bold uppercase"
              : "flex items-center gap-3 hover:bg-black hover:text-yellow-300 px-5 py-3 border-4 border-transparent font-bold uppercase transition-colors duration-200"
          }
        >
          🎓 Mahasiswa
        </NavLink>

        <NavLink
          to="/admin/dosen"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 bg-black text-yellow-300 px-5 py-3 border-4 border-black font-bold uppercase"
              : "flex items-center gap-3 hover:bg-black hover:text-yellow-300 px-5 py-3 border-4 border-transparent font-bold uppercase transition-colors duration-200"
          }
        >
          👨‍🏫 Dosen
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
