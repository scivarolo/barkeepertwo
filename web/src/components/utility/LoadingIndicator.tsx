import { LoaderCircle } from "lucide-react";

interface LoadingIndicatorProps {
  isLoading: boolean;
  text?: string;
}

export default function LoadingIndicator({
  isLoading,
  text,
  children,
}: React.PropsWithChildren<LoadingIndicatorProps>) {
  if (isLoading) {
    return (
      <span>
        <LoaderCircle className="mr-2 inline-block animate-spin" /> {text}
      </span>
    );
  }
  return children ?? null;
}
