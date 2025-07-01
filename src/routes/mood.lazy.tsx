import { createLazyFileRoute } from "@tanstack/react-router";
import MoodForm from "../components/MoodForm/MoodForm";

export const Route = createLazyFileRoute("/mood")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MoodForm />
    </div>
  );
}
