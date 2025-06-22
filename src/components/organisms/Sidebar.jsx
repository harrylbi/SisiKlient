// SIDEBAR COMPONENT (Sidebar.js) ==> src/components/organisms/Sidebar.js

import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const menuClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 bg-yellow-300 text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      : "flex items-center gap-2 bg-white text-black hover:bg-yellow-200 px-4 py-2 border-2 border-black";

  return (
    <aside className="w-64 bg-yellow-100 text-black p-6 min-h-screen border-r-4 border-black shadow-[4px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-extrabold uppercase mb-8 border-b-4 border-black pb-2">
        {user?.role === "admin" ? "Admin Panel" : "Mahasiswa Portal"}
      </h2>

      <nav className="flex flex-col gap-3">
        {/* ===== ADMIN MENU ===== */}
        {user?.role === "admin" && (
          <>
            <NavLink to="/dashboard" end className={menuClass}>
              🏠 Dashboard
            </NavLink>

            <NavLink to="/dashboard/mahasiswa" className={menuClass}>
              🎓 Mahasiswa
            </NavLink>

            <NavLink to="/dashboard/dosen" className={menuClass}>
              👨‍🏫 Dosen
            </NavLink>

            <NavLink to="/dashboard/matakuliah" className={menuClass}>
              📘 Matakuliah
            </NavLink>

            <NavLink to="/dashboard/users" className={menuClass}>
              👥 Kelola User
            </NavLink>

            <NavLink to="/dashboard/kelas" className={menuClass}>
              🏫 Kelas
            </NavLink>
          </>
        )}

        {/* ===== USER / MAHASISWA MENU ===== */}
        {(user?.role === "mahasiswa" || user?.role === "user") && (
          <>
            <NavLink to="/dashboard/krs" className={menuClass}>
              📝 KRS
            </NavLink>

            <NavLink to="/dashboard/kelas-saya" className={menuClass}>
              🏫 Kelas
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
