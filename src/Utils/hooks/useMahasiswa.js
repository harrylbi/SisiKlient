import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../AxiosInstance";

// GET semua mahasiswa
export const useMahasiswa = () => {
  const queryClient = useQueryClient();

  const mahasiswaQuery = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      const res = await axios.get("/mahasiswa");
      return res.data;
    },
  });

  const tambahMahasiswa = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("/mahasiswa", data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  const ubahMahasiswa = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`/mahasiswa/${id}`, data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  const hapusMahasiswa = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/mahasiswa/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  return { mahasiswaQuery, tambahMahasiswa, ubahMahasiswa, hapusMahasiswa };
};
