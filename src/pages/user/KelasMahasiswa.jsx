import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const KelasMahasiswa = () => {
  const { user, isLoading } = useAuth();

  const [kelas, setKelas] = useState([]);
  const [matakuliah, setMatakuliah] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [resKelas, resMatkul, resDosen] = await Promise.all([
        axios.get("http://localhost:3001/kelas"),
        axios.get("http://localhost:3001/matakuliah"),
        axios.get("http://localhost:3001/dosen"),
      ]);

      setKelas(resKelas.data);
      setMatakuliah(resMatkul.data);
      setDosen(resDosen.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Gagal mengambil data kelas.");
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchData();
    }
  }, [isLoading, user]);

  const getMatkul = (id) => matakuliah.find((m) => m.id === id)?.nama || "-";
  const getDosen = (id) => dosen.find((d) => d.id === id)?.nama || "-";

  if (isLoading) return <p className="p-6">Memuat data pengguna...</p>;

  if (!user) return <p className="p-6 text-red-600">User tidak ditemukan atau belum login.</p>;

  if (error) return <p className="p-6 text-red-600">{error}</p>;

  // ✅ Gunakan `user.mahasiswaId` (misal: "mhs-2")
  const kelasSaya = kelas.filter((k) => k.mahasiswaIds.includes(user.mahasiswaId));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Kelas Saya</h2>
      {kelasSaya.length === 0 ? (
        <p className="text-gray-600">Anda belum mengambil kelas apa pun.</p>
      ) : (
        <table className="table-auto w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">#</th>
              <th className="p-2">Mata Kuliah</th>
              <th className="p-2">Dosen</th>
            </tr>
          </thead>
          <tbody>
            {kelasSaya.map((kls, i) => (
              <tr key={kls.id} className="border-t">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{getMatkul(kls.matakuliahId)}</td>
                <td className="p-2">{getDosen(kls.dosenId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KelasMahasiswa;
