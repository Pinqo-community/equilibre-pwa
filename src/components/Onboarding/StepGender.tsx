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
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 2 on 4</h2>
          <h3 className="text-3xl text-white mt-20">How do you identify?</h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg mb-4">Select your gender</legend>
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
        </div>
      </div>
    </div>
  );
};

export default StepGender;
