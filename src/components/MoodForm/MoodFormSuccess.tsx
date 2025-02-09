import React from "react";

interface SuccessProps {
  handleNewMood: () => void;
}

const MoodFormSuccess: React.FC<SuccessProps> = ({ handleNewMood }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Congratulations!</h2>
          <h3 className="text-3xl text-white mt-20">
            You can feel proud of taking care of yourself!
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <button
            onClick={handleNewMood}
            className="py-2 px-4 bg-[#2563EB] text-white rounded-sm"
          >
            New Mood
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodFormSuccess;
