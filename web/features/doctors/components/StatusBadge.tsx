import type { DoctorStatus } from "../types/doctor";

export function StatusBadge({ status }: { status: DoctorStatus }) {
  const styles: Record<string, string> = {
    Active: "border-green-200 bg-green-50 text-green-700",
    Expired: "border-red-200 bg-red-50 text-red-700",
    Suspended: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] || "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}