import { Loader2 } from "lucide-react";

type Props = {
  size?: number;
  fullScreen?: boolean;
};

export function Loader({ size = 28, fullScreen = false }: Props) {
  const content = (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2
        size={size}
        className="animate-spin text-indigo-600"
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}