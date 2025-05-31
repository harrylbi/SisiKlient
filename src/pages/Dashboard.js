import React, { useContext } from "react";
import Card from "../components/molecules/Card";
import { MahasiswaContext } from "../context/MahasiswaContext";

const Dashboard = () => {
  const { mahasiswa } = useContext(MahasiswaContext);

  const total = mahasiswa.length;
  const aktif = mahasiswa.filter((mhs) => mhs.status === true).length;
  const nonAktif = mahasiswa.filter((mhs) => mhs.status === false).length;
  const mahasiswaBaru = mahasiswa.filter((mhs) =>
    mhs.nim.startsWith("A11.2022")
  ).length;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Mahasiswa" value={total} icon="🎓" color="blue" />
        <Card title="Aktif" value={aktif} icon="✅" color="green" />
        <Card title="Non-Aktif" value={nonAktif} icon="❌" color="red" />
        <Card
          title="Mahasiswa Baru"
          value={mahasiswaBaru}
          icon="🆕"
          color="purple"
          colSpan={2}
        />
        <Card
          title="Statistik Kelulusan"
          value="0%" // update nanti kalau mau hitung
          icon="📊"
          color="orange"
          colSpan="full"
          className="h-32"
        />
      </div>
    </div>
  );
};

export default Dashboard;
