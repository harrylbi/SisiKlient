import { useEffect, useState } from "react";
import axios from "../../Utils/AxiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionInputs, setPermissionInputs] = useState({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/users");
      setUsers(res.data);
      const permState = {};
      res.data.forEach(user => {
        permState[user.id] = user.permissions?.join(",") || "";
      });
      setPermissionInputs(permState);
    } catch (err) {
      alert("❌ Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`/users/${id}`, { role });
      fetchUsers();
    } catch {
      alert("❌ Gagal mengubah role");
    }
  };

  const updatePermission = async (id) => {
    try {
      const permissions = permissionInputs[id]
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      await axios.patch(`/users/${id}`, { permissions });
      fetchUsers();
    } catch {
      alert("❌ Gagal mengubah permissions");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="bg-black text-lime-300 font-mono text-2xl p-6 border-4 border-lime-300 shadow-[6px_6px_0px_lime] inline-block">
        🔄 LOADING...
      </div>
    );

  return (
    <div className="p-10 bg-yellow-50 border-4 border-black shadow-[8px_8px_0px_black] font-mono uppercase text-black">
      <h1 className="text-4xl font-extrabold mb-8 underline decoration-4 decoration-black bg-pink-300 inline-block px-2 py-1 border-4 border-black shadow-[4px_4px_0px_black]">
        🧨 Manajemen User
      </h1>

      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-6 bg-lime-200 border-4 border-black shadow-[6px_6px_0px_black] hover:bg-lime-300 transition-all duration-200"
          >
            <div className="text-xl font-bold mb-3">
              👤 {user.name}{" "}
              <span className="bg-black text-white px-2 py-1 ml-2">
                {user.email}
              </span>{" "}
              <span className="ml-2 italic">(Role: {user.role})</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={user.role}
                onChange={(e) => updateRole(user.id, e.target.value)}
                className="bg-white text-black border-4 border-black shadow-[4px_4px_0px_black] px-4 py-2 font-bold"
              >
                <option value="admin">admin</option>
                <option value="dosen">dosen</option>
                <option value="mahasiswa">mahasiswa</option>
              </select>

              <input
                type="text"
                value={permissionInputs[user.id] || ""}
                onChange={(e) =>
                  setPermissionInputs((prev) => ({
                    ...prev,
                    [user.id]: e.target.value,
                  }))
                }
                className="border-4 border-black shadow-[4px_4px_0px_black] px-4 py-2 w-full sm:w-1/2"
                placeholder="izin1, izin2"
              />

              <button
                onClick={() => updatePermission(user.id)}
                className="bg-blue-400 hover:bg-blue-600 text-black border-4 border-black font-extrabold px-5 py-2 shadow-[4px_4px_0px_black] transition-all duration-150"
              >
                💾 SIMPAN IZIN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
