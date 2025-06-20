import { useEffect, useState } from "react";
import axios from "../../Utils/AxiosInstance";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  const updateRole = async (id, role) => {
    await axios.patch(`/users/${id}`, { role });
    fetchUsers();
  };

  const updatePermission = async (id, permissions) => {
    await axios.patch(`/users/${id}`, { permissions });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2>Manajemen User</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name} - {user.role}</p>
          <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value)}>
            <option value="admin">admin</option>
            <option value="dosen">dosen</option>
            <option value="mahasiswa">mahasiswa</option>
          </select>
          <input
            type="text"
            defaultValue={user.permissions.join(",")}
            onBlur={(e) => updatePermission(user.id, e.target.value.split(",").map(p => p.trim()))}
          />
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
