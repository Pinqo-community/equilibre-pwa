import { Emotion, Feeling } from "../../types/Mood";
import { FavColor, Friend, Gender } from "../../types/UserInfo";

interface InputRadioItemProps {
  onChange: (e: any) => void;
  item: string;
  state: Feeling | Emotion | Gender | Friend | FavColor | undefined;
  name: "feeling" | "emotion" | "gender" | "friend" | "favColor";
}
const InputRadioItem: React.FC<InputRadioItemProps> = ({
  onChange,
  item,
  state,
  name,
}) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={item}
        value={item}
        required
        checked={state === item}
        onChange={onChange}
      />
      <label htmlFor={item} className="cursor-pointer ml-2">
        {item}
      </label>
    </div>
  );
};

export default InputRadioItem;
