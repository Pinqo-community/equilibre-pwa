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
  const handleFeelingChange = (selectedFeeling: Feeling) => {
    setFeeling(selectedFeeling);
    setErrorMessage(null);
  };

  const feelings: Feeling[] = ["agreable", "disagreable", "neutral"];

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 1 on 3</h2>
          <h3 className="text-3xl text-white mt-20">
            How would you describe your general feeling?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col gap-4">
          <fieldset>
            <legend className="text-lg mb-4">Feeling</legend>
            <div className="flex flex-col gap-3">
              {feelings.map((feelingOption) => (
                <button
                  key={feelingOption}
                  type="button"
                  onClick={() => handleFeelingChange(feelingOption)}
                  className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-colors
                    ${
                      feeling === feelingOption
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#2563EB] border-2 border-[#2563EB]"
                    }
                  `}
                >
                  {feelingOption.charAt(0).toUpperCase() +
                    feelingOption.slice(1)}
                </button>
              ))}
            </div>
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
