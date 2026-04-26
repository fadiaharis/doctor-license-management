export type DoctorStatus = "Active" | "Expired" | "Suspended";

export type Doctor = {
  id: number;
  fullName: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  status: DoctorStatus;
  createdDate: string;
};

export type DoctorFilters = {
  search?: string;
  status?: DoctorStatus | "";
};

export type CreateDoctorPayload = {
  fullName: string;
  email: string;
  specialization: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  status: DoctorStatus;
};

export type UpdateDoctorPayload = CreateDoctorPayload & {
  id: number;
};
