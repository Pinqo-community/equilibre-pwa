import React from "react";
import { genders } from "../../constants";
import { Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface StepGenderProps {
  gender?: Gender;
  setGender: (value: Gender) => void;
}

const StepGender: React.FC<StepGenderProps> = ({ gender, setGender }) => {
  const handleGenderChange = (selectedGender: Gender) => {
    console.log(selectedGender);
    setGender(selectedGender);
  };

  return (
    <fieldset>
      <legend>
        <h2>How do you identify?</h2>
      </legend>
      {genders.map((genderOption) => (
        <InputRadioItem
          key={genderOption}
          onChange={() => handleGenderChange(genderOption)}
          item={genderOption}
          state={gender}
          name="gender"
        />
      ))}
    </fieldset>
  );
};

export default StepGender;
