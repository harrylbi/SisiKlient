const API_URL = "http://localhost:3001/users"; // ganti sesuai API kamu

export const getUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Gagal fetch users");
  return res.json();
};

export const updateUserRole = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update role");
  return res.json();
};
