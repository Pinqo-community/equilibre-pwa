import React from "react";
import { Emotion } from "../../types/Mood";

interface StepEmotionProps {
  emotion: Emotion | undefined;
  setEmotion: (emotion: Emotion) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepEmotion: React.FC<StepEmotionProps> = ({
  emotion,
  setEmotion,
  errorMessage,
  setErrorMessage,
}) => {
  const handleEmotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmotion(e.target.value as Emotion);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 2 on 4</h2>
          <h3 className="text-3xl text-white mt-20">
            How are you feeling today?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg">Emotion</legend>
            <select
              value={emotion}
              onChange={handleEmotionChange}
              aria-describedby="emotion-error"
              className="border-2 border-gray-300 p-2 w-full"
            >
              <option value="">Select an emotion</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
            </select>
          </fieldset>
        </div>
        <span
          id="emotion-error"
          className="text-red-500 absolute bottom-20 left-8"
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default StepEmotion;
