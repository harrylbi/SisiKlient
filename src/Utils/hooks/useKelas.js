import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../AxiosInstance";

export const useKelasData = () => {
  return useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const res = await axios.get("/kelas");
      return res.data;
    },
  });
};

export const useMatakuliahData = () => {
  return useQuery({
    queryKey: ["matakuliah"],
    queryFn: async () => {
      const res = await axios.get("/matakuliah");
      return res.data;
    },
  });
};

export const useDosenData = () => {
  return useQuery({
    queryKey: ["dosen"],
    queryFn: async () => {
      const res = await axios.get("/dosen");
      return res.data;
    },
  });
};

export const useMahasiswaData = () => {
  return useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      const res = await axios.get("/mahasiswa");
      return res.data;
    },
  });
};

export const useCreateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axios.post("/kelas", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });
};

export const useUpdateKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await axios.put(`/kelas/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });
};

export const useDeleteKelas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axios.delete(`/kelas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });
};
