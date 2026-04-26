"use client";

import { useEffect, useState } from "react";
import type {
  CreateDoctorPayload,
  Doctor,
  DoctorStatus,
  UpdateDoctorPayload,
} from "../types/doctor";

type Props = {
  open: boolean;
  doctor: Doctor | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateDoctorPayload | UpdateDoctorPayload) => void;
};

const initialForm: CreateDoctorPayload = {
  fullName: "",
  email: "",
  specialization: "",
  licenseNumber: "",
  licenseExpiryDate: "",
  status: "Active",
};

export function DoctorFormModal({
  open,
  doctor,
  isSubmitting,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<CreateDoctorPayload>(initialForm);

  useEffect(() => {
    if (doctor) {
      setForm({
        fullName: doctor.fullName,
        email: doctor.email,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        licenseExpiryDate: doctor.licenseExpiryDate.split("T")[0],
        status: doctor.status,
      });
    } else {
      setForm(initialForm);
    }
  }, [doctor, open]);

  if (!open) return null;

  function handleChange(
    field: keyof CreateDoctorPayload,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (doctor) {
      onSubmit({
        id: doctor.id,
        ...form,
      });
    } else {
      onSubmit(form);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {doctor ? "Edit Doctor" : "Add Doctor"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {doctor
              ? "Update doctor license details."
              : "Create a new doctor license record."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              value={form.fullName}
              onChange={(value) => handleChange("fullName", value)}
              required
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => handleChange("email", value)}
              required
            />

            <Input
              label="Specialization"
              value={form.specialization}
              onChange={(value) => handleChange("specialization", value)}
              required
            />

            <Input
              label="License Number"
              value={form.licenseNumber}
              onChange={(value) => handleChange("licenseNumber", value)}
              required
            />

            <Input
              label="License Expiry Date"
              type="date"
              value={form.licenseExpiryDate}
              onChange={(value) => handleChange("licenseExpiryDate", value)}
              required
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  handleChange("status", e.target.value as DoctorStatus)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : doctor
                ? "Update Doctor"
                : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}