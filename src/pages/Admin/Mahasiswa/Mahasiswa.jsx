import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Button from "../../../components/atoms/Button";
import TableMahasiswa from "./TableMahasiswa";
import ModalMahasiswa from "./ModalMahasiswa";

import { ToastContainer } from "react-toastify";
import {
  toastSuccess,
  toastError,
} from "../../../Utils/Helpers/ToastHelpers.jsx";
import {
  confirmDelete,
  confirmUpdate,
} from "../../../Utils/Helpers/SwalHelpers.jsx";

import "sweetalert2/dist/sweetalert2.min.css";

import { useMahasiswa } from "../../../Utils/hooks/useMahasiswa.js";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: "",
    nim: "",
    nama: "",
    status: true,
  });

  const {
    mahasiswaQuery,
    tambahMahasiswa,
    ubahMahasiswa,
    hapusMahasiswa,
  } = useMahasiswa();

  const resetForm = () => {
    setForm({ id: "", nim: "", nama: "", status: true });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openEditModal = (mhs) => {
    setForm({
      id: mhs.id,
      nim: mhs.nim,
      nama: mhs.nama,
      status: mhs.status,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    try {
      if (isEdit) {
        confirmUpdate(async () => {
          await ubahMahasiswa.mutateAsync({
            id: form.id,
            data: {
              nim: form.nim,
              nama: form.nama,
              status: form.status,
            },
          });
          toastSuccess("Data berhasil diperbarui");
          resetForm();
        });
      } else {
        await tambahMahasiswa.mutateAsync({
          id: uuidv4(),
          nim: form.nim,
          nama: form.nama,
          status: form.status,
        });
        toastSuccess("Data berhasil ditambahkan");
        resetForm();
      }
    } catch (error) {
      toastError("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await hapusMahasiswa.mutateAsync(id);
        toastSuccess("Data berhasil dihapus");
      } catch {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          + Tambah Mahasiswa
        </Button>
      </div>

      {/* Handle loading & error */}
      {mahasiswaQuery.isLoading ? (
        <p>Memuat data mahasiswa...</p>
      ) : mahasiswaQuery.isError ? (
        <p className="text-red-600">
          Gagal memuat data: {mahasiswaQuery.error.message}
        </p>
      ) : (
        <TableMahasiswa
          data={mahasiswaQuery.data}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
        />
      )}

      <ModalMahasiswa
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

export default Mahasiswa;
