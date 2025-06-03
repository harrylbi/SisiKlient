import React, { useContext } from "react";
import Card from "../components/molecules/Card";
import { MahasiswaContext } from "../context/MahasiswaContext";
import { DosenContext } from "../context/DosenContext";


const Dashboard = () => {
  const { mahasiswa } = useContext(MahasiswaContext);
  const { dosen } = useContext(DosenContext);

  // Mahasiswa stats
  const totalMahasiswa = mahasiswa.length;
  const aktifMahasiswa = mahasiswa.filter((mhs) => mhs.status === true).length;
  const nonAktifMahasiswa = mahasiswa.filter((mhs) => mhs.status === false).length;
  const mahasiswaBaru = mahasiswa.filter((mhs) =>
    mhs.nim.startsWith("A11.2022")
  ).length;

  // Dosen stats
  const totalDosen = dosen.length;
  const aktifDosen = dosen.filter((d) => d.status === true).length;
  const nonAktifDosen = dosen.filter((d) => d.status === false).length;
  const dosenBaru = dosen.filter((d) => d.nidn.startsWith("2022")).length;

  return (
    <div className="space-y-8">
      {/* Mahasiswa Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Data Mahasiswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Mahasiswa" value={totalMahasiswa} icon="🎓" color="blue" />
          <Card title="Aktif" value={aktifMahasiswa} icon="✅" color="green" />
          <Card title="Non-Aktif" value={nonAktifMahasiswa} icon="❌" color="red" />
          <Card title="Mahasiswa Baru" value={mahasiswaBaru} icon="🆕" color="purple" />
          <Card
            title="Statistik Kelulusan"
            value="0%"
            icon="📊"
            color="orange"
            className="h-32"
          />
        </div>
      </div>

      {/* Dosen Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Data Dosen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Total Dosen" value={totalDosen} icon="👨‍🏫" color="blue" />
          <Card title="Aktif" value={aktifDosen} icon="✅" color="green" />
          <Card title="Non-Aktif" value={nonAktifDosen} icon="❌" color="red" />
          <Card title="Dosen Baru" value={dosenBaru} icon="🆕" color="purple" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;