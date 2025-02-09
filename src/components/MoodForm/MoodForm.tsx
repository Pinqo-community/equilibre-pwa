import React, { useState } from "react";
import useMoods from "../../hooks/useMoods";
import { Emotion, Feeling, Mood } from "../../types/Mood";
import Success from "./MoodFormSuccess";
import StepEmotion from "./StepEmotion";
import StepFeeling from "./StepFeeling";
import StepNote from "./StepNote";

const MOOD_STEPS = [
  { id: "FEELING", component: StepFeeling },
  { id: "EMOTION", component: StepEmotion },
  { id: "NOTE", component: StepNote },
  { id: "SUCCESS", component: Success },
];

const MoodForm: React.FC = () => {
  const { addMood } = useMoods();
  const [mood, setMood] = useState({
    feeling: undefined as Feeling | undefined,
    emotion: undefined as Emotion | undefined,
    note: "",
    currentStepId: MOOD_STEPS[0].id,
    errorMessage: null as string | null,
  });

  const handleNextStep = () => {
    if (mood.currentStepId === "FEELING" && !mood.feeling) {
      setMood((prevState) => ({
        ...prevState,
        errorMessage: "Please select your feeling",
      }));
      return;
    }

    if (mood.currentStepId === "EMOTION" && !mood.emotion) {
      setMood((prevState) => ({
        ...prevState,
        errorMessage: "Please select your emotion",
      }));
      return;
    }

    const currentStepIndex = MOOD_STEPS.findIndex(
      (step) => step.id === mood.currentStepId,
    );
    if (currentStepIndex < MOOD_STEPS.length - 1) {
      setMood((prevState) => ({
        ...prevState,
        currentStepId: MOOD_STEPS[currentStepIndex + 1].id,
        errorMessage: null,
      }));
    }
  };

  const handlePrevStep = () => {
    const currentStepIndex = MOOD_STEPS.findIndex(
      (step) => step.id === mood.currentStepId,
    );
    if (currentStepIndex > 0) {
      setMood((prevState) => ({
        ...prevState,
        currentStepId: MOOD_STEPS[currentStepIndex - 1].id,
        errorMessage: null,
      }));
    }
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDate = new Date().toISOString();
    const newMood: Mood = {
      _id: newDate,
      createdAt: newDate,
      feeling: mood.feeling!,
      emotion: mood.emotion!,
      type: "mood",
      note: mood.note,
    };

    try {
      await addMood(newMood);
      setMood((prevState) => ({
        ...prevState,
        currentStepId: "SUCCESS",
      }));
    } catch (error) {
      console.error("Error saving mood:", error);
      setMood((prevState) => ({
        ...prevState,
        errorMessage: "An error occurred while saving your mood.",
      }));
    }
  };

  const handleNewMood = () => {
    setMood({
      feeling: undefined,
      emotion: undefined,
      note: "",
      currentStepId: MOOD_STEPS[0].id,
      errorMessage: null,
    });
  };

  return (
    <form onSubmit={handleFormSubmission} className="w-full h-full" noValidate>
      {mood.currentStepId === "FEELING" && (
        <StepFeeling
          feeling={mood.feeling}
          setFeeling={(feeling: Feeling) =>
            setMood((prevState) => ({ ...prevState, feeling }))
          }
          errorMessage={mood.errorMessage}
          setErrorMessage={(errorMessage: string | null) =>
            setMood((prevState) => ({ ...prevState, errorMessage }))
          }
        />
      )}
      {mood.currentStepId === "EMOTION" && (
        <StepEmotion
          emotion={mood.emotion}
          setEmotion={(emotion: Emotion) =>
            setMood((prevState) => ({ ...prevState, emotion }))
          }
          errorMessage={mood.errorMessage}
          setErrorMessage={(errorMessage: string | null) =>
            setMood((prevState) => ({ ...prevState, errorMessage }))
          }
        />
      )}
      {mood.currentStepId === "NOTE" && (
        <StepNote
          note={mood.note}
          setNote={(note: string) =>
            setMood((prevState) => ({ ...prevState, note }))
          }
          errorMessage={mood.errorMessage}
          setErrorMessage={(errorMessage: string | null) =>
            setMood((prevState) => ({ ...prevState, errorMessage }))
          }
        />
      )}
      {mood.currentStepId === "SUCCESS" && (
        <Success handleNewMood={handleNewMood} />
      )}
      <div className="flex gap-4 justify-center p-8">
        {mood.currentStepId !== "SUCCESS" && (
          <div className="flex w-full justify-around">
            <button
              type="button"
              onClick={handlePrevStep}
              className="p-4 bg-gray-200 rounded-2xl font-bold shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="p-4 bg-[#2563EB] rounded-2xl text-white font-bold shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default MoodForm;
