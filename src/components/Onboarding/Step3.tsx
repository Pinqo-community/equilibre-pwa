import React from "react";
import InputRadioItem from "../reusable/InputRadioItem";
import { FavColor } from "../../types/UserInfo";
import { favColors } from "../../constants";
interface Step3Props {
  favColor: FavColor | undefined;
  setFavColor: (favColor: FavColor) => void;
}
const Step3: React.FC<Step3Props> = ({ favColor, setFavColor }) => {
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

export default Step3;
