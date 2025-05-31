// PROFILE MENU COMPONENT (ProfileMenu.js)  ==> src/components/molecules/ProfileMenu.js

import { useState } from "react";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    alert("Logout berhasil!"); // Menampilkan alert saat logout
    setIsOpen(false); // Menutup dropdown setelah logout
    window.location.href = "/Login";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-full bg-gray-300"
      ></button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <button
            onClick={handleLogout} // Tambahkan event onClick di sini
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
