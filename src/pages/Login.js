import React from "react";
import { useNavigate, Link } from "react-router-dom";
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

    if (email === user.email && password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login Berhasil! ✅", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } else {
      toast.error("Email atau password salah ❌", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <h2 className="text-4xl font-extrabold text-center text-yellow-400 uppercase mb-6 border-b-4 border-yellow-400 pb-2">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-white uppercase">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="contoh@email.com"
            required
            className="bg-yellow-100 border-4 border-black text-black placeholder:text-gray-700"
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
            className="bg-yellow-100 border-4 border-black text-black placeholder:text-gray-700"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 border-4 border-black text-white uppercase font-bold text-lg py-3"
        >
          Login
        </Button>
      </form>

      <p className="text-center mt-6 text-white font-mono text-sm">
        Belum punya akun?{" "}
        <Link to="/register" className="underline text-yellow-300 hover:text-yellow-200">
          Daftar di sini
        </Link>
      </p>

      <ToastContainer />
    </>
  );
};

export default Login;
