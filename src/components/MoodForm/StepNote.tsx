import React from "react";

interface StepNoteProps {
  note: string;
  setNote: (note: string) => void;
}

const StepNote: React.FC<StepNoteProps> = ({ note, setNote }) => {
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] p-8 h-[40vh] min-h-[200px] max-h-[300px] flex flex-col justify-between">
          <h2 className="mt-8 text-xl">Step 3 on 3</h2>
          <h3 className="text-3xl text-white mt-20">
            Would you like to add any notes?
          </h3>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <fieldset>
            <legend className="text-lg">Notes</legend>
            <textarea
              value={note}
              onChange={handleNoteChange}
              className="border-2 border-gray-300 p-2 w-full"
              rows={8}
            />
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default StepNote;
