import { LucideProps, WineOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cloneElement } from "react";

interface NoItemsProps {
  title: string;
  description: string;
  icon?: React.ReactElement<LucideProps>;
}

export default function NoItems({ title, description, icon }: NoItemsProps) {
  return (
    <Alert>
      {icon ? (
        cloneElement(icon, { className: "h-4 w-4" })
      ) : (
        <WineOff className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
