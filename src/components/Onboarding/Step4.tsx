import React from "react";
import { friends, OnboardingFormData } from "./OnboardingForm";
import InputRadioItem from "../reusable/InputRadioItem";
import { Friend } from "../../types/UserInfo";

interface Step4Props {
  onboardingFormData: OnboardingFormData;
  setOnboardingFormData: React.Dispatch<
    React.SetStateAction<OnboardingFormData>
  >;
}
const Step4: React.FC<Step4Props> = ({
  onboardingFormData,
  setOnboardingFormData,
}) => {
  return (
    <fieldset>
      <legend>
        <h2>Well noted, select a friend for this journey:</h2>
      </legend>
      {friends.map((friend) => (
        <InputRadioItem
          key={friend}
          onChange={(e) =>
            setOnboardingFormData({
              ...onboardingFormData,
              friend: e.target.value as Friend,
            })
          }
          item={friend}
          state={onboardingFormData.friend}
          name="friend"
        />
      ))}
    </fieldset>
  );
};

export default Step4;
