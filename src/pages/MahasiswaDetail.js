import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state;

  return (
    <div className="bg-yellow-100 border-4 border-black max-w-xl mx-auto mt-10 p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-black underline">
        DETAIL MAHASISWA
      </h1>

      {data ? (
        <div className="space-y-6 text-black text-lg font-mono">
          <div>
            <div className="font-bold uppercase mb-1">NIM:</div>
            <div className="border-2 border-black bg-white px-4 py-2">{data.nim}</div>
          </div>

          <div>
            <div className="font-bold uppercase mb-1">Nama:</div>
            <div className="border-2 border-black bg-white px-4 py-2">{data.nama}</div>
          </div>

          <div>
            <div className="font-bold uppercase mb-1">Status:</div>
            <div
              className={`border-2 px-4 py-2 font-bold ${
                data.status
                  ? "bg-green-400 border-black text-black"
                  : "bg-red-400 border-black text-black"
              }`}
            >
              {data.status ? "AKTIF" : "TIDAK AKTIF"}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-800 font-extrabold border-4 border-black p-4 bg-white mt-4">
          ❌ DATA MAHASISWA TIDAK TERSEDIA
        </div>
      )}

      <div className="mt-10">
        <Button
          className="bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black px-6 py-3 uppercase font-bold"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali ke Daftar Mahasiswa
        </Button>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
