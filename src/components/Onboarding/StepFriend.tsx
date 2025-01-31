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
    <fieldset>
      <legend>
        <h2>Well noted, select a friend for this journey:</h2>
      </legend>
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
  );
};

export default StepFriend;
