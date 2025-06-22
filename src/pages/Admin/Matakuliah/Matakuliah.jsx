import React, { useState } from "react";
import Button from "../../../components/atoms/Button";
import { ToastContainer } from "react-toastify";

import {
  toastSuccess,
  toastError,
} from "../../../Utils/Helpers/ToastHelpers";
import {
  confirmDelete,
  confirmUpdate,
} from "../../../Utils/Helpers/SwalHelpers";

import { useMatakuliah } from "../../../Utils/hooks/useMatakuliah";

const Matakuliah = () => {
  const [form, setForm] = useState({ id: "", kode: "", nama: "" });
  const [isEdit, setIsEdit] = useState(false);

  const {
    matakuliahQuery,
    tambahMatakuliah,
    ubahMatakuliah,
    hapusMatakuliah,
  } = useMatakuliah();

  const resetForm = () => {
    setForm({ id: "", kode: "", nama: "" });
    setIsEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.kode || !form.nama) {
      toastError("Kode dan Nama wajib diisi");
      return;
    }

    try {
      if (isEdit) {
        confirmUpdate(async () => {
          await ubahMatakuliah.mutateAsync({
            id: form.id,
            data: {
              kode: form.kode,
              nama: form.nama,
            },
          });
          toastSuccess("Berhasil diperbarui");
          resetForm();
        });
      } else {
        await tambahMatakuliah.mutateAsync({
          kode: form.kode,
          nama: form.nama,
        });
        toastSuccess("Berhasil ditambahkan");
        resetForm();
      }
    } catch {
      toastError("Gagal menyimpan data");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await hapusMatakuliah.mutateAsync(id);
        toastSuccess("Berhasil dihapus");
      } catch {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Daftar Matakuliah</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="kode"
          value={form.kode}
          onChange={handleChange}
          placeholder="Kode"
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama"
          className="border p-2 w-full"
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEdit ? "Update" : "Tambah"}
        </Button>
      </form>

      {matakuliahQuery.isLoading ? (
        <p>Loading...</p>
      ) : matakuliahQuery.isError ? (
        <p>Gagal memuat data</p>
      ) : (
        <ul className="space-y-2">
          {matakuliahQuery.data.map((mk) => (
            <li
              key={mk.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>
                {mk.kode} - {mk.nama}
              </span>
              <div className="space-x-2">
                <Button
                  className="bg-yellow-500"
                  onClick={() => {
                    setForm(mk);
                    setIsEdit(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => handleDelete(mk.id)}
                >
                  Hapus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Matakuliah;
