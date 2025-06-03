import React, { createContext, useState, useEffect } from "react";

export const MahasiswaContext = createContext();

export const MahasiswaProvider = ({ children }) => {
  const [mahasiswa, setMahasiswa] = useState([]);

  const loadMahasiswa = () => {
    const data = localStorage.getItem("mahasiswa");
    if (!data) {
      setMahasiswa([]);
      return;
    }
    try {
      setMahasiswa(JSON.parse(data));
    } catch {
      setMahasiswa([]);
    }
  };

  useEffect(() => {
    loadMahasiswa();
  }, []);

  // Fungsi untuk update data mahasiswa dan simpan ke localStorage
  const updateMahasiswa = (newData) => {
    setMahasiswa(newData);
    localStorage.setItem("mahasiswa", JSON.stringify(newData));
  };

  return (
    <MahasiswaContext.Provider value={{ mahasiswa, setMahasiswa: updateMahasiswa, reloadMahasiswa: loadMahasiswa }}>
      {children}
    </MahasiswaContext.Provider>
  );
};
