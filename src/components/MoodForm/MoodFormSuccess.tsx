import { Link } from "@tanstack/react-router";
import React from "react";
import friendGif from "../../assets/animations/friend.gif";

const MoodFormSuccess: React.FC = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex flex-col p-8 justify-center">
          <h2 className="text-3xl text-white mt-20 text-center">
            You can feel proud of taking care of yourself!
          </h2>
          <img src={friendGif} alt="friend animation" className="max-h-96" />
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <Link
            to="/"
            className="w-full py-3 px-6 rounded-lg text-base font-medium bg-[#2563EB] text-white text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MoodFormSuccess;
