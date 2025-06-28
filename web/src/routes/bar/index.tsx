import PageHeader from "@/components/page/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader title="Bar" />
    </div>
  );
}
