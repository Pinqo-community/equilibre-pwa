import useMoods from "../../hooks/useMoods";
import { Emotion, Feeling, Mood } from "../../types/Mood";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Success from "./Success";

const MoodForm: React.FC = () => {
  const { addMood } = useMoods();
  const [feeling, setFeeling] = useState<Feeling | undefined>(undefined);
  const [emotion, setEmotion] = useState<Emotion | undefined>(undefined);
  const [note, setNote] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const maxFormStep = 3;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      console.log(savedMood);
      setEmotion(undefined);
      setFeeling(undefined);
      setNote("");
      setFormStep(1);
      setFormCompleted(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error adding mood.");
      console.error("Error adding mood: ", error);
    }
  };

  const handleNextStep = () => {
    if (formStep === 1 && !feeling) {
      setErrorMessage("Please select your general feelings");
      return;
    }
    if (formStep === 2 && !emotion) {
      setErrorMessage("Please select your emotion");
      return;
    }
    if (formStep == 3 && !note.trim()) {
      setErrorMessage("Please select your note");
      return;
    }
    setErrorMessage(null);
    if (formStep < maxFormStep) setFormStep(formStep + 1);
  };

  const handleNewMood = () => {
    setFormStep(1);
    setFormCompleted(false);
  };

  return (
    <>
      {formCompleted ? (
        <Success handleNewMood={handleNewMood} />
      ) : (
        <form onSubmit={handleFormSubmission}>
          {errorMessage && (
            <p className="text-center font-bold text-red-800 bg-red-50 p-2">
              {errorMessage}
            </p>
          )}

          {formStep === 1 && (
            <Step1 setFeeling={setFeeling} feeling={feeling} />
          )}

          {formStep === 2 && (
            <Step2 setEmotion={setEmotion} emotion={emotion} />
          )}

          {formStep === 3 && <Step3 setNote={setNote} note={note} />}

          <div
            className={`flex gap-4 min-w-full ${formStep === 1 ? "justify-end" : "justify-between"}`}
          >
            {formStep > 1 && (
              <button
                type="button"
                onClick={() => formStep > 1 && setFormStep(formStep - 1)}
              >
                Prev
              </button>
            )}
            {formStep < maxFormStep && (
              <button onClick={handleNextStep} type="button">
                Next
              </button>
            )}
            {formStep === maxFormStep && (
              <button type="submit">Save Mood</button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default MoodForm;
