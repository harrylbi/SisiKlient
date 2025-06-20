// src/pages/EditUserRole.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditUserRole = () => {
  const { id } = useParams(); // ambil ID user dari URL
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);

  const allPermissions = ["create", "read", "update", "delete"];

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`).then((res) => {
      setUser(res.data);
      setRole(res.data.role);
      setPermissions(res.data.permissions);
    });
  }, [id]);

  const togglePermission = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter((p) => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/users/${id}`, {
      ...user,
      role,
      permissions,
    });
    alert("Role dan permission berhasil diubah!");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Role & Permissions</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium">Role</label>
          <select
            className="border rounded p-2 w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="dosen">Dosen</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Permissions</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allPermissions.map((perm) => (
              <label key={perm} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={permissions.includes(perm)}
                  onChange={() => togglePermission(perm)}
                />
                <span>{perm}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditUserRole;
