// src/pages/Admin/Matakuliah/ModalMatakuliah.jsx
import React from "react";
import Modal from "../../../components/molecules/Modal.js";
import Button from "../../../components/atoms/Button";

const ModalMatakuliah = ({ isOpen, isEdit, form, onChange, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">
          {isEdit ? "Edit Matakuliah" : "Tambah Matakuliah"}
        </h3>

        <input
          type="text"
          name="kode"
          value={form.kode}
          onChange={onChange}
          placeholder="Kode Matkul"
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={onChange}
          placeholder="Nama Matkul"
          className="border p-2 w-full"
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} className="bg-gray-400">
            Batal
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEdit ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalMatakuliah;
