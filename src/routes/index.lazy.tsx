import { createLazyFileRoute } from "@tanstack/react-router";
import MoodChart from "../components/MoodChart/MoodChart";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Home Page</h1>
      <MoodChart />
    </div>
  );
}
