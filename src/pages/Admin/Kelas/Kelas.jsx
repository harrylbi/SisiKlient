import React, { useEffect, useState } from "react";
import Select from "react-select";
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manajemen Kelas</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          + Tambah Kelas
        </button>
      </div>

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
