import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideProps, WineOff } from "lucide-react";
import { cloneElement } from "react";

interface NoItemsProps {
  title: string;
  description: string;
  icon?: React.ReactElement<LucideProps>;
}

export default function NoItems({ title, description, icon }: NoItemsProps) {
  const IconComponent = icon
    ? cloneElement(icon, { className: "h-4 w-4" })
    : <WineOff className="h-4 w-4" />;

  return (
    <Alert>
      {IconComponent}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
