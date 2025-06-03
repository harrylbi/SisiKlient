import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "../components/atoms/Label";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios"; 

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      toast.error("Email dan password wajib diisi ❌", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Simulasikan request registrasi
      await axios.post("/register", { email, password });

      const userData = { email, password };
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Registrasi berhasil! ✅", {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error("Gagal registrasi ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <h2 className="text-4xl font-extrabold text-center text-pink-400 uppercase mb-6 border-b-4 border-pink-400 pb-2">
        Register
      </h2>

      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-white uppercase">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="contoh@email.com"
            required
            className="bg-pink-100 border-4 border-black text-black placeholder:text-gray-700"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-white uppercase">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
            className="bg-pink-100 border-4 border-black text-black placeholder:text-gray-700"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 border-4 border-black text-white uppercase font-bold text-lg py-3"
        >
          Register
        </Button>
      </form>

      <ToastContainer />
    </>
  );
};

export default Register;
