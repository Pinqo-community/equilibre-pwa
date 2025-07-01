import React from "react";

interface StepUsernameProps {
  username: string;
  setUsername: (username: string) => void;
  handleNextStep: () => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const StepUsername: React.FC<StepUsernameProps> = ({
  username,
  setUsername,
  handleNextStep,
  errorMessage,
  setErrorMessage,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNextStep();
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] p-8 h-[50vh] min-h-[200px] max-h-[300px] flex flex-col justify-between">
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
            autoComplete="given-name"
            value={username}
            onChange={handleUserNameChange}
            onKeyDown={handleKeyDown}
            className="border-b-4 border-[#2563EB] pt-7 pb-2 focus:outline-hidden mb-11"
            aria-describedby="firstname-error"
          />
        </div>
        <span
          id="firstname-error"
          className="text-red-500 absolute bottom-20 left-8"
        >
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default StepUsername;
