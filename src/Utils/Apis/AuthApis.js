import axios from "../AxiosInstance";

// Helper untuk membersihkan data user (tanpa password)
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// Fungsi Login
export const login = async (email, password) => {
  try {
    // Cari user berdasarkan email
    const res = await axios.get("/users", { params: { email } });

    if (!res.data || res.data.length === 0) {
      throw new Error("Email tidak ditemukan");
    }

    // Cari user yang cocok berdasarkan email dan password
    const user = res.data.find((u) => u.password === password);

    if (!user) {
      throw new Error("Password salah");
    }

    // Debug info
    console.log("User ditemukan saat login:", user);

    // Validasi untuk mahasiswa
    if (user.role === "user" && !user.mahasiswaId) {
      throw new Error("Akun tidak memiliki mahasiswaId. Silakan hubungi admin.");
    }

    return sanitizeUser(user);
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Terjadi kesalahan saat login");
  }
};

// Fungsi Registrasi
export const register = async (userData) => {
  try {
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error("Nama, email dan password harus diisi");
    }

    const checkRes = await axios.get("/users", { params: { email: userData.email } });
    if (checkRes.data && checkRes.data.length > 0) {
      throw new Error("Email sudah terdaftar");
    }

    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const response = await axios.post("/users", newUser);
    return sanitizeUser(response.data);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
