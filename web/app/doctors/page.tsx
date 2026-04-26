"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { DoctorFilters } from "@/features/doctors/components/DoctorFilters";
import { DoctorTable } from "@/features/doctors/components/DoctorTable";
import { DoctorFormModal } from "@/features/doctors/components/DoctorFormModal";

import { useDoctors } from "@/features/doctors/api/useDoctorQueries";
import {
  useCreateDoctor,
  useDeleteDoctor,
  useUpdateDoctor,
} from "@/features/doctors/api/useDoctorMutations";
import type {
  CreateDoctorPayload,
  Doctor,
  DoctorFilters as DoctorFiltersType,
  UpdateDoctorPayload,
} from "@/features/doctors/types/doctor";
import { DeleteDoctorDialog } from "@/features/doctors/components/DeleteDoctorDialog";

export default function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersType>({
    search: "",
    status: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading, isError, error } = useDoctors(filters);

  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const removeDoctor = useDeleteDoctor();

  const doctors = data?.data ?? [];

  function handleAdd() {
    setSelectedDoctor(null);
    setIsFormOpen(true);
  }

  function handleEdit(doctor: Doctor) {
    setSelectedDoctor(doctor);
    setIsFormOpen(true);
  }

  function handleSubmit(payload: CreateDoctorPayload | UpdateDoctorPayload) {
    if ("id" in payload) {
      updateDoctor.mutate(
        { id: payload.id, payload },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setSelectedDoctor(null);
          },
        }
      );
    } else {
      createDoctor.mutate(payload, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  }

  function handleConfirmDelete() {
    if (!deleteDoctor) return;

    removeDoctor.mutate(deleteDoctor.id, {
      onSuccess: () => {
        setDeleteDoctor(null);
      },
    });
  }

  const isSubmitting = createDoctor.isPending || updateDoctor.isPending;

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
              onDelete={setDeleteDoctor}
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

        <DoctorFormModal
          open={isFormOpen}
          doctor={selectedDoctor}
          isSubmitting={isSubmitting}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedDoctor(null);
          }}
          onSubmit={handleSubmit}
        />

        <DeleteDoctorDialog
          doctor={deleteDoctor}
          isDeleting={removeDoctor.isPending}
          onClose={() => setDeleteDoctor(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}