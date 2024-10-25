import React from "react";
import { OnboardingFormData } from "./OnboardingForm";

interface Step1Props {
  onboardingFormData: OnboardingFormData;
  setOnboardingFormData: React.Dispatch<
    React.SetStateAction<OnboardingFormData>
  >;
}
const Step1: React.FC<Step1Props> = ({
  onboardingFormData,
  setOnboardingFormData,
}) => {
  return (
    <div>
      <label htmlFor="name">
        <h2>Hello friend, how can I call you?</h2>
      </label>
      <input
        required
        type="text"
        name="name"
        id="name"
        autoComplete="firstname"
        value={onboardingFormData.name}
        onChange={(e) =>
          setOnboardingFormData({
            ...onboardingFormData,
            name: e.target.value,
          })
        }
      />
    </div>
  );
};

export default Step1;
