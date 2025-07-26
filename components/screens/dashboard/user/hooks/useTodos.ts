import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/api";
import { TodoForm, TodosResponse, TogglePayload } from "../types/todos";
import { toast } from "sonner";

const TODOS_QUERY_KEY = ["todos"];

export const useGetTodos = () => {
  return useQuery<TodosResponse>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: async () => {
      const res = await axiosInstance.get("/todos");
      return res.data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TodoForm) => axiosInstance.post("/todos", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("Berhasil menambahkan todo!");
    },
    onError: () => {
      toast.error("Gagal menambahkan todo");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("Todo berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus todo");
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, mark }: TogglePayload) =>
      axiosInstance.put(`/todos/${id}/mark`, { action: mark }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("Status todo diperbarui");
    },
    onError: () => {
      toast.error("Gagal memperbarui status todo");
    },
  });
};
