"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  CreateDoctorPayload,
  Doctor,
  UpdateDoctorPayload,
} from "../types/doctor";
import {
  doctorSchema,
  DoctorFormValues,
} from "../validations/doctorSchema";

type Props = {
  open: boolean;
  doctor: Doctor | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateDoctorPayload | UpdateDoctorPayload) => void;
};

const defaultValues: DoctorFormValues = {
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (doctor) {
      reset({
        fullName: doctor.fullName,
        email: doctor.email,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        licenseExpiryDate: doctor.licenseExpiryDate.split("T")[0],
        status: doctor.status,
      });
    } else {
      reset(defaultValues);
    }
  }, [doctor, open, reset]);

  if (!open) return null;

  function submitForm(values: DoctorFormValues) {
    if (doctor) {
      onSubmit({
        id: doctor.id,
        ...values,
      });
      return;
    }

    onSubmit(values);
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

        <form onSubmit={handleSubmit(submitForm)} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.fullName?.message}>
              <input
                {...register("fullName")}
                className={inputClass(errors.fullName?.message)}
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className={inputClass(errors.email?.message)}
              />
            </Field>

            <Field
              label="Specialization"
              error={errors.specialization?.message}
            >
              <input
                {...register("specialization")}
                className={inputClass(errors.specialization?.message)}
              />
            </Field>

            <Field
              label="License Number"
              error={errors.licenseNumber?.message}
            >
              <input
                {...register("licenseNumber")}
                className={inputClass(errors.licenseNumber?.message)}
              />
            </Field>

            <Field
              label="License Expiry Date"
              error={errors.licenseExpiryDate?.message}
            >
              <input
                type="date"
                {...register("licenseExpiryDate")}
                className={inputClass(errors.licenseExpiryDate?.message)}
              />
            </Field>

            <Field label="Status" error={errors.status?.message}>
              <select
                {...register("status")}
                className={inputClass(errors.status?.message)}
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Expired">Expired</option>
              </select>
            </Field>
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
  }`;
}