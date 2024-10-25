import React, { useState } from "react";
import db from "../../constants/dbConstants";
import { FavColor, Friend, Gender } from "../../types/UserInfo";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Success from "./Success";

export interface OnboardingFormData {
  name: string;
  gender: Gender | undefined;
  favColor: FavColor | undefined;
  friend: Friend | undefined;
}
interface OnboardingFormProps {
  setOnboardingCompleted: (completed: boolean) => void;
  onboardingCompleted: boolean;
}
export const genders: Gender[] = ["male", "female", "non-binary"];
export const favColors: FavColor[] = ["orange", "rose", "green", "blue"];
export const friends: Friend[] = ["dog", "cat", "rodent"];

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  setOnboardingCompleted,
}) => {
  const [onboardingFormData, setOnboardingFormData] =
    useState<OnboardingFormData>({
      name: "",
      gender: undefined,
      favColor: undefined,
      friend: undefined,
    });
  const maxFormSteps = 5;
  const [onboardingFormStep, setOnboardingFormStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNextStep = () => {
    if (onboardingFormStep === 1 && !onboardingFormData.name) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (onboardingFormStep === 2 && !onboardingFormData.gender) {
      setErrorMessage("Please select your gender");
      return;
    }
    if (onboardingFormStep == 3 && !onboardingFormData.favColor) {
      setErrorMessage("Please select your favorite color");
      return;
    }
    if (onboardingFormStep === 4 && !onboardingFormData.friend) {
      setErrorMessage("Please select your friend");
      return;
    } else {
      setErrorMessage(null);
      if (onboardingFormStep < maxFormSteps)
        setOnboardingFormStep(onboardingFormStep + 1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep(); // Manually move to the next step instead
    }
  };
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.put({ ...onboardingFormData, _id: "onboarding" });
      setOnboardingFormStep(maxFormSteps);
    } catch (err) {
      console.error("error saving onboarding: ", err);
    }
  };
  return (
    <>
      <form onSubmit={handleOnboardingSubmit} onKeyDown={handleKeyDown}>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {onboardingFormStep === 1 && (
          <Step1
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />
        )}

        {onboardingFormStep === 2 && (
          <Step2
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />
        )}

        {onboardingFormStep === 3 && (
          <Step3
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />
        )}

        {onboardingFormStep === 4 && (
          <Step4
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />
        )}

        {onboardingFormStep === maxFormSteps && (
          <Success setOnboardingCompleted={setOnboardingCompleted} />
        )}
        <div
          className={`flex gap-4 min-w-full ${onboardingFormStep === 1 ? "justify-end" : "justify-between"}`}
        >
          {onboardingFormStep > 1 && (
            <button
              className="border border-black p-2 rounded-md"
              type="button"
              onClick={() =>
                onboardingFormStep > 1 &&
                setOnboardingFormStep(onboardingFormStep - 1)
              }
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
            <button type="submit">Save informations</button>
          )}
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
