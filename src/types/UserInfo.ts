export interface UserInfo {
  _id: string;
  _rev?: string;
  onBoardingCompleted: boolean;
  username: string;
  createdAt: string;
  type: "onboarding";
  gender: Gender | undefined;
  favColor: FavColor | undefined;
  friend: Friend | undefined;
}

export type Gender = "male" | "female" | "non-binary";
export type Friend = "dog" | "cat" | "rodent";
export type FavColor = "orange" | "rose" | "green" | "blue";
