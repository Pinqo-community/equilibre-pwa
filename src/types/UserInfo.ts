export interface UserInfo {
  _id: string;
  _rev?: string;
  onBoardingCompleted: boolean;
  name: string;
  companionType: "dog" | "cat";
}
