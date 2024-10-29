import React from "react";
interface StepUsernameProps {
  username: string;
  setUsername: (username: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
const StepUsername: React.FC<StepUsernameProps> = ({
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

export default StepUsername;
