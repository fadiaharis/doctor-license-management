import { http } from "@/lib/http-client";
import { ApiResponse } from "@/types/api-response";
import {
  CreateDoctorPayload,
  Doctor,
  DoctorFilters,
  UpdateDoctorPayload,
} from "../types/doctor";

function buildQuery(filters: DoctorFilters) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const doctorService = {
    getAll: (filters: DoctorFilters) =>
    http<ApiResponse<Doctor[]>>(`/Doctors${buildQuery(filters)}`),

  getById: (id: number) =>
    http<ApiResponse<Doctor>>(`/Doctors/${id}`),

  create: (payload: CreateDoctorPayload) =>
    http<ApiResponse<Doctor>>("/Doctors", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (payload: UpdateDoctorPayload) =>
    http<ApiResponse<Doctor>>(`/Doctors/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  remove: (id: number) =>
    http<ApiResponse<null>>(`/Doctors/${id}`, {
      method: "DELETE",
    }),
};
