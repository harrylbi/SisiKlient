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

  if (isLoading)
    return <p className="p-6 text-lg font-mono text-yellow-900 bg-yellow-100 border-4 border-black shadow-[4px_4px_0px_black]">Memuat data pengguna...</p>;

  if (!user)
    return <p className="p-6 text-xl font-bold text-red-800 bg-red-100 border-4 border-black shadow-[4px_4px_0px_black]">User tidak ditemukan atau belum login.</p>;

  if (error)
    return <p className="p-6 text-xl font-bold text-red-800 bg-red-100 border-4 border-black shadow-[4px_4px_0px_black]">{error}</p>;

  const kelasSaya = kelas.filter((k) => k.mahasiswaIds.includes(user.mahasiswaId));

  return (
    <div className="p-6 bg-pink-100 border-4 border-black shadow-[6px_6px_0px_black]">
      <h2 className="text-4xl font-extrabold uppercase tracking-wider text-black mb-6">
        ✏️ Kelas Saya
      </h2>

      {kelasSaya.length === 0 ? (
        <p className="text-xl text-gray-800 font-bold bg-white border-4 border-black p-4 shadow-[3px_3px_0px_black]">
          Anda belum mengambil kelas apa pun.
        </p>
      ) : (
        <table className="w-full border-4 border-black bg-white shadow-[6px_6px_0px_black]">
          <thead className="bg-yellow-300 border-b-4 border-black">
            <tr>
              <th className="p-3 text-left text-black font-black uppercase border-r-4 border-black">#</th>
              <th className="p-3 text-left text-black font-black uppercase border-r-4 border-black">Mata Kuliah</th>
              <th className="p-3 text-left text-black font-black uppercase">Dosen</th>
            </tr>
          </thead>
          <tbody>
            {kelasSaya.map((kls, i) => (
              <tr key={kls.id} className="border-t-4 border-black">
                <td className="p-3 font-mono font-bold text-black border-r-4 border-black">{i + 1}</td>
                <td className="p-3 font-mono text-black border-r-4 border-black">{getMatkul(kls.matakuliahId)}</td>
                <td className="p-3 font-mono text-black">{getDosen(kls.dosenId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KelasMahasiswa;
