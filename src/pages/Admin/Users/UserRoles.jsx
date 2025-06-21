import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsers, updateUserRole } from "../../../Utils/Apis/UserApis";

const roles = ["admin", "user", "mahasiswa"];

const UserRoles = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      toast.error("Gagal memuat data user");
    }
  };

  const handleChangeRole = async (id, newRole) => {
    try {
      await updateUserRole(id, { role: newRole });
      toast.success("Role berhasil diperbarui");
      fetchUsers(); // refresh data
    } catch {
      toast.error("Gagal mengubah role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manajemen Role Pengguna</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">
                <select
                  value={u.role}
                  onChange={(e) => handleChangeRole(u.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRoles;
