import React, { useEffect, useState } from "react";
import axios from "axios";

const Kelas = () => {
  const [kelas, setKelas] = useState([]);
  const [matakuliah, setMatakuliah] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({
    id: "",
    matakuliahId: "",
    dosenId: "",
    mahasiswaIds: [],
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchAll = async () => {
    const [resKelas, resMataKuliah, resDosen, resMahasiswa] = await Promise.all([
      axios.get("http://localhost:3001/kelas"),
      axios.get("http://localhost:3001/matakuliah"),
      axios.get("http://localhost:3001/dosen"),
      axios.get("http://localhost:3001/mahasiswa")
    ]);

    setKelas(resKelas.data);
    setMatakuliah(resMataKuliah.data);
    setDosen(resDosen.data);
    setMahasiswa(resMahasiswa.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const getMatakuliahName = (id) => matakuliah.find((m) => m.id === id)?.nama || "-";
  const getDosenName = (id) => dosen.find((d) => d.id === id)?.nama || "-";
  const getMahasiswaNames = (ids) =>
    ids.map((id) => mahasiswa.find((m) => m.id === id)?.nama || "-").join(", ");

  const getTotalSKSForMahasiswa = (mhsId) => {
    const kelasMhs = kelas.filter(k => k.mahasiswaIds.includes(mhsId));
    return kelasMhs.reduce((sum, kls) => {
      const matkul = matakuliah.find(m => m.id === kls.matakuliahId);
      return sum + (matkul?.sks || 0);
    }, 0);
  };

  const getTotalSKSForDosen = (dsnId) => {
    const kelasDosen = kelas.filter(k => k.dosenId === dsnId);
    return kelasDosen.reduce((sum, kls) => {
      const matkul = matakuliah.find(m => m.id === kls.matakuliahId);
      return sum + (matkul?.sks || 0);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const matkul = matakuliah.find(m => m.id === form.matakuliahId);
    const dosenTerpilih = dosen.find(d => d.id === form.dosenId);

    if (!matkul || !dosenTerpilih) {
      setMessage("Pilih mata kuliah dan dosen terlebih dahulu.");
      return;
    }

    const totalSksDosen = getTotalSKSForDosen(dosenTerpilih.id);
    if (!isEditing && (totalSksDosen + matkul.sks) > dosenTerpilih.maxSks) {
      setMessage(`Dosen ${dosenTerpilih.nama} melebihi batas SKS`);
      return;
    }

    for (const mhsId of form.mahasiswaIds) {
      const mhs = mahasiswa.find(m => m.id === mhsId);
      const totalSksMhs = getTotalSKSForMahasiswa(mhsId);
      const sudahAmbil = kelas.some(
        (k) => k.mahasiswaIds.includes(mhsId) && k.matakuliahId === matkul.id && k.id !== form.id
      );
      if (sudahAmbil) {
        setMessage(`Mahasiswa ${mhs.nama} sudah mengambil mata kuliah ini.`);
        return;
      }
      if (!isEditing && (totalSksMhs + matkul.sks) > mhs.maxSks) {
        setMessage(`Mahasiswa ${mhs.nama} melebihi batas SKS`);
        return;
      }
    }

    if (isEditing) {
      await axios.put(`http://localhost:3001/kelas/${form.id}`, form);
      setIsEditing(false);
    } else {
      await axios.post("http://localhost:3001/kelas", {
        ...form,
        id: `kelas-${Date.now()}`,
      });
    }

    setForm({ id: "", matakuliahId: "", dosenId: "", mahasiswaIds: [] });
    fetchAll();
    setMessage("Kelas berhasil disimpan.");
  };

  const handleCheckboxChange = (id) => {
    setForm((prev) => {
      const updated = prev.mahasiswaIds.includes(id)
        ? prev.mahasiswaIds.filter((m) => m !== id)
        : [...prev.mahasiswaIds, id];
      return { ...prev, mahasiswaIds: updated };
    });
  };

  const handleEdit = (kelasItem) => {
    setForm(kelasItem);
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/kelas/${id}`);
    fetchAll();
    setMessage("Kelas berhasil dihapus.");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Kelas</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{isEditing ? "Edit" : "Tambah"} Kelas</h3>

        <label className="block mb-2">
          Mata Kuliah:
          <select
            className="block w-full p-2 mt-1"
            value={form.matakuliahId}
            onChange={(e) => setForm({ ...form, matakuliahId: e.target.value })}
            required
          >
            <option value="">-- Pilih --</option>
            {matakuliah.map((m) => (
              <option key={m.id} value={m.id}>{m.nama} ({m.sks} SKS)</option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Dosen:
          <select
            className="block w-full p-2 mt-1"
            value={form.dosenId}
            onChange={(e) => setForm({ ...form, dosenId: e.target.value })}
            required
          >
            <option value="">-- Pilih --</option>
            {dosen.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nama} (SKS: {getTotalSKSForDosen(d.id)}/{d.maxSks})
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Mahasiswa:
          <div className="grid grid-cols-2 gap-2">
            {mahasiswa.map((m) => (
              <label key={m.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={form.mahasiswaIds.includes(m.id)}
                  onChange={() => handleCheckboxChange(m.id)}
                />
                <span className="ml-2">
                  {m.nama} (SKS: {getTotalSKSForMahasiswa(m.id)}/{m.maxSks})
                </span>
              </label>
            ))}
          </div>
        </label>

        {message && <p className="text-red-600 mt-2">{message}</p>}
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? "Perbarui" : "Simpan"} Kelas
        </button>
      </form>

      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">#</th>
            <th className="p-2">Mata Kuliah</th>
            <th className="p-2">Dosen</th>
            <th className="p-2">Mahasiswa</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((kls, i) => (
            <tr key={kls.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{getMatakuliahName(kls.matakuliahId)}</td>
              <td className="p-2">{getDosenName(kls.dosenId)}</td>
              <td className="p-2">{getMahasiswaNames(kls.mahasiswaIds)}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(kls)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(kls.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kelas;
