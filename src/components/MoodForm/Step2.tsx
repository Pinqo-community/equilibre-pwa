import React from "react";
import { Emotion } from "../../types/Mood";
import InputRadioItem from "../reusable/InputRadioItem";

interface Step2Props {
  emotion: Emotion | undefined;
  setEmotion: (emotion: Emotion) => void;
}
const Step2: React.FC<Step2Props> = ({ setEmotion, emotion }) => {
  const emotions: Emotion[] = [
    "anger",
    "disgust",
    "fear",
    "joy",
    "love",
    "sadness",
  ];

  return (
    <fieldset>
      <legend>
        <h2>What emotion resonates the most with you?</h2>
      </legend>
      {emotions.map((e) => (
        <InputRadioItem
          key={e}
          item={e}
          name={"emotion"}
          state={emotion}
          onChange={(e) => setEmotion(e.target.value as Emotion)}
        />
      ))}
    </fieldset>
  );
};

export default Step2;
