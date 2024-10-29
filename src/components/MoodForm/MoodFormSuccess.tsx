import React from "react";

interface SuccessProps {
  handleNewMood: () => void;
}
const Success: React.FC<SuccessProps> = ({ handleNewMood }) => {
  return (
    <div>
      <p className="text-2xl text-center font-bold text-gray-600 border p-2">
        You can feel proud of taking care of yourself!
      </p>

      <button
        onClick={handleNewMood}
        className="w-full border rounded-lg font-bold p-2 border-black mt-4"
      >
        New Mood
      </button>
    </div>
  );
};

export default Success;
