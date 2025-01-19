import PageHeader from "@/components/page/PageHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cocktails/$cocktailId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader title="Cocktail" subtitle="Cocktail details" />
    </div>
  );
}
