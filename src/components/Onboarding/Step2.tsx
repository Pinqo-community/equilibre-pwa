import React from "react";
import { Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";
import { genders } from "../../constants";

interface Step2Props {
  username: string;
  gender: Gender | undefined;
  setGender: (gender: Gender) => void;
}
const Step2: React.FC<Step2Props> = ({ username, gender, setGender }) => {
  return (
    <fieldset>
      <legend>
        <h2>Nice to meet you {username}! How do you identify?</h2>
      </legend>
      {genders.map((g) => (
        <InputRadioItem
          key={g}
          onChange={(e) => setGender(e.target.value as Gender)}
          item={g}
          state={gender}
          name="gender"
        />
      ))}
    </fieldset>
  );
};

export default Step2;
