import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const FormDosen = ({ onSubmit, editData, onClose }) => {
  const [formData, setFormData] = useState({
    nidn: "",
    nama: "",
    status: true,
  });

  const [errors, setErrors] = useState({});
  const [oldNidn, setOldNidn] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nidn, nama, status } = formData;

    let validationErrors = {};
    if (!nidn) validationErrors.nidn = "NIDN harus diisi!";
    else if (nidn.length < 4) validationErrors.nidn = "NIDN minimal 4 karakter";

    if (!nama) validationErrors.nama = "Nama harus diisi!";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const updatedData = { nidn, nama, status };

    if (editData) {
      onSubmit({ ...updatedData, oldNidn });
    } else {
      onSubmit(updatedData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ nidn: "", nama: "", status: true });
    setOldNidn("");
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        nidn: editData.nidn,
        nama: editData.nama,
        status: editData.status,
      });
      setOldNidn(editData.nidn);
    } else {
      resetForm();
    }
  }, [editData]);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* NIDN */}
      <div>
        <Label htmlFor="nidn">NIDN</Label>
        <Input
          type="text"
          id="nidn"
          value={formData.nidn}
          onChange={handleChange}
          className={`border ${errors.nidn ? "border-red-500" : "border-gray-300"} rounded p-2 w-full`}
          required
        />
        {errors.nidn && <p className="text-red-500 text-sm">{errors.nidn}</p>}
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

FormDosen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    nidn: PropTypes.string,
    nama: PropTypes.string,
    status: PropTypes.bool,
  }),
  onClose: PropTypes.func,
};

export default FormDosen;
