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
  const handleEmotionChange = (selectedEmotion: Emotion) => {
    setEmotion(selectedEmotion);
    setErrorMessage(null);
  };

  const emotions: Emotion[] = [
    "joy",
    "sadness",
    "anger",
    "love",
    "disgust",
    "fear",
  ];

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] p-8 h-[40vh] min-h-[200px] max-h-[300px] flex flex-col justify-between">
          <h2 className="mt-8 text-xl">Step 2 on 3</h2>
          <h3 className="text-3xl text-white mt-20">
            How are you feeling today?
          </h3>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <fieldset>
            <legend className="text-lg mb-4">Emotion</legend>
            <div className="grid grid-cols-2 gap-3">
              {emotions.map((emotionOption) => (
                <button
                  key={emotionOption}
                  type="button"
                  onClick={() => handleEmotionChange(emotionOption)}
                  className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-colors border border-[#2563EB]
                    ${
                      emotion === emotionOption
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#2563EB]"
                    }
                  `}
                >
                  {emotionOption.charAt(0).toUpperCase() +
                    emotionOption.slice(1)}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="h-6 mt-2">
            {errorMessage && (
              <span className="text-red-500">{errorMessage}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepEmotion;
