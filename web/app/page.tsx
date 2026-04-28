"use client";

import Link from "next/link";

export default function AppPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Doctor License Management
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage doctor licenses, expiry status, and records.
        </p>

        <Link
          href="/doctors"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Show Doctors
        </Link>
      </div>
    </div>
  );
}