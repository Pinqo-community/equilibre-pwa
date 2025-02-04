import React from "react";

interface StepNoteProps {
  note: string;
  setNote: (note: string) => void;
}
const StepNote: React.FC<StepNoteProps> = ({ note, setNote }) => {
  return (
    <div className="form-group">
      <label htmlFor="note" className="block mb-1">
        <h2>Do you have something to get off your mind or heart?</h2>
      </label>
      <textarea
        id="note"
        name="note"
        value={note}
        required
        placeholder="It was sunny today... I went swimming!"
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 border rounded-sm"
        rows={10}
      ></textarea>
    </div>
  );
};

export default StepNote;
