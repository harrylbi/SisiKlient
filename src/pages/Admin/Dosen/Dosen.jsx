import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../../../Utils/Apis/DosenApi.jsx";
import TableDosen from "./TableDosen";
import ModalDosen from "./ModalDosen";
import Button from "../../../components/atoms/Button";
import { ToastContainer } from "react-toastify";
import { toastSuccess, toastError } from "../../../Utils/Helpers/ToastHelpers.jsx";
import { confirmDelete, confirmUpdate } from "../../../Utils/Helpers/SwalHelpers.jsx";

const Dosen = () => {
  const [dosen, setDosen] = useState([]);
  const [form, setForm] = useState({ id: "", nidn: "", nama: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDosen = async () => {
    try {
      const res = await getAllDosen();
      setDosen(res.data);
    } catch {
      toastError("Gagal mengambil data dosen");
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const resetForm = () => {
    setForm({ id: "", nidn: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nidn || !form.nama) {
      toastError("NIDN dan Nama wajib diisi");
      return;
    }

    try {
      if (isEdit) {
        confirmUpdate(async () => {
          await updateDosen(form.id, form);
          toastSuccess("Data berhasil diperbarui");
          resetForm();
          fetchDosen();
        });
        } else {
        await storeDosen({
            id: uuidv4(),
            nidn: form.nidn,
            nama: form.nama,
        });
        toastSuccess("Data berhasil ditambahkan");
        resetForm();
        fetchDosen();
        }

    } catch {
      toastError("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteDosen(id);
        toastSuccess("Data berhasil dihapus");
        fetchDosen();
      } catch {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Dosen</h2>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsModalOpen(true)}>
          + Tambah Dosen
        </Button>
      </div>

      <TableDosen data={dosen} onEdit={(d) => {
        setForm(d);
        setIsEdit(true);
        setIsModalOpen(true);
      }} onDelete={handleDelete} />

      <ModalDosen
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

export default Dosen;
