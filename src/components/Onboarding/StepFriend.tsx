import React from "react";
import { friends } from "../../constants";
import { Friend } from "../../types/UserInfo";
import InputRadioItem from "../reusable/InputRadioItem";

interface StepFriendProps {
  friend?: Friend;
  setFriend: (friend: Friend) => void;
}

const StepFriend: React.FC<StepFriendProps> = ({ friend, setFriend }) => {
  const handleSetFriend = (selectedFriend: Friend) => {
    setFriend(selectedFriend);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="bg-[#2563EB] flex-1 p-8">
          <h2 className="mt-8 text-xl">Step 3 on 4</h2>
          <h3 className="text-3xl text-white mt-20">
            Well noted, select a friend for this journey:
          </h3>
        </div>
        <div className="min-h-40 flex p-8 flex-col">
          <fieldset>
            <legend className="text-lg mb-4">Select your friend</legend>
            {friends.map((friendItem) => (
              <InputRadioItem
                key={friendItem}
                onChange={() => handleSetFriend(friendItem)}
                item={friendItem}
                state={friend}
                name="friend"
              />
            ))}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default StepFriend;
