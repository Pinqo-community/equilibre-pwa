import React from "react";

interface StepSplashProps {
  handleNextStep: () => void;
}

const StepSplash: React.FC<StepSplashProps> = ({ handleNextStep }) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="clip-wave bg-[#2563EB] w-full flex-1 flex flex-col items-center justify-center">
        <h2 className="text-6xl font-medium mb-5">Equilibre</h2>
        <p className="text-white opacity-65 pl-6 pr-6 text-center">
          Follow your mood, cultivate your health.
        </p>
      </div>
      <button
        onClick={handleNextStep}
        className="p-3 pr-24 pb-3 pl-24 bg-[#2563EB] rounded-2xl translate-y-[-100%] text-white font-bold shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        Start
      </button>
    </div>
  );
};

export default StepSplash;
