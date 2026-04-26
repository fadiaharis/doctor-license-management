import { AlertCircle } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Oops! Something went wrong",
  description = "We couldn’t load the data. Please check your connection or try again.",
  onRetry,
}: Props) {
  return (
    <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 px-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500">
        <AlertCircle size={28} />
      </div>

      <h3 className="text-lg font-semibold text-red-700">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-red-600">{description}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}