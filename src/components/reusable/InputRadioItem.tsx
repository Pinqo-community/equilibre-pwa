import { Emotion, Feeling } from "../../types/Mood";

interface InputRadioItemProps {
  onChange: (e: any) => void;
  item: string;
  state: Feeling | Emotion | undefined;
  name: "feeling" | "emotion";
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
