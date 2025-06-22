import React from "react";
import Modal from "../../../components/molecules/Modal.js";
import Button from "../../../components/atoms/Button";
import Select from "react-select";

const ModalKelas = ({
  isOpen,
  isEdit,
  form,
  matakuliah,
  dosen,
  mahasiswa,
  onChange,
  onSelectMahasiswa,
  onSubmit,
  onClose,
  getTotalSKSFor,
  message,
}) => {
  const mahasiswaOptions = mahasiswa.map((m) => ({
    value: m.id,
    label: `${m.nama} (SKS: ${getTotalSKSFor((k) => k.mahasiswaIds.includes(m.id))}/${m.maxSks})`,
  }));

  const selectedMahasiswa = mahasiswaOptions.filter((opt) =>
    form.mahasiswaIds.includes(opt.value)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">
          {isEdit ? "Edit Kelas" : "Tambah Kelas"}
        </h3>

        {/* Mata Kuliah */}
        <select
          className="block w-full p-2 border"
          name="matakuliahId"
          value={form.matakuliahId}
          onChange={onChange}
        >
          <option value="">-- Pilih Mata Kuliah --</option>
          {matakuliah.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama} ({m.sks} SKS)
            </option>
          ))}
        </select>

        {/* Dosen */}
        <select
          className="block w-full p-2 border"
          name="dosenId"
          value={form.dosenId}
          onChange={onChange}
        >
          <option value="">-- Pilih Dosen --</option>
          {dosen.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nama} (SKS: {getTotalSKSFor((k) => k.dosenId === d.id)}/{d.maxSks})
            </option>
          ))}
        </select>

        {/* Mahasiswa Multi-select */}
        <div>
          <label className="block mb-1 font-medium">Pilih Mahasiswa</label>
          <Select
            isMulti
            options={mahasiswaOptions}
            value={selectedMahasiswa}
            onChange={onSelectMahasiswa}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Pesan error */}
        {message && <p className="text-red-600">{message}</p>}

        {/* Tombol */}
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="bg-gray-400" type="button">
            Batal
          </Button>
          <Button type="submit" className="bg-blue-600">
            {isEdit ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalKelas;
