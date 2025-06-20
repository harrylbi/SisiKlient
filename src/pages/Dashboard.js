import React from "react";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {
  const { user, canAccess } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-4 text-gray-600">
        Selamat datang, <span className="font-semibold">{user?.name}</span>!
      </p>
{/* 
      <div className="space-y-3">
        {canAccess("read") && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p>📄 Anda memiliki akses untuk <strong>melihat data</strong>.</p>
          </div>
        )}

        {canAccess("create") && (
          <div className="p-4 bg-green-100 rounded-md">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              ➕ Tambah Data
            </button>
          </div>
        )}

        {canAccess("update") && (
          <div className="p-4 bg-yellow-100 rounded-md">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              ✏️ Edit Data
            </button>
          </div>
        )}

        {canAccess("delete") && (
          <div className="p-4 bg-red-100 rounded-md">
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              🗑️ Hapus Data
            </button>
          </div>
        )}

        {!user?.permissions?.length && (
          <p className="text-sm text-red-500">❌ Anda tidak memiliki permission apapun.</p>
        )}
      </div> */}
    </div>
  );
};

export default Dashboard;
