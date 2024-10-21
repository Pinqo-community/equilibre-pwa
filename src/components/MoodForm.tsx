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

      // clear
      setEmotion("");
      setFeeling("");
      setNote("");

      console.log(savedMood);
    } catch (error) {
      setMessage("Error adding mood.");
      console.log("Error adding mood: ", error);
    }
  };

  return (
    <>
      {message && <p>{message}</p>}
      <form onSubmit={handleFormSubmission}>
        <div className="form-group">
          <label htmlFor="feeling">Feeling</label>
          <input
            type="text"
            value={feeling}
            name="feeling"
            id="feeling"
            onChange={(e) => setFeeling(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emotion">Emotion</label>
          <input
            type="text"
            name="emotion"
            value={emotion}
            id="emotion"
            onChange={(e) => setEmotion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note (écrite)</label>
          <textarea
            id="note"
            name="note"
            value={note}
            placeholder="Ma journée s'est bien passée"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button className="bg-blue-500" type="submit">
          Enregistrer
        </button>
      </form>
    </>
  );
};

export default MoodForm;
