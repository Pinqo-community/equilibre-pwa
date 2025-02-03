import React from "react";

const StepConfirm: React.FC<{
  handleOnboardingSubmit: (e: React.FormEvent) => void;
}> = ({ handleOnboardingSubmit }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 5 on 5</h2>
          <h3 className="text-3xl text-white mt-20">Is everything correct?</h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <p className="text-lg mb-4">
            If you want to make any changes, you can go back. Otherwise, please
            confirm your information.
          </p>
          <button
            type="submit"
            onClick={handleOnboardingSubmit}
            className="py-2 px-4 bg-[#2563EB] text-white rounded"
          >
            Confirm and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepConfirm;
