import PageHeader from "@/components/page/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shopping-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader title="Shopping List" subtitle="Time to stock up" />
    </div>
  );
}
