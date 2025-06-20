const ModalDosen = ({ isOpen, isEdit, form, onChange, onSubmit, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Dosen" : "Tambah Dosen"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">NIDN</label>
            <input
              type="text"
              name="nidn"
              value={form.nidn}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalDosen;
