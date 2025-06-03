import React, { createContext, useState, useEffect } from "react";

export const DosenContext = createContext();

export const DosenProvider = ({ children }) => {
  const [dosen, setDosen] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("dosen");
    if (data) {
      try {
        setDosen(JSON.parse(data));
      } catch {
        setDosen([]);
      }
    }
  }, []);

  return (
    <DosenContext.Provider value={{ dosen, setDosen }}>
      {children}
    </DosenContext.Provider>
  );
};
