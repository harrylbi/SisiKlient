const ModalDosen = ({ isOpen, isEdit, form, onChange, onSubmit, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white text-black p-6 rounded-md border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Dosen" : "Tambah Dosen"}
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">NIDN</label>
            <input
              type="text"
              name="nidn"
              value={form.nidn}
              onChange={onChange}
              className="w-full border-2 border-black px-3 py-2 rounded-sm bg-white text-black"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={onChange}
              className="w-full border-2 border-black px-3 py-2 rounded-sm bg-white text-black"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-green-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalDosen;
