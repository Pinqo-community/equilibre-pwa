import React from "react";
import { Feeling } from "../../types/Mood";
import InputRadioItem from "../reusable/InputRadioItem";

interface Step1Props {
  feeling: Feeling | undefined;
  setFeeling: (feeling: Feeling) => void;
}
const Step1: React.FC<Step1Props> = ({ feeling, setFeeling }) => {
  const feelings: Feeling[] = ["agreable", "disagreable", "neutral"];

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

export default Step1;
