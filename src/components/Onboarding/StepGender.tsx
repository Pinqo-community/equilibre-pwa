import React from "react";
import { genders } from "../../constants";
import { Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface StepGenderProps {
  gender?: Gender;
  setGender: (value: Gender) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepGender: React.FC<StepGenderProps> = ({
  gender,
  setGender,
  errorMessage,
  setErrorMessage,
}) => {
  const handleGenderChange = (selectedGender: Gender) => {
    setGender(selectedGender);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 2 on 4</h2>
          <h3 className="text-3xl text-white mt-20">How do you identify?</h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg mb-4 ">Select your gender</legend>
            {genders.map((genderOption) => (
              <InputRadioItem
                key={genderOption}
                onChange={() => handleGenderChange(genderOption)}
                item={genderOption}
                state={gender}
                name="gender"
                aria-describedby="gender-error"
              />
            ))}
          </fieldset>
        </div>
      </div>
      <span
        id="gender-error"
        className="text-red-500 absolute bottom-20 left-8"
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default StepGender;
