import React, { useState } from "react";
import db from "../../db";
import { FavColor, Friend, Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

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
  onboardingCompleted,
}) => {
  const [onboardingFormData, setOnboardingFormData] =
    useState<OnboardingFormData>({
      name: "",
      gender: undefined,
      favColor: undefined,
      friend: undefined,
    });
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.put({ ...onboardingFormData, _id: "onboarding" });
    setOnboardingCompleted(true);
  };
  return (
    <>
      {onboardingCompleted ? (
        <div>
          <h2>Congratulations! You've completed the onboarding process.</h2>
          <button>Start your journey</button>
        </div>
      ) : (
        <form onSubmit={handleOnboardingSubmit}>
          <Step1
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />

          <Step2
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />

          <Step3
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />

          <Step4
            onboardingFormData={onboardingFormData}
            setOnboardingFormData={setOnboardingFormData}
          />

          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default OnboardingForm;
