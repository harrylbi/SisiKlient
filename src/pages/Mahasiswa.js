import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormMahasiswa from "../components/molecules/FormMahasiswa";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";

const Mahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("mahasiswa");
    if (savedData && JSON.parse(savedData).length > 0) {
      setMahasiswa(JSON.parse(savedData));
    } else {
      const dummyData = [
        { nim: "A11.2022.14640", nama: "Octaviana Sholikhah", status: true },
        { nim: "A11.2022.14641", nama: "Tugasku", status: false },
        { nim: "A11.2022.14642", nama: "Harry", status: false },
      ];
      setMahasiswa(dummyData);
      localStorage.setItem("mahasiswa", JSON.stringify(dummyData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  const addMahasiswa = (newData) => {
    if (!newData.nim || !newData.nama) {
      toast.error("NIM dan Nama harus diisi!");
      return;
    }

    const exist = mahasiswa.find((mhs) => mhs.nim === newData.nim);
    if (exist) {
      toast.error("NIM sudah digunakan!");
      return;
    }

    setMahasiswa([...mahasiswa, newData]);
    setIsModalOpen(false);
    toast.success("Mahasiswa berhasil ditambahkan!");
  };

  const updateMahasiswa = async (updatedData) => {
    if (!updatedData.nim || !updatedData.nama) {
      toast.error("NIM dan Nama harus diisi!");
      return;
    }

    const isSameNIM = editData?.nim === updatedData.nim;
    const exist = mahasiswa.find(
      (mhs) => mhs.nim === updatedData.nim && !isSameNIM
    );
    if (exist) {
      toast.error("NIM sudah digunakan oleh mahasiswa lain!");
      return;
    }

    const result = await Swal.fire({
      title: `Yakin ingin mengupdate data mahasiswa NIM ${editData?.nim}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setMahasiswa(
        mahasiswa.map((mhs) =>
          mhs.nim === editData.nim ? updatedData : mhs
        )
      );
      setIsModalOpen(false);
      setEditData(null);
      toast.success("Data mahasiswa berhasil diperbarui!");
    }
  };

  const deleteMahasiswa = async (nim) => {
    const mhs = mahasiswa.find((m) => m.nim === nim);
    const result = await Swal.fire({
      title: `Yakin ingin menghapus data mahasiswa "${mhs?.nama}" (NIM: ${nim})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setMahasiswa(mahasiswa.filter((item) => item.nim !== nim));
      toast.success("Data mahasiswa berhasil dihapus!");
    }
  };

  return (
<div className="bg-white border-4 border-black p-6 font-mono text-black">
  <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-2">
    <h2 className="text-2xl font-extrabold uppercase">Daftar Mahasiswa</h2>
    <Button
      className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold border-2 border-black"
      onClick={() => {
        setEditData(null);
        setIsModalOpen(true);
      }}
    >
      + Tambah Mahasiswa
    </Button>
  </div>

  <table className="w-full border-collapse border-2 border-black">
    <thead className="bg-black text-white">
      <tr>
        <th className="py-2 px-4 border-2 border-black">NIM</th>
        <th className="py-2 px-4 border-2 border-black">Nama</th>
        <th className="py-2 px-4 border-2 border-black">Status</th>
        <th className="py-2 px-4 border-2 border-black">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {mahasiswa.length === 0 ? (
        <tr>
          <td colSpan="4" className="text-center py-6 border-2 border-black">
            <span className="text-red-600 font-bold">Belum ada data mahasiswa</span>
          </td>
        </tr>
      ) : (
        mahasiswa.map((mhs) => (
          <tr key={mhs.nim} className="even:bg-white odd:bg-gray-200 border-2 border-black">
            <td className="py-2 px-4 border-2 border-black">{mhs.nim}</td>
            <td className="py-2 px-4 border-2 border-black">{mhs.nama}</td>
            <td className="py-2 px-4 border-2 border-black">
              {mhs.status ? "Aktif" : "Tidak Aktif"}
            </td>
            <td className="py-2 px-4 text-center space-x-2 border-2 border-black">
              <Button
                className="bg-white text-black border-2 border-black hover:bg-gray-100"
                onClick={() =>
                  navigate(`/admin/mahasiswa/${mhs.nim}`, { state: mhs })
                }
              >
                Detail
              </Button>
              <Button
                className="bg-yellow-300 text-black border-2 border-black hover:bg-yellow-400"
                onClick={async () => {
                  const confirmEdit = await Swal.fire({
                    title: `Edit data mahasiswa "${mhs.nama}"?`,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Batal",
                  });
                  if (confirmEdit.isConfirmed) {
                    setEditData(mhs);
                    setIsModalOpen(true);
                    toast.info("Silakan edit data mahasiswa.");
                  }
                }}
              >
                Edit
              </Button>
              <Button
                className="bg-red-600 text-white border-2 border-black hover:bg-red-700"
                onClick={() => deleteMahasiswa(mhs.nim)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>

  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <FormMahasiswa
      onSubmit={editData ? updateMahasiswa : addMahasiswa}
      editData={editData}
    />
  </Modal>

  <ToastContainer position="top-right" autoClose={3000} />
</div>

  );
};

export default Mahasiswa;
