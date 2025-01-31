import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import usePouchDb from "../../hooks/usePouchDb";
import { FavColor, Friend, Gender, UserInfo } from "../../types/UserInfo";
import OnboardingConfirm from "./OnboardingConfirm";
import OnboardingSuccess from "./OnboardingSuccess";
import StepFavColor from "./StepFavColor";
import StepFriend from "./StepFriend";
import StepGender from "./StepGender";
import StepUsername from "./StepName";
import StepSplash from "./StepSplash";
interface OnboardingFormProps {
  setOnboardingCompleted: (completed: boolean) => void;
}

const ONBOARDING_STEPS = [
  { id: "SPLASH", component: StepSplash },
  { id: "USERNAME", component: StepUsername },
  { id: "GENDER", component: StepGender },
  { id: "FAVCOLOR", component: StepFavColor },
  { id: "FRIEND", component: StepFriend },
  { id: "CONFIRM", component: OnboardingConfirm },
  { id: "SUCCESS", component: OnboardingSuccess },
];

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  setOnboardingCompleted,
}) => {
  const [user, setUser] = useState<UserInfo>({
    _id: "",
    onBoardingCompleted: false,
    username: "",
    createdAt: new Date().toISOString(),
    type: "onboarding",
    gender: undefined,
    favColor: undefined,
    friend: undefined,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<string>(
    ONBOARDING_STEPS[0].id,
  );
  const { addDoc } = usePouchDb();

  const setUserAttribute = <K extends keyof UserInfo>(
    attribute: K,
    value: UserInfo[K],
  ) => {
    setUser((prevUser) => ({ ...prevUser, [attribute]: value }));
  };

  const handleNextStep = () => {
    if (currentStepId == "USERNAME" && !user.username.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }

    if (currentStepId == "GENDER" && !user.gender) {
      setErrorMessage("Please select your gender");
      return;
    }

    if (currentStepId == "FAVCOLOR" && !user.favColor) {
      setErrorMessage("Please select your favorite color");
      return;
    }

    if (currentStepId == "FRIEND" && !user.friend) {
      setErrorMessage("Please select your friend");
      return;
    }

    const currentStepIndex = ONBOARDING_STEPS.findIndex(
      (step) => step.id === currentStepId,
    );
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      setCurrentStepId(ONBOARDING_STEPS[currentStepIndex + 1].id);
      setErrorMessage("");
    }
  };

  const handlePrevStep = () => {
    const currentStepIndex = ONBOARDING_STEPS.findIndex(
      (step) => step.id === currentStepId,
    );
    if (currentStepIndex > 0) {
      setCurrentStepId(ONBOARDING_STEPS[currentStepIndex - 1].id);
      setErrorMessage("");
    }
  };

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userToSave: UserInfo = {
        _id: new Date().getTime().toString(),
        username: user.username,
        type: "onboarding",
        onBoardingCompleted: true,
        createdAt: new Date().toISOString(),
        gender: user.gender,
        favColor: user.favColor,
        friend: user.friend,
      };
      console.log(userToSave);
      await addDoc(userToSave);
      setCurrentStepId("SUCCESS");
      setLoading(false);
    } catch (error) {
      console.error("Error saving user:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleOnboardingSubmit}
        className="w-full h-full"
        noValidate
      >
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {currentStepId == "SPLASH" && (
          <StepSplash handleNextStep={handleNextStep} />
        )}
        {currentStepId == "USERNAME" && (
          <StepUsername
            handleNextStep={handleNextStep}
            username={user.username}
            setUsername={(username: string) =>
              setUserAttribute("username", username)
            }
          />
        )}
        {currentStepId == "GENDER" && (
          <StepGender
            gender={user.gender}
            setGender={(gender: Gender) => setUserAttribute("gender", gender)}
          />
        )}
        {currentStepId == "FAVCOLOR" && (
          <StepFavColor
            favColor={user.favColor}
            setFavColor={(favColor: FavColor) =>
              setUserAttribute("favColor", favColor)
            }
          />
        )}
        {currentStepId == "FRIEND" && (
          <StepFriend
            friend={user.friend}
            setFriend={(friend: Friend) => {
              setUserAttribute("friend", friend);
            }}
          />
        )}
        {currentStepId == "CONFIRM" && (
          <OnboardingConfirm handleOnboardingSubmit={handleOnboardingSubmit} />
        )}
        {currentStepId == "SUCCESS" && (
          <OnboardingSuccess username={user.username} />
        )}
        <div>
          {currentStepId != "SPLASH" && currentStepId != "SUCCESS" && (
            <div className="flex gap-4 justify-between mb-8 pr-8">
              <button type="button" onClick={handlePrevStep}>
                Prev
              </button>
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}
          {currentStepId === "SUCCESS" && (
            <Link
              to={"/mood"}
              onClick={() => setOnboardingCompleted(true)}
              className="bg-slate-200 text-black p-2 rounded-md hover:bg-slate-900 hover:text-white font-bold transition-colors"
            >
              {loading ? "Loading..." : "Start your journey"}
            </Link>
          )}
        </div>
      </form>
    </>
  );
};

export default OnboardingForm;
