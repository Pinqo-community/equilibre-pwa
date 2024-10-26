import React from "react";
interface Step1Props {
  username: string;
  setUsername: (username: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Step1: React.FC<Step1Props> = ({
  username,
  setUsername,
  handleKeyDown,
}) => {
  return (
    <div>
      <label htmlFor="name">
        <h2>Hello friend, how can I call you?</h2>
      </label>
      <input
        required
        type="text"
        name="name"
        id="name"
        autoComplete="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Step1;
