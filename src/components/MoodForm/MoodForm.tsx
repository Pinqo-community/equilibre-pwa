import useMoods from "../../hooks/useMoods";
import { Emotion, Feeling, Mood } from "../../types/Mood";
import { useState } from "react";

const MoodForm: React.FC = () => {
  const { addMood } = useMoods();
  const [feeling, setFeeling] = useState<Feeling | undefined>(undefined);
  const [emotion, setEmotion] = useState<Emotion | undefined>(undefined);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const feelings: Feeling[] = ["agreable", "disagreable", "neutral"];
  const emotions: Emotion[] = [
    "anger",
    "disgust",
    "fear",
    "joy",
    "love",
    "sadness",
  ];
  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDate = new Date().toISOString();
    const newMood: Mood = {
      _id: newDate,
      createdAt: newDate,
      feeling: feeling!,
      emotion: emotion!,
      note,
    };

    try {
      const savedMood = await addMood(newMood);
      setMessage("You can feel proud of taking care of yourself!");
      console.log(savedMood);
      setEmotion(undefined);
      setFeeling(undefined);
      setNote("");
    } catch (error) {
      setMessage("Error adding mood.");
      console.error("Error adding mood: ", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmission} className="space-y-4">
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

      {/* Form Step2 */}
      <fieldset>
        <legend>
          <h2>What emotion resonates the most with you?</h2>
        </legend>
        {emotions.map((e) => (
          <div key={e}>
            <input
              type="radio"
              name="emotion"
              id={e}
              value={e}
              required
              checked={emotion === e}
              onChange={(e) => setEmotion(e.target.value as Emotion)}
            />
            <label htmlFor={e}>{e}</label>
          </div>
        ))}
      </fieldset>
      {/* End of Form Step 2 */}

      {/* Note - Form Step 3 */}
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
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="">
        Save Mood
      </button>

      {message && (
        <h3 className="text-2xl text-center font-bold text-gray-600 border p-2">
          {message}
        </h3>
      )}
    </form>
  );
};

export default MoodForm;
