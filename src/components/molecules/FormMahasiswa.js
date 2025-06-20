import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormMahasiswa = ({ onSubmit, editData, onClose }) => {
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    status: true,
  });

  const [errors, setErrors] = useState({});
  const [oldNim, setOldNim] = useState("");

  // Menangani perubahan input
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "status") {
      setFormData((prevData) => ({
        ...prevData,
        status: value === "true",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  // Validasi dan kirim data
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nim, nama, status } = formData;

    let validationErrors = {};
    if (!nim) validationErrors.nim = "NIM harus diisi!";
    else if (nim.length < 4) validationErrors.nim = "NIM minimal 4 karakter";

    if (!nama) validationErrors.nama = "Nama harus diisi!";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Reset error jika valid

    const updatedData = { nim, nama, status };

    if (editData) {
      onSubmit({ ...updatedData, oldNim });
    } else {
      onSubmit(updatedData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ nim: "", nama: "", status: true });
    setOldNim("");
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        nim: editData.nim,
        nama: editData.nama,
        status: editData.status,
      });
      setOldNim(editData.nim);
    } else {
      resetForm();
    }
  }, [editData]);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* NIM */}
      <div>
        <Label htmlFor="nim">NIM</Label>
        <Input
          type="text"
          id="nim"
          value={formData.nim}
          onChange={handleChange}
          className={`border ${errors.nim ? "border-red-500" : "border-gray-300"} rounded p-2 w-full`}
          required
        />
        {errors.nim && <p className="text-red-500 text-sm">{errors.nim}</p>}
      </div>

      {/* Nama */}
      <div>
        <Label htmlFor="nama">Nama</Label>
        <Input
          type="text"
          id="nama"
          value={formData.nama}
          onChange={handleChange}
          className={`border ${errors.nama ? "border-red-500" : "border-gray-300"} rounded p-2 w-full`}
          required
        />
        {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          className="w-full border rounded p-2"
          value={formData.status ? "true" : "false"}
          onChange={handleChange}
        >
          <option value="true">Aktif</option>
          <option value="false">Tidak Aktif</option>
        </select>
      </div>

      {/* Tombol */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button
          type="button"
          className="bg-gray-400 text-white"
          onClick={handleCancel}
        >
          Batal
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {editData ? "Simpan Perubahan" : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

// ✅ Tambahkan PropTypes
FormMahasiswa.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    nim: PropTypes.string,
    nama: PropTypes.string,
    status: PropTypes.bool,
  }),
  onClose: PropTypes.func,
};

export default FormMahasiswa;
