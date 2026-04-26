import { http } from "@/lib/http-client";
import { ApiResponse, PaginatedResponse } from "@/types/api-response";
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

  params.set("pageNumber", String(filters.pageNumber));
  params.set("pageSize", String(filters.pageSize));

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const doctorService = {
  getAll: (filters: DoctorFilters) =>
  http<ApiResponse<PaginatedResponse<Doctor>>>(
    `/Doctors${buildQuery(filters)}`
  ),

  getById: (id: number) =>
    http<ApiResponse<Doctor>>(`/Doctors/${id}`),

  create: (payload: CreateDoctorPayload) =>
    http<ApiResponse<Doctor>>("/Doctors", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (id: number, payload: UpdateDoctorPayload) =>
    http<ApiResponse<Doctor>>(`/Doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  delete: (id: number) =>
    http<ApiResponse<null>>(`/Doctors/${id}`, {
      method: "DELETE",
    }),
};
