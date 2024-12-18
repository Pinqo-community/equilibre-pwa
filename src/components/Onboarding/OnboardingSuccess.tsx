import React from "react";

interface OnboardingSuccessProps {
  username: string;
}
const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({ username }) => {
  return (
    <div>
      <h2>
        Congratulations{" "}
        <span className="text-red-400 font-bold">{username}</span>! You have
        completed the onboarding process.
      </h2>
    </div>
  );
};

export default OnboardingSuccess;
