export interface UserInfo {
  _id: string;
  _rev?: string;
  onBoardingCompleted: boolean;
  username: string;
  likedColor: "orange" | "rose" | "green" | "blue";
  /* gender:string; */
  companionType: "dog" | "cat" | "rodent";
}
