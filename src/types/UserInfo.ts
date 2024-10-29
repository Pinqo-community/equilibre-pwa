export interface UserInfo {
  _id: string;
  _rev?: string;
  onBoardingCompleted: boolean;
  username: string;
  createdAt: string;
  type: "onboarding";
  /* likedColor: "orange" | "rose" | "green" | "blue"; */
  /* gender:string; */
  /* companionType: "dog" | "cat" | "rodent"; */
}
