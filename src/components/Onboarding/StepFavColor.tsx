import React from "react";
import { favColors } from "../../constants";
import { FavColor } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface StepFavColorProps {
  favColor?: FavColor;
  setFavColor: (favColor: FavColor) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepFavColor: React.FC<StepFavColorProps> = ({
  favColor,
  setFavColor,
  errorMessage,
  setErrorMessage,
}) => {
  const handleFavColorChange = (selectedColor: FavColor) => {
    setFavColor(selectedColor);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] p-8 h-[50vh] min-h-[200px] max-h-[300px] flex flex-col justify-between">
          <h2 className="mt-8 text-xl">Step 4 on 4</h2>
          <h3 className="text-3xl text-white mt-20">
            Thank you! Which color do you prefer?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col ">
          <fieldset>
            <legend className="text-lg mb-4">Select your favorite color</legend>
            {favColors.map((color) => (
              <InputRadioItem
                key={color}
                onChange={() => handleFavColorChange(color)}
                item={color}
                state={favColor}
                name="favColor"
                aria-describedby="color-error"
              />
            ))}
          </fieldset>
        </div>
        <span
          id="color-error"
          className="text-red-500 absolute bottom-20 left-8"
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default StepFavColor;
