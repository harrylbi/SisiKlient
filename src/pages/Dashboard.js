import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    mahasiswa: 0,
    dosen: 0,
    matakuliah: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resMhs, resDosen, resMatkul, resUsers] = await Promise.all([
          axios.get("http://localhost:3001/mahasiswa"),
          axios.get("http://localhost:3001/dosen"),
          axios.get("http://localhost:3001/matakuliah"),
          axios.get("http://localhost:3001/users"),
        ]);

        setStats({
          mahasiswa: resMhs.data.length,
          dosen: resDosen.data.length,
          matakuliah: resMatkul.data.length,
          users: resUsers.data.length,
        });
      } catch (err) {
        console.error("Gagal memuat data statistik:", err);
      }
    };

    fetchStats();
  }, []);

  const handleNavigate = (target) => {
    const routes = {
      mahasiswa: "/dashboard/mahasiswa",
      dosen: "/dashboard/dosen",
      matakuliah: "/dashboard/matakuliah",
      users: "/dashboard", // update jika punya manajemen user
    };
    navigate(routes[target]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Selamat datang, <span className="font-semibold">{user?.name}</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Mahasiswa"
          value={stats.mahasiswa}
          color="bg-blue-100"
          icon="🎓"
          onClick={() => handleNavigate("mahasiswa")}
        />
        <DashboardCard
          title="Dosen"
          value={stats.dosen}
          color="bg-green-100"
          icon="👨‍🏫"
          onClick={() => handleNavigate("dosen")}
        />
        <DashboardCard
          title="Matakuliah"
          value={stats.matakuliah}
          color="bg-yellow-100"
          icon="📘"
          onClick={() => handleNavigate("matakuliah")}
        />
        <DashboardCard
          title="Users"
          value={stats.users}
          color="bg-purple-100"
          icon="🧑‍💼"
          onClick={() => handleNavigate("users")}
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded shadow hover:shadow-lg transition cursor-pointer ${color}`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
