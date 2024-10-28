import React from "react";
import { Emotion } from "../../types/Mood";
import InputRadioItem from "../reusable/InputRadioItem";
import { emotions } from "../../constants/moodConstants";

interface StepEmotionProps {
  emotion: Emotion | undefined;
  setEmotion: (emotion: Emotion) => void;
}
const StepEmotion: React.FC<StepEmotionProps> = ({ setEmotion, emotion }) => {
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

export default StepEmotion;
