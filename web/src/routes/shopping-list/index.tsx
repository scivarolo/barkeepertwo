import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shopping-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/shopping-list/"!</div>;
}
