import { ChevronDown, Search, RotateCcw } from "lucide-react";
import type { DoctorFilters as DoctorFiltersType } from "../types/doctor";

type Props = {
  filters: DoctorFiltersType;
  onChange: (filters: DoctorFiltersType) => void;
};

export function DoctorFilters({ filters, onChange }: Props) {
  function handleReset() {
    onChange({
      search: "",
      status: "",
      pageNumber: 1,
      pageSize: filters.pageSize,
    });
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <input
          value={filters.search}
          onChange={(e) =>
            onChange({
              ...filters,
              search: e.target.value,
              pageNumber: 1,
            })
          }
          placeholder="Search by name or license number"
          className="w-full rounded-lg bg-white shadow-sm py-2 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="relative w-full sm:w-48">
        <select
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as DoctorFiltersType["status"],
              pageNumber: 1,
            })
          }
          className="w-full appearance-none rounded-lg border-slate-300 bg-white px-4 py-2 pr-10 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All statuses</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Suspended">Suspended</option>
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      <button
        type="button"
        onClick={handleReset}
        disabled={!filters.search && !filters.status}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-400 px-4 py-2 text-sm font-medium text-white  shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RotateCcw size={16} />
        Reset
      </button>
    </div>
  );
}