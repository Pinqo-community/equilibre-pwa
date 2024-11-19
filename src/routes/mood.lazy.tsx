import { createLazyFileRoute } from "@tanstack/react-router";
import MoodForm from "../components/MoodForm/MoodForm";

export const Route = createLazyFileRoute("/mood")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Mood Page</h1>
      <MoodForm />
    </div>
  );
}
