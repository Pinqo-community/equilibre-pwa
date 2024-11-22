import { createLazyFileRoute } from "@tanstack/react-router";
// import MoodChart from "../components/MoodChart/MoodChart";
import OnboardingTest from "../components/OnboardingDemo";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <MoodChart /> */}
      <div className="flex justify-center items-center mt-44">
        <OnboardingTest />
      </div>
    </div>
  );
}
