import { Inbox } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No data found",
  description = "There are no records to display at the moment.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Inbox className="text-slate-400" size={28} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}