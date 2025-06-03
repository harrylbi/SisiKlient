import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen bg-yellow-300 flex items-center justify-center">
      <div className="w-full max-w-md bg-black rounded-none border-8 border-black p-8 mx-4 shadow-none">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
