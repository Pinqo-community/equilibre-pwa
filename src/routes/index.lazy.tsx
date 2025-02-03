import { createLazyFileRoute } from "@tanstack/react-router";
// import MoodChart from "../components/MoodChart/MoodChart";
import OnboardingForm from "../components/Onboarding/OnboardingForm";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-screen">
      {/* <MoodChart /> */}
      <div className=" h-full flex justify-center items-center">
        <OnboardingForm setOnboardingCompleted={() => null} />
      </div>
    </div>
  );
}
