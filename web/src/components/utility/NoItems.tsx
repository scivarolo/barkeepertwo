import { Alert } from "@heroui/react";
import { LucideProps, WineOff } from "lucide-react";
import { cloneElement } from "react";

interface NoItemsProps {
  title: string;
  description: string;
  icon?: React.ReactElement<LucideProps>;
}

export default function NoItems({ title, description, icon }: NoItemsProps) {
  return (
    <Alert
      description={description}
      title={title}
      icon={
        icon ? (
          cloneElement(icon, { className: "h-4 w-4" })
        ) : (
          <WineOff className="h-4 w-4" />
        )
      }
    />
  );
}
