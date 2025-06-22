// src/Utils/hooks/useDosen.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../AxiosInstance";
import { v4 as uuidv4 } from "uuid";

// GET semua dosen
export const useDosen = () => {
  const queryClient = useQueryClient();

  const dosenQuery = useQuery({
    queryKey: ["dosen"],
    queryFn: async () => {
      const res = await axios.get("/dosen");
      return res.data;
    },
  });

  const tambahDosen = useMutation({
    mutationFn: async (data) => {
      const newData = { ...data, id: uuidv4() };
      const res = await axios.post("/dosen", newData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const ubahDosen = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`/dosen/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const hapusDosen = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/dosen/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  return {
    dosenQuery,
    tambahDosen,
    ubahDosen,
    hapusDosen,
  };
};
