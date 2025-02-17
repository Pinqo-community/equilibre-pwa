import React from "react";

interface StepNoteProps {
  note: string;
  errorMessage: string | null;
  setNote: (note: string) => void;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepNote: React.FC<StepNoteProps> = ({
  note,
  errorMessage,
  setNote,
  setErrorMessage,
}) => {
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 3 on 3</h2>
          <h3 className="text-3xl text-white mt-20">
            Would you like to add any notes?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg">Notes</legend>
            <textarea
              value={note}
              onChange={handleNoteChange}
              aria-describedby="note-error"
              className="border-2 border-gray-300 p-2 w-full"
              rows={8}
            />
          </fieldset>
        </div>
        <span
          id="note-error"
          className="text-red-500 absolute bottom-20 left-8"
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default StepNote;
