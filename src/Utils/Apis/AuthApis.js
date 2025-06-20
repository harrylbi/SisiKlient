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

    const user = res.data[0];
    
    // Dalam aplikasi nyata, bandingkan dengan hash password
    if (user.password !== password) {
      throw new Error("Password salah");
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
    // Validasi data
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error("Nama, email dan password harus diisi");
    }

    // Cek apakah email sudah digunakan
    const checkRes = await axios.get("/users", { 
      params: { email: userData.email } 
    });
    
    if (checkRes.data && checkRes.data.length > 0) {
      throw new Error("Email sudah terdaftar");
    }

    // Tambahkan timestamp
    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Simpan user baru
    const response = await axios.post("/users", newUser);
    return sanitizeUser(response.data);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};