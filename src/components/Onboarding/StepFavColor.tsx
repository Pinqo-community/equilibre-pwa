import React from "react";
import InputRadioItem from "../reusable/InputRadioItem";
import { FavColor } from "../../types/UserInfo";
import { favColors } from "../../constants";
interface StepFavColorProps {
  favColor: FavColor | undefined;
  setFavColor: (favColor: FavColor) => void;
}
const StepFavColor: React.FC<StepFavColorProps> = ({
  favColor,
  setFavColor,
}) => {
  return (
    <fieldset>
      <legend>
        <h2>Thank you! Which color do you prefer?</h2>
      </legend>
      {favColors.map((c) => (
        <InputRadioItem
          key={c}
          onChange={(e) => setFavColor(e.target.value as FavColor)}
          item={c}
          state={favColor}
          name="favColor"
        />
      ))}
    </fieldset>
  );
};

export default StepFavColor;
