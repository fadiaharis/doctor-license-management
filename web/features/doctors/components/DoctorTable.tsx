import { Pencil, Trash2 } from "lucide-react";
import type { Doctor } from "../types/doctor";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "@/features/common/components/EmptyState";

type Props = {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
};

export function DoctorTable({ doctors, onEdit, onDelete }: Props) {
  if (doctors.length === 0) {
    return (
      <EmptyState
        title="No doctors found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-600">
          <tr>
            <th className="px-6 py-4">Doctor</th>
            <th className="px-6 py-4">Specialization</th>
            <th className="px-6 py-4">License No.</th>
            <th className="px-6 py-4">Expiry Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className={
                doctor.status === "Expired"
                  ? "bg-red-50/60"
                  : "hover:bg-slate-50"
              }
            >
              <td className="px-6 py-4">
                <div className="font-medium text-slate-900">
                  {doctor.fullName}
                </div>
                <div className="text-sm text-slate-500">{doctor.email}</div>
              </td>

              <td className="px-6 py-4 text-slate-700">
                {doctor.specialization}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {doctor.licenseNumber}
              </td>

              <td className="px-6 py-4 text-slate-700">
                {new Date(doctor.licenseExpiryDate).toLocaleDateString("en-GB")}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={doctor.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(doctor)}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(doctor)}
                    className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}