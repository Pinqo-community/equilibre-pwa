import { Mood } from "../MoodSelection/types";
import { addMood } from "../MoodSelection/pouchdbService";
import { useState } from "react";

const MoodForm: React.FC = () => {
  const [feeling, setFeeling] = useState("");
  const [emotion, setEmotion] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDate = new Date().toISOString();
    const newMood: Mood = {
      _id: newDate,
      createdAt: newDate,
      feeling,
      emotion,
      note,
    };

    try {
      const savedMood = await addMood(newMood);
      setMessage("Mood added successfully");
      console.log(savedMood);
      setEmotion("");
      setFeeling("");
      setNote("");
    } catch (error) {
      setMessage("Error adding mood.");
      console.error("Error adding mood: ", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="space-y-4">
      {message && (
        <p className="text-center font-bold text-gray-500 border p-2">
          {message}
        </p>
      )}
      <div className="form-group">
        <label htmlFor="feeling" className="block mb-1">
          Feeling
        </label>
        <input
          type="text"
          value={feeling}
          name="feeling"
          id="feeling"
          required
          onChange={(e) => setFeeling(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="form-group">
        <label htmlFor="emotion" className="block mb-1">
          Emotion
        </label>
        <input
          type="text"
          name="emotion"
          value={emotion}
          id="emotion"
          required
          onChange={(e) => setEmotion(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="form-group">
        <label htmlFor="note" className="block mb-1">
          Note (écrite)
        </label>
        <textarea
          id="note"
          name="note"
          value={note}
          required
          placeholder="Ma journée s'est bien passée"
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        Enregistrer
      </button>
    </form>
  );
};

export default MoodForm;
