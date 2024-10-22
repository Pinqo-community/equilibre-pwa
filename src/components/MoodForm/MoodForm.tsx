import useMoods from "../../hooks/useMoods";
import { Feeling, Mood } from "../../types/Mood";
import { useState } from "react";

const MoodForm: React.FC = () => {
  const { addMood } = useMoods();
  const [feeling, setFeeling] = useState<Feeling | undefined>(undefined);
  const [emotion, setEmotion] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const feelings: Feeling[] = ["agreable", "disagreable", "neutral"];

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDate = new Date().toISOString();
    const newMood: Mood = {
      _id: newDate,
      createdAt: newDate,
      feeling: feeling!,
      emotion,
      note,
    };

    try {
      const savedMood = await addMood(newMood);
      setMessage("Mood added successfully");
      console.log(savedMood);
      setEmotion("");
      setFeeling(undefined);
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

      {/* Form Step1 */}
      <fieldset>
        <legend>
          <h2>How would you describe your general feelings?</h2>
        </legend>
        {feelings.map((f) => (
          <div key={f}>
            <input
              type="radio"
              name="feeling"
              id={f}
              value={f}
              required
              checked={feeling === f}
              onChange={(e) => setFeeling(e.target.value as Feeling)}
            />
            <label htmlFor={f}>{f}</label>
          </div>
        ))}
      </fieldset>
      {/* End of Form Step 1 */}

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
          Note
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
      <button type="submit" className="">
        Enregistrer
      </button>
    </form>
  );
};

export default MoodForm;
