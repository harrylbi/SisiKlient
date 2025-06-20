import React from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogout } from "../../Utils/Helpers/SwalHelpers.jsx";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      navigate("/"); // Kembali ke halaman login
    });
  };

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <div className="text-sm text-gray-700">
        {user ? (
          <>
            <p>
              <span className="font-semibold">{user.name}</span> (
              {user.role?.toUpperCase()})
            </p>
          </>
        ) : (
          <p>Guest</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
