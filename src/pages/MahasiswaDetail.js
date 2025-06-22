import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import { getMahasiswa } from "../Utils/Apis/MahasiswaApi.jsx";
import { toastError } from "../Utils/Helpers/ToastHelpers.jsx";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMahasiswa = useCallback(async () => {
    try {
      const res = await getMahasiswa(id);
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMahasiswa();
  }, [fetchMahasiswa]);

  if (loading) {
    return <p className="text-center">Memuat data...</p>;
  }

  if (!mahasiswa) {
    return <p className="text-center text-red-600">Data mahasiswa tidak ditemukan</p>;
  }

  return (
    <div className="bg-white max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Detail Mahasiswa</h1>

      <div className="space-y-4 text-gray-800 text-base">
        <div>
          <span className="font-semibold text-gray-600">NIM:</span>
          <div className="bg-gray-100 px-4 py-2 rounded">{mahasiswa.nim}</div>
        </div>

        <div>
          <span className="font-semibold text-gray-600">Nama:</span>
          <div className="bg-gray-100 px-4 py-2 rounded">{mahasiswa.nama}</div>
        </div>

        <div>
          <span className="font-semibold text-gray-600">Status:</span>
          <div
            className={`px-4 py-2 rounded ${
              mahasiswa.status
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {mahasiswa.status ? "Aktif" : "Tidak Aktif"}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali ke Daftar Mahasiswa
        </Button>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
