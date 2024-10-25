import React from "react";
import { Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";
import { genders } from "./OnboardingForm";
import { OnboardingFormData } from "./OnboardingForm";

interface Step2Props {
  onboardingFormData: OnboardingFormData;
  setOnboardingFormData: React.Dispatch<
    React.SetStateAction<OnboardingFormData>
  >;
}
const Step2: React.FC<Step2Props> = ({
  onboardingFormData,
  setOnboardingFormData,
}) => {
  return (
    <fieldset>
      <legend>
        <h2>
          Nice to meet you {onboardingFormData.name}! How do you identify?
        </h2>
      </legend>
      {genders.map((gender) => (
        <InputRadioItem
          key={gender}
          onChange={(e) =>
            setOnboardingFormData({
              ...onboardingFormData,
              gender: e.target.value as Gender,
            })
          }
          item={gender}
          state={onboardingFormData.gender}
          name="gender"
        />
      ))}
    </fieldset>
  );
};

export default Step2;
