import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { doctorKeys } from "./doctorKeys";
import { doctorService } from "./doctorService";
import { CreateDoctorPayload, DoctorFilters, UpdateDoctorPayload } from "../types/doctor";

export function useDoctors(filters: DoctorFilters) {
    return useQuery({
    queryKey: ["doctors", filters],
    queryFn: () => doctorService.getAll(filters),
  });
}

export function useDoctor(id: number) {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => doctorService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) => doctorService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: doctorKeys.all }),
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDoctorPayload) => doctorService.update(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: doctorKeys.all }),
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => doctorService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: doctorKeys.all }),
  });
}
