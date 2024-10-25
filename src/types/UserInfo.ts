export interface UserInfo {
  _id: string;
  _rev?: string;
  onBoardingCompleted: boolean;
  username: string;
  createdAt: string;
  favColor: FavColor;
  gender: Gender;
  friend: Friend;
}

export type Gender = "male" | "female" | "non-binary";
export type Friend = "dog" | "cat" | "rodent";
export type FavColor = "orange" | "rose" | "green" | "blue";
