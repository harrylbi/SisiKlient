// src/pages/Admin/Matakuliah/Matakuliah.jsx
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
import ModalMatakuliah from "./ModalMatakuliah";

const Matakuliah = () => {
  const [form, setForm] = useState({ id: "", kode: "", nama: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    matakuliahQuery,
    tambahMatakuliah,
    ubahMatakuliah,
    hapusMatakuliah,
  } = useMatakuliah();

  const resetForm = () => {
    setForm({ id: "", kode: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(false);
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Matakuliah</h2>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          + Tambah Matakuliah
        </Button>
      </div>

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
                    setIsModalOpen(true);
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

      <ModalMatakuliah
        isOpen={isModalOpen}
        isEdit={isEdit}
        form={form}
        onChange={handleChange}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Matakuliah;
