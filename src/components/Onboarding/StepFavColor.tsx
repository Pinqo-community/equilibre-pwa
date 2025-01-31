import React from "react";
import { favColors } from "../../constants";
import { FavColor } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface StepFavColorProps {
  favColor?: FavColor;
  setFavColor: (favColor: FavColor) => void;
}

const StepFavColor: React.FC<StepFavColorProps> = ({
  favColor,
  setFavColor,
}) => {
  const handleFavColorChange = (selectedColor: FavColor) => {
    setFavColor(selectedColor);
  };

  return (
    <fieldset>
      <legend>
        <h2>Thank you! Which color do you prefer?</h2>
      </legend>
      {favColors.map((color) => (
        <InputRadioItem
          key={color}
          onChange={() => handleFavColorChange(color)}
          item={color}
          state={favColor}
          name="favColor"
        />
      ))}
    </fieldset>
  );
};

export default StepFavColor;
