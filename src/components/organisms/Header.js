import React from "react";
import ProfileMenu from "../molecules/ProfileMenu";

const Header = () => {
  return (
    <header className="bg-red-400 border-b-4 border-black">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-extrabold text-black uppercase tracking-wide">
          Mahasiswa
        </h1>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
