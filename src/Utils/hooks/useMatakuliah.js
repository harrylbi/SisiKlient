// src/Utils/hooks/useMatakuliah.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../AxiosInstance";
import { v4 as uuidv4 } from "uuid";

export const useMatakuliah = () => {
  const queryClient = useQueryClient();

  const matakuliahQuery = useQuery({
    queryKey: ["matakuliah"],
    queryFn: async () => {
      const res = await axios.get("/matakuliah");
      return res.data;
    },
  });

  const tambahMatakuliah = useMutation({
    mutationFn: async (data) => {
      const newData = { ...data, id: uuidv4() };
      const res = await axios.post("/matakuliah", newData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  const ubahMatakuliah = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`/matakuliah/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  const hapusMatakuliah = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/matakuliah/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matakuliah"] });
    },
  });

  return {
    matakuliahQuery,
    tambahMatakuliah,
    ubahMatakuliah,
    hapusMatakuliah,
  };
};
