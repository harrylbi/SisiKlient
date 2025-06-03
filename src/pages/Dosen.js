import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Modal from "../components/molecules/Modal";
import FormDosen from "../components/molecules/FormDosen"; // pastikan file ini tersedia
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";

const Dosen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dosen, setDosen] = useState([]);
  const [editData, setEditData] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("dosen");
    if (savedData && JSON.parse(savedData).length > 0) {
      setDosen(JSON.parse(savedData));
    } else {
      const dummyData = [
        { nidn: "2022001", nama: "Dr. Budi", status: true },
        { nidn: "2022002", nama: "Dr. Siti", status: false },
        { nidn: "2022003", nama: "Dr. Andi", status: true },
      ];
      setDosen(dummyData);
      localStorage.setItem("dosen", JSON.stringify(dummyData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dosen", JSON.stringify(dosen));
  }, [dosen]);

  const addDosen = (newData) => {
    if (!newData.nidn || !newData.nama) {
      toast.error("NIDN dan Nama harus diisi!");
      return;
    }

    const exist = dosen.find((d) => d.nidn === newData.nidn);
    if (exist) {
      toast.error("NIDN sudah digunakan!");
      return;
    }

    setDosen([...dosen, newData]);
    setIsModalOpen(false);
    toast.success("Dosen berhasil ditambahkan!");
  };

  const updateDosen = async (updatedData) => {
    if (!updatedData.nidn || !updatedData.nama) {
      toast.error("NIDN dan Nama harus diisi!");
      return;
    }

    const isSameNIDN = editData?.nidn === updatedData.nidn;
    const exist = dosen.find(
      (d) => d.nidn === updatedData.nidn && !isSameNIDN
    );
    if (exist) {
      toast.error("NIDN sudah digunakan oleh dosen lain!");
      return;
    }

    const result = await Swal.fire({
      title: `Yakin ingin mengupdate data dosen NIDN ${editData?.nidn}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, update!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setDosen(dosen.map((d) => (d.nidn === editData.nidn ? updatedData : d)));
      setIsModalOpen(false);
      setEditData(null);
      toast.success("Data dosen berhasil diperbarui!");
    }
  };

  const deleteDosen = async (nidn) => {
    const d = dosen.find((item) => item.nidn === nidn);
    const result = await Swal.fire({
      title: `Yakin ingin menghapus dosen "${d?.nama}" (NIDN: ${nidn})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setDosen(dosen.filter((d) => d.nidn !== nidn));
      toast.success("Data dosen berhasil dihapus!");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Dosen</h2>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Tambah Dosen
        </Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIDN</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dosen.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Belum ada data dosen
              </td>
            </tr>
          ) : (
            dosen.map((d) => (
              <tr key={d.nidn} className="even:bg-gray-100 odd:bg-white">
                <td className="py-2 px-4">{d.nidn}</td>
                <td className="py-2 px-4">{d.nama}</td>
                <td className="py-2 px-4">
                  {d.status ? "Aktif" : "Tidak Aktif"}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={async () => {
                      const confirmEdit = await Swal.fire({
                        title: `Edit data dosen "${d.nama}"?`,
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Batal",
                      });
                      if (confirmEdit.isConfirmed) {
                        setEditData(d);
                        setIsModalOpen(true);
                        toast.info("Silakan edit data dosen.");
                      }
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteDosen(d.nidn)}
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
        <FormDosen
          onSubmit={editData ? updateDosen : addDosen}
          editData={editData}
        />
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dosen;
