// HEADER COMPONENT (Header.js)  ==> src/components/organisms/Header.js

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

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-yellow-300 border-b-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      <div className="text-black font-bold">
        {user ? (
          <p>
            {user.name} <span className="uppercase">({user.role})</span>
          </p>
        ) : (
          <p>Guest</p>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
