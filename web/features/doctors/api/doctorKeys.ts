import { DoctorFilters } from "../types/doctor";

export const doctorKeys = {
  all: ["doctors"] as const,
  list: (filters: DoctorFilters) => [...doctorKeys.all, "list", filters] as const,
  detail: (id: number) => [...doctorKeys.all, "detail", id] as const,
};
