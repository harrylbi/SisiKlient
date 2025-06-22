import React, { useState } from "react";
import {
  useKelasData,
  useMatakuliahData,
  useDosenData,
  useMahasiswaData,
  useCreateKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "../../../Utils/hooks/useKelas";
import ModalKelas from "./ModalKelas";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetForm = () => {
    setForm({ id: "", matakuliahId: "", dosenId: "", mahasiswaIds: [] });
    setIsEditing(false);
    setMessage("");
    setIsModalOpen(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectMahasiswa = (selectedOptions) => {
    const ids = selectedOptions.map((opt) => opt.value);
    setForm((prev) => ({ ...prev, mahasiswaIds: ids }));
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
      if (!mhs) continue;

      const total = getTotalSKSFor((k) => k.mahasiswaIds.includes(mId));
      const sudahAmbil = kelas.some(
        (k) => k.mahasiswaIds.includes(mId) && k.matakuliahId === mk.id && k.id !== form.id
      );
      if (sudahAmbil) return setMessage(`${mhs.nama} sudah ambil mata kuliah ini.`);
      if (!isEditing && total + mk.sks > mhs.maxSks)
        return setMessage(`${mhs.nama} melebihi batas SKS.`);
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
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteKelas.mutateAsync(id);
    resetForm();
    setMessage("Kelas berhasil dihapus.");
  };

  return (
    <div className="p-6 bg-yellow-100 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">📚 Manajemen Kelas</h2>
        <button
          className="bg-green-400 hover:bg-green-500 text-black font-bold px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          + Tambah Kelas
        </button>
      </div>

      <table className="table-auto w-full border-4 border-black bg-white text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <thead className="bg-yellow-300 border-b-4 border-black">
          <tr>
            <th className="p-3 border-r-2 border-black">#</th>
            <th className="p-3 border-r-2 border-black">Mata Kuliah</th>
            <th className="p-3 border-r-2 border-black">Dosen</th>
            <th className="p-3 border-r-2 border-black">Mahasiswa</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((kls, i) => (
            <tr
              key={kls.id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="p-3 border-t-2 border-black">{i + 1}</td>
              <td className="p-3 border-t-2 border-black">
                {getMatakuliahName(kls.matakuliahId)}
              </td>
              <td className="p-3 border-t-2 border-black">{getDosenName(kls.dosenId)}</td>
              <td className="p-3 border-t-2 border-black">
                {getMahasiswaNames(kls.mahasiswaIds)}
              </td>
              <td className="p-3 border-t-2 border-black space-x-2">
                <button
                  onClick={() => handleEdit(kls)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black font-semibold px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(kls.id)}
                  className="bg-red-400 hover:bg-red-500 text-black border-2 border-black font-semibold px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {message && (
        <div className="mt-4 p-3 bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] font-mono">
          {message}
        </div>
      )}

      <ModalKelas
        isOpen={isModalOpen}
        isEdit={isEditing}
        form={form}
        matakuliah={matakuliah}
        dosen={dosen}
        mahasiswa={mahasiswa}
        onChange={handleChange}
        onSelectMahasiswa={handleSelectMahasiswa}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        getTotalSKSFor={getTotalSKSFor}
        message={message}
      />
    </div>
  );
};

export default Kelas;
