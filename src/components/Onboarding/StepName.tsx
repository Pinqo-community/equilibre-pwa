import React from "react";

interface StepUsernameProps {
  username: string;
  setUsername: (username: string) => void;
  handleNextStep: () => void;
}

const StepUsername: React.FC<StepUsernameProps> = ({
  username,
  setUsername,
  handleNextStep,
}) => {
  /* So the user can't submit the form pressing enter in the first step :)))) */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

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
        onChange={(e) => setUsername(e.target.value.trim())}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default StepUsername;
