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
    <div className="bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] p-6 max-w-5xl mx-auto mt-10 rounded-lg">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wider text-black">📊 DASHBOARD</h1>
      <p className="mb-6 text-lg font-mono text-black">
        Selamat datang, <span className="font-bold underline">{user?.name}</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Mahasiswa"
          value={stats.mahasiswa}
          color="bg-blue-300"
          icon="🎓"
          onClick={() => handleNavigate("mahasiswa")}
        />
        <DashboardCard
          title="Dosen"
          value={stats.dosen}
          color="bg-green-300"
          icon="👨‍🏫"
          onClick={() => handleNavigate("dosen")}
        />
        <DashboardCard
          title="Matakuliah"
          value={stats.matakuliah}
          color="bg-red-300"
          icon="📘"
          onClick={() => handleNavigate("matakuliah")}
        />
        <DashboardCard
          title="Users"
          value={stats.users}
          color="bg-purple-300"
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
    className={`p-4 cursor-pointer border-4 border-black ${color} shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:brightness-110 transition`}
  >
    <div className="text-5xl mb-3">{icon}</div>
    <h2 className="text-xl font-bold tracking-wide text-black">{title}</h2>
    <p className="text-3xl font-black text-black">{value}</p>
  </div>
);

export default Dashboard;
