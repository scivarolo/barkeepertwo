import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/complete-profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/complete-profile/"!</div>;
}
