import { createLazyFileRoute } from "@tanstack/react-router";
// import MoodChart from "../components/MoodChart/MoodChart";
import OnboardingForm from "../components/Onboarding/OnboardingForm";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* <MoodChart /> */}
      <div className="flex justify-center items-center mt-44">
        <OnboardingForm setOnboardingCompleted={() => null} />
      </div>
    </div>
  );
}
