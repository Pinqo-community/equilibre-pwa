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
  /* So the user can't submit the form pressing enter in the first step */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 1 on 4</h2>
          <h3 className="text-3xl text-white mt-20">
            Hello friend, how can I call you?
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <label htmlFor="name" className="text-lg">
            My name is...
          </label>
          <input
            required
            placeholder="Jane"
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            className="border-b-4 border-[#2563EB] pt-7 pb-2 focus:outline-none mb-11"
          />
        </div>
      </div>
    </div>
  );
};

export default StepUsername;
