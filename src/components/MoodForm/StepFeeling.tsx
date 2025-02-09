import React from "react";
import { Feeling } from "../../types/Mood";

interface StepFeelingProps {
  feeling: Feeling | undefined;
  setFeeling: (value: Feeling) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepFeeling: React.FC<StepFeelingProps> = ({
  feeling,
  setFeeling,
  errorMessage,
  setErrorMessage,
}) => {
  const handleFeelingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeeling(e.target.value as Feeling);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 1 on 4</h2>
          <h3 className="text-3xl text-white mt-20">
            How are you feeling today?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg">Feeling</legend>
            <select
              value={feeling}
              onChange={handleFeelingChange}
              aria-describedby="feeling-error"
              className="border-2 border-gray-300 p-2 w-full"
            >
              <option value="">Select a feeling</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
              <option value="neutral">Neutral</option>
            </select>
          </fieldset>
        </div>
        <span
          id="feeling-error"
          className="text-red-500 absolute bottom-20 left-8"
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default StepFeeling;
