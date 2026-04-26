"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { DoctorFilters } from "@/features/doctors/components/DoctorFilters";
import { DoctorTable } from "@/features/doctors/components/DoctorTable";
import { useDoctors } from "@/features/doctors/api/useDoctorQueries";
import type {
  Doctor,
  DoctorFilters as DoctorFiltersType,
} from "@/features/doctors/types/doctor";

export default function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersType>({
    search: "",
    status: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading, isError, error } = useDoctors(filters);
  const doctors = data?.data ?? [];

  function handleAdd() {
    setSelectedDoctor(null);
    setIsFormOpen(true);
  }

  function handleEdit(doctor: Doctor) {
    setSelectedDoctor(doctor);
    setIsFormOpen(true);
  }

  function handleDelete(doctor: Doctor) {
    alert(`Delete ${doctor.fullName} - we will wire API next`);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Doctors</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage doctor licenses, expiry status, and license records.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add doctor
          </button>
        </div>

        <DoctorFilters filters={filters} onChange={setFilters} />

        {isLoading && (
          <div className="rounded-xl border bg-white p-8 text-slate-500">
            Loading doctors...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-red-700">
            {error instanceof Error ? error.message : "Something went wrong"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <DoctorTable
              doctors={doctors}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <div className="mt-4 flex items-center justify-between rounded-xl border bg-white px-6 py-4 text-sm text-slate-600">
              <span>{doctors.length} results</span>

              <div className="flex items-center gap-2">
                <button className="rounded-md border px-3 py-1.5 text-slate-500">
                  Prev
                </button>
                <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-white">
                  1
                </button>
                <button className="rounded-md border px-3 py-1.5 text-slate-500">
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-slate-900">
                {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Form implementation comes next.
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}