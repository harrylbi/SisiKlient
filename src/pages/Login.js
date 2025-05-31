// LOGIN PAGE (Login.js) => src/pages/Login.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "../components/atoms/Label";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import user from "../data/user";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Cek apakah sesuai dengan dummy user
    if (email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login Berhasil! ✅", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/admin");
      }, 3000); // navigasi setelah toast selesai tampil
    } else {
      toast.error("Email atau password salah ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Masukkan email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="Masukkan password" required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Login
        </Button>
      </form>

      {/* Container untuk menampilkan Toast */}
      <ToastContainer />
    </>
  );
};

export default Login;
