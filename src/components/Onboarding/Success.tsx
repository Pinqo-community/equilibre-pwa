import React from "react";

interface SuccessProps {
  setOnboardingCompleted: (completed: boolean) => void;
}
const Success: React.FC<SuccessProps> = ({ setOnboardingCompleted }) => {
  const handleStartJourney = () => {
    setOnboardingCompleted(true);
  };
  return (
    <div>
      <h2>Congratulations! You've completed the onboarding process.</h2>
      <button
        onClick={handleStartJourney}
        className="flex-1 p-4 bg-black text-white font-bold"
      >
        Start your journey
      </button>
    </div>
  );
};

export default Success;
