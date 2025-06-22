import React, { useEffect, useState } from "react";
import {
  useKelasData,
  useMatakuliahData,
  useDosenData,
  useMahasiswaData,
  useCreateKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "../../../Utils/hooks/useKelas";

const Kelas = () => {
  const { data: kelas = [] } = useKelasData();
  const { data: matakuliah = [] } = useMatakuliahData();
  const { data: dosen = [] } = useDosenData();
  const { data: mahasiswa = [] } = useMahasiswaData();

  const createKelas = useCreateKelas();
  const updateKelas = useUpdateKelas();
  const deleteKelas = useDeleteKelas();

  const [form, setForm] = useState({
    id: "",
    matakuliahId: "",
    dosenId: "",
    mahasiswaIds: [],
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = () => {
    setForm({ id: "", matakuliahId: "", dosenId: "", mahasiswaIds: [] });
    setIsEditing(false);
    setMessage("");
  };

  const getMatakuliahName = (id) => matakuliah.find((m) => m.id === id)?.nama || "-";
  const getDosenName = (id) => dosen.find((d) => d.id === id)?.nama || "-";
  const getMahasiswaNames = (ids) =>
    ids.map((id) => mahasiswa.find((m) => m.id === id)?.nama || "-").join(", ");

  const getTotalSKSFor = (predicate) =>
    kelas
      .filter(predicate)
      .reduce((sum, k) => {
        const mk = matakuliah.find((m) => m.id === k.matakuliahId);
        return sum + (mk?.sks || 0);
      }, 0);

  const handleCheckboxChange = (id) => {
    setForm((prev) => ({
      ...prev,
      mahasiswaIds: prev.mahasiswaIds.includes(id)
        ? prev.mahasiswaIds.filter((m) => m !== id)
        : [...prev.mahasiswaIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mk = matakuliah.find((m) => m.id === form.matakuliahId);
    const dsn = dosen.find((d) => d.id === form.dosenId);

    if (!mk || !dsn) return setMessage("Mata kuliah dan dosen harus dipilih.");

    if (!isEditing && getTotalSKSFor((k) => k.dosenId === dsn.id) + mk.sks > dsn.maxSks) {
      return setMessage(`Dosen ${dsn.nama} melebihi batas SKS`);
    }

    for (const mId of form.mahasiswaIds) {
      const mhs = mahasiswa.find((m) => m.id === mId);
      const total = getTotalSKSFor((k) => k.mahasiswaIds.includes(mId));
      const sudahAmbil = kelas.some(
        (k) => k.mahasiswaIds.includes(mId) && k.matakuliahId === mk.id && k.id !== form.id
      );
      if (sudahAmbil) return setMessage(`${mhs?.nama} sudah ambil mata kuliah ini.`);
      if (!isEditing && total + mk.sks > mhs.maxSks)
        return setMessage(`${mhs?.nama} melebihi batas SKS.`);
    }

    if (isEditing) {
      await updateKelas.mutateAsync({ id: form.id, data: form });
    } else {
      await createKelas.mutateAsync({ ...form, id: `kelas-${Date.now()}` });
    }

    resetForm();
    setMessage("Kelas berhasil disimpan.");
  };

  const handleEdit = (data) => {
    setForm(data);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await deleteKelas.mutateAsync(id);
    resetForm();
    setMessage("Kelas berhasil dihapus.");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Kelas</h2>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{isEditing ? "Edit" : "Tambah"} Kelas</h3>

        <select
          className="block w-full p-2 mb-2"
          value={form.matakuliahId}
          onChange={(e) => setForm({ ...form, matakuliahId: e.target.value })}
        >
          <option value="">-- Pilih Mata Kuliah --</option>
          {matakuliah.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama} ({m.sks} SKS)
            </option>
          ))}
        </select>

        <select
          className="block w-full p-2 mb-2"
          value={form.dosenId}
          onChange={(e) => setForm({ ...form, dosenId: e.target.value })}
        >
          <option value="">-- Pilih Dosen --</option>
          {dosen.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nama} (SKS: {getTotalSKSFor((k) => k.dosenId === d.id)}/{d.maxSks})
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2 mb-2">
          {mahasiswa.map((m) => (
            <label key={m.id} className="flex items-center">
              <input
                type="checkbox"
                checked={form.mahasiswaIds.includes(m.id)}
                onChange={() => handleCheckboxChange(m.id)}
              />
              <span className="ml-2">
                {m.nama} (SKS: {getTotalSKSFor((k) => k.mahasiswaIds.includes(m.id))}/{m.maxSks})
              </span>
            </label>
          ))}
        </div>

        {message && <p className="text-red-600 mt-2">{message}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
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
