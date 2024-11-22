import React from "react";
import { useUserStore } from "../store/userStore";

const OnboardingTest: React.FC = () => {
  const { userData, currentStep, setUserData, goToNextStep } = useUserStore();

  return (
    <div>
      <h1>Onboarding Process (Testing)</h1>
      <p>Current Step: {currentStep}</p>
      <p>Username: {userData.username || "Not set"}</p>
      <p>Gender: {userData.gender || "Not set"}</p>
      <p>Favorite Color: {userData.favColor || "Not set"}</p>
      <p>Friend: {userData.friend || "Not set"}</p>
      <p>Onboarding Completed: {userData.onboardingCompleted ? "Yes" : "No"}</p>

      <div className="mt-4 flex gap-4">
        <button
          type="button"
          onClick={() => setUserData({ username: "Test User" })}
        >
          Set Username
        </button>
        <button type="button" onClick={() => setUserData({ gender: "male" })}>
          Set Gender
        </button>
        <button type="button" onClick={() => setUserData({ favColor: "warm" })}>
          Set Favorite Color
        </button>
        <button type="button" onClick={() => setUserData({ friend: "cat" })}>
          Set Friend
        </button>
        <button type="button" onClick={goToNextStep}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default OnboardingTest;
