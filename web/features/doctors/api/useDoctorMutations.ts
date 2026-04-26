import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateDoctorPayload, UpdateDoctorPayload } from "../types/doctor";
import { doctorKeys } from "./doctorKeys";
import { doctorService } from "./doctorService";


export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) => doctorService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      toast.success("Doctor created successfully");
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateDoctorPayload }) =>
      doctorService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      toast.success("Doctor updated successfully");
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => doctorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.all });
      toast.success("Doctor deleted successfully");
    },
    onError: () => {
        toast.error("Something went wrong");
    }
  });
}