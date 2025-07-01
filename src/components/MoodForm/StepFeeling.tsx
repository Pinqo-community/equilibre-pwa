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
        <div className="bg-[#2563EB] p-8 h-[40vh] min-h-[200px] max-h-[300px] flex flex-col justify-between">
          <h2 className="text-xl">Step 1 on 3</h2>
          <h3 className="text-3xl text-white">
            How would you describe your general feeling?
          </h3>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <fieldset>
            <legend className="text-lg mb-3">Feeling</legend>
            <div className="flex flex-col gap-2">
              {feelings.map((feelingOption) => (
                <button
                  key={feelingOption}
                  type="button"
                  onClick={() => handleFeelingChange(feelingOption)}
                  className={`w-full py-2 px-6 rounded-lg text-base font-medium transition-colors
                    ${
                      feeling === feelingOption
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#2563EB] border-1 border-[#2563EB]"
                    }
                  `}
                >
                  {feelingOption.charAt(0).toUpperCase() +
                    feelingOption.slice(1)}
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

export default StepFeeling;
