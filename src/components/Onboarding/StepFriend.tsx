import React from "react";
import InputRadioItem from "../reusable/InputRadioItem";
import { Friend } from "../../types/UserInfo";
import { friends } from "../../constants";

interface StepFriendProps {
  friend: Friend | undefined;
  setFriend: (friend: Friend) => void;
}
const StepFriend: React.FC<StepFriendProps> = ({ friend, setFriend }) => {
  return (
    <fieldset>
      <legend>
        <h2>Well noted, select a friend for this journey:</h2>
      </legend>
      {friends.map((f) => (
        <InputRadioItem
          key={f}
          onChange={(e) => setFriend(e.target.value as Friend)}
          item={f}
          state={friend}
          name="friend"
        />
      ))}
    </fieldset>
  );
};

export default StepFriend;
