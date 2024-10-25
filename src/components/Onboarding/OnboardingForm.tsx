import React, { useState } from "react";
import db from "../../constants/dbConstants";
import { FavColor, Friend, Gender } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface OnboardingFormData {
  name: string;
  gender: Gender | undefined;
  favColor: FavColor | undefined;
  friend: Friend | undefined;
}
interface OnboardingFormProps {
  setOnboardingCompleted: (completed: boolean) => void;
  onboardingCompleted: boolean;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({
  setOnboardingCompleted,
  onboardingCompleted,
}) => {
  const genders: Gender[] = ["male", "female", "non-binary"];
  const favColors: FavColor[] = ["orange", "rose", "green", "blue"];
  const friends: Friend[] = ["dog", "cat", "rodent"];

  const [onboardingFormData, setOnboardingFormData] =
    useState<OnboardingFormData>({
      name: "",
      gender: undefined,
      favColor: undefined,
      friend: undefined,
    });
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await db.put({ ...onboardingFormData, _id: "onboarding" });
    setOnboardingCompleted(true);
  };
  return (
    <>
      {onboardingCompleted ? (
        <div>
          <h2>Congratulations! You've completed the onboarding process.</h2>
          <button>Start your journey</button>
        </div>
      ) : (
        <form onSubmit={handleOnboardingSubmit}>
          {/* Step1 */}
          <div>
            <label htmlFor="name">
              <h2>Hello friend, how can I call you?</h2>
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              autoComplete="firstname"
              value={onboardingFormData.name}
              onChange={(e) =>
                setOnboardingFormData({
                  ...onboardingFormData,
                  name: e.target.value,
                })
              }
            />
          </div>
          {/* Step2 */}

          <fieldset>
            <legend>
              <h2>
                Nice to meet you {onboardingFormData.name}! How do you identify?
              </h2>
            </legend>
            {genders.map((gender) => (
              <InputRadioItem
                key={gender}
                onChange={(e) =>
                  setOnboardingFormData({
                    ...onboardingFormData,
                    gender: e.target.value as Gender,
                  })
                }
                item={gender}
                state={onboardingFormData.gender}
                name="gender"
              />
            ))}
          </fieldset>

          {/* orange rose green blue */}
          {/* Step3 */}
          <fieldset>
            <legend>
              <h2>Thank you! Which color do you prefer?</h2>
            </legend>
            {favColors.map((color) => (
              <InputRadioItem
                key={color}
                onChange={(e) =>
                  setOnboardingFormData({
                    ...onboardingFormData,
                    favColor: e.target.value as FavColor,
                  })
                }
                item={color}
                state={onboardingFormData.favColor}
                name="favColor"
              />
            ))}
          </fieldset>

          {/* Step4 */}
          <fieldset>
            <legend>
              <h2>Well noted, select a friend for this journey:</h2>
            </legend>
            {friends.map((friend) => (
              <InputRadioItem
                key={friend}
                onChange={(e) =>
                  setOnboardingFormData({
                    ...onboardingFormData,
                    friend: e.target.value as Friend,
                  })
                }
                item={friend}
                state={onboardingFormData.friend}
                name="friend"
              />
            ))}
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default OnboardingForm;
