import React, { useState } from "react";
<<<<<<< HEAD
import db from "../../constants/dbConstants";
import { FavColor, Friend, Gender } from "../../types/UserInfo";
=======
import db from "../../db";
import { FavColor, Friend, Gender, UserInfo } from "../../types/UserInfo";
>>>>>>> 56094c1 (feature(onboarding): refactos, fixes and improvements.)

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Success from "./Success";

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
  const maxFormSteps = 5;
  const [onboardingFormStep, setOnboardingFormStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (onboardingFormStep === 1 && username.trim() === "") {
      setErrorMessage("Please enter your name");
      return;
    }
    if (onboardingFormStep === 2 && !gender) {
      setErrorMessage("Please select your gender");
      return;
    }
    if (onboardingFormStep == 3 && !favColor) {
      setErrorMessage("Please select your favorite color");
      return;
    }
    if (onboardingFormStep === 4 && !friend) {
      setErrorMessage("Please select your friend");
      return;
    }
    setErrorMessage(null);
    if (onboardingFormStep < maxFormSteps)
      setOnboardingFormStep(onboardingFormStep + 1);
  };

  /* So the user can't submit the form pressing enter in the first step :)))) */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    setLoading(true);
    if (username && favColor && gender && friend) {
      const user: UserInfo = {
        createdAt: new Date().toISOString(),
        _id: "onboarding",
        username: username,
        favColor: favColor!,
        gender: gender!,
        friend: friend!,
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
      <form onSubmit={handleOnboardingSubmit}>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {onboardingFormStep === 1 && (
          <Step1
            username={username}
            setUsername={setUsername}
            handleKeyDown={handleKeyDown}
          />
        )}

        {onboardingFormStep === 2 && (
          <Step2 username={username} gender={gender} setGender={setGender} />
        )}

        {onboardingFormStep === 3 && (
          <Step3 favColor={favColor} setFavColor={setFavColor} />
        )}

        {onboardingFormStep === 4 && (
          <Step4 friend={friend} setFriend={setFriend} />
        )}

        {onboardingFormStep === maxFormSteps && <Success />}
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
          {onboardingFormStep < maxFormSteps - 1 && (
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
            <button
              onClick={() => setOnboardingCompleted(true)}
              className="flex-1 p-4 bg-black text-white font-bold"
              type="button"
            >
              Start your journey
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
