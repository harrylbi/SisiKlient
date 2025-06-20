import React from "react";
import Modal from "../../../components/molecules/Modal.js"; // Pastikan ini adalah komponen modal kamu
import Button from "../../../components/atoms/Button.js";

const ModalMahasiswa = ({ isOpen, isEdit, form, onChange, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Mahasiswa" : "Tambah Mahasiswa"}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">NIM</label>
          <input
            type="text"
            name="nim"
            value={form.nim}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Aktif</label>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="danger" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            {isEdit ? "Update" : "Simpan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalMahasiswa;
