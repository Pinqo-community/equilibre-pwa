import React from "react";
import { favColors, OnboardingFormData } from "./OnboardingForm";
import InputRadioItem from "../reusable/InputRadioItem";
import { FavColor } from "../../types/UserInfo";
interface Step3Props {
  onboardingFormData: OnboardingFormData;
  setOnboardingFormData: React.Dispatch<
    React.SetStateAction<OnboardingFormData>
  >;
}
const Step3: React.FC<Step3Props> = ({
  onboardingFormData,
  setOnboardingFormData,
}) => {
  return (
    <fieldset>
      <legend>
        <h2>Thank you! Which color do you prefer?</h2>
      </legend>
      {favColors.map((color) => (
        <InputRadioItem
          key={color}
          onChange={(e) =>
            setOnboardingFormData({
              ...onboardingFormData,
              favColor: e.target.value as FavColor,
            })
          }
          item={color}
          state={onboardingFormData.favColor}
          name="favColor"
        />
      ))}
    </fieldset>
  );
};

export default Step3;
