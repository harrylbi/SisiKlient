import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const menuClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
      : "flex items-center gap-2 hover:bg-blue-500 hover:text-white px-4 py-2 rounded";

  return (
    <aside className="w-64 bg-blue-800 text-white p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 text-white">
        {user?.role === "admin" ? "Admin Panel" : "Mahasiswa Portal"}
      </h2>

      <nav className="flex flex-col gap-2">
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
