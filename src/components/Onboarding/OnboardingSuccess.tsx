import React from "react";
import friendGif from "../../assets/animations/friend.gif";

interface OnboardingSuccessProps {
  username: string;
}

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = ({ username }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex flex-col p-8 justify-center">
          <h2 className="text-3xl text-white mt-20 text-center">
            Welcome aboard, {username}!
          </h2>
          <img src={friendGif} alt="friend animation" className="max-h-96" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
