"use client";

import { useState } from "react";
import { Loader, Plus } from "lucide-react";
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
import { ErrorState } from "@/features/common/components/ErrorState";

export default function DoctorsPage() {
  const [filters, setFilters] = useState<DoctorFiltersType>({
    search: "",
    status: "",
    pageNumber: 1,
    pageSize: 5,
  });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useDoctors(filters);

  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const removeDoctor = useDeleteDoctor();

  const paginated = data?.data;
  const doctors = paginated?.items ?? [];

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
    <div className="min-h-screen bg-slate-50 px-6 py-8 md:px-10">
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

        <DoctorFilters
          filters={filters}
          onChange={(next) =>
            setFilters({
              ...next,
              pageNumber: 1, // reset page
            })
          }
        />

        {isLoading && (
          <div className="flex h-[300px] flex-col items-center justify-center gap-3 rounded-xl border bg-white">
            <Loader />
            <p className="text-sm text-slate-500">Loading data...</p>
          </div>
        )}

        {isError && (
          <ErrorState
            title="Oops! Something went wrong"
            description="Unable to load doctors right now. Please make sure the API is running and try again."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (
          <div className="mt-6 space-y-4">
            <DoctorTable
              doctors={doctors}
              onEdit={handleEdit}
              onDelete={setDeleteDoctor}
            />

            {paginated && paginated.totalCount > 0 && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
                <span>
                  Showing page {paginated.pageNumber} of {paginated.totalPages} •{" "}
                  {paginated.totalCount} results
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={filters.pageNumber <= 1}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        pageNumber: Math.max(prev.pageNumber - 1, 1),
                      }))
                    }
                    className="rounded-md border px-3 py-1.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <span className="rounded-md bg-indigo-600 px-3 py-1.5 text-white">
                    {paginated.pageNumber}
                  </span>

                  <button
                    disabled={filters.pageNumber >= paginated.totalPages}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        pageNumber: prev.pageNumber + 1,
                      }))
                    }
                    className="rounded-md border px-3 py-1.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
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