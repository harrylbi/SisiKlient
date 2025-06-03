import React from "react";
import { useNavigate } from "react-router-dom";
import Label from "../components/atoms/Label";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (event) => {
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

    // Simpan user ke localStorage (dummy)
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Registrasi berhasil! ✅", {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
        Register
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Masukkan email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" placeholder="Masukkan password" required />
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Register
        </Button>
      </form>

      <ToastContainer />
    </>
  );
};

export default Register;
