import React from "react";
import { Feeling } from "../../types/Mood";
import InputRadioItem from "../reusable/InputRadioItem";
import { feelings } from "../../constants/moodConstants";

interface StepFeelingProps {
  feeling: Feeling | undefined;
  setFeeling: (feeling: Feeling) => void;
}

const StepFeeling: React.FC<StepFeelingProps> = ({ feeling, setFeeling }) => {
  return (
    <fieldset>
      <legend>
        <h2>How would you describe your general feelings?</h2>
      </legend>
      {feelings.map((f) => (
        <InputRadioItem
          key={f}
          item={f}
          name={"feeling"}
          state={feeling}
          onChange={(e) => setFeeling(e.target.value as Feeling)}
        />
      ))}
    </fieldset>
  );
};

export default StepFeeling;
