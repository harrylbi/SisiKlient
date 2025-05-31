//  // src/data/sorage.js

const getMahasiswaData = () => {
  const data = localStorage.getItem("mahasiswa");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};
