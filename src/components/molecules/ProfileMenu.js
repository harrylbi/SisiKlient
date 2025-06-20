import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogout } from "../../Utils/Helpers/SwalHelpers.jsx";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      navigate("/"); // navigasi yang dianjurkan
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
