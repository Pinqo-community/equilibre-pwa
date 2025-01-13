import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import db from "../../constants/dbConstants";
import { FavColor, Friend, Gender, UserInfo } from "../../types/UserInfo";
import OnboardingSuccess from "./OnboardingSuccess";
import StepFavColor from "./StepFavColor";
import StepFriend from "./StepFriend";
import StepGender from "./StepGender";
import StepUsername from "./StepName";
import StepSplash from "./StepSplash";

interface OnboardingFormProps {
  setOnboardingCompleted: (completed: boolean) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  setOnboardingCompleted,
}) => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const [favColor, setFavColor] = useState<FavColor | undefined>(undefined);
  const [friend, setFriend] = useState<Friend | undefined>(undefined);
  const maxFormSteps = 6;
  const [onboardingFormStep, setOnboardingFormStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (onboardingFormStep === 2 && !username.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (onboardingFormStep === 3 && !gender) {
      setErrorMessage("Please select your gender");
      return;
    }
    if (onboardingFormStep == 4 && !favColor) {
      setErrorMessage("Please select your favorite color");
      return;
    }
    if (onboardingFormStep === 5 && !friend) {
      setErrorMessage("Please select your friend");
      return;
    }
    setErrorMessage(null);
    if (onboardingFormStep < maxFormSteps)
      setOnboardingFormStep(onboardingFormStep + 1);
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    setLoading(true);
    if (username && favColor && gender && friend) {
      const user: UserInfo = {
        createdAt: new Date().toISOString(),
        _id: "onboarding",
        username,
        type: "onboarding",
        onBoardingCompleted: true,
      };
      try {
        await db.put(user);
        setOnboardingFormStep(maxFormSteps);
        setLoading(false);
        console.log("new user", user);
      } catch (err) {
        console.error("error saving onboarding: ", err);
        setLoading(false);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleOnboardingSubmit}
        className="w-full h-full flex flex-col"
      >
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {onboardingFormStep === 1 && (
          <StepSplash handleNextStep={handleNextStep} />
        )}

        {onboardingFormStep === 2 && (
          <StepUsername
            username={username}
            setUsername={setUsername}
            handleNextStep={handleNextStep}
          />
        )}

        {onboardingFormStep === 3 && (
          <StepGender
            username={username}
            gender={gender}
            setGender={setGender}
          />
        )}

        {onboardingFormStep === 4 && (
          <StepFavColor favColor={favColor} setFavColor={setFavColor} />
        )}

        {onboardingFormStep === 5 && (
          <StepFriend friend={friend} setFriend={setFriend} />
        )}

        {onboardingFormStep === maxFormSteps && (
          <OnboardingSuccess username={username} />
        )}

        <div
          className={`flex gap-4 min-w-full ${onboardingFormStep === 1 ? "justify-end" : "justify-between"}`}
        >
          {onboardingFormStep > 1 && onboardingFormStep < maxFormSteps && (
            <button
              className="border border-black p-2 rounded-md"
              type="button"
              onClick={() => setOnboardingFormStep(onboardingFormStep - 1)}
            >
              Prev
            </button>
          )}
          {onboardingFormStep < maxFormSteps - 1 && onboardingFormStep > 1 && (
            <button
              onClick={handleNextStep}
              type="button"
              className="bg-black text-white rounded-md p-2"
            >
              Next
            </button>
          )}
          {onboardingFormStep === maxFormSteps - 1 && (
            <button type="submit" disabled={loading}>
              Save informations
            </button>
          )}
          {onboardingFormStep === maxFormSteps && (
            <Link
              to={"/mood"}
              onClick={() => setOnboardingCompleted(true)}
              className="bg-slate-200 text-black p-2 rounded-md hover:bg-slate-900 hover:text-white font-bold transition-colors"
            >
              Start your journey
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
