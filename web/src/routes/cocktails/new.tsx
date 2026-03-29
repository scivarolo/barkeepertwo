import PageHeader from "@/components/page/PageHeader";
import CreateCocktailForm from "@/components/cocktails/CreateCocktailForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cocktails/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Create Cocktail"
        subtitle="Add a new cocktail recipe"
      />
      <div className="mb-8">
        <CreateCocktailForm />
      </div>
    </div>
  );
}
