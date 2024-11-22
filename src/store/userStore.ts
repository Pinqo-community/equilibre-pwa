import { create } from "zustand";

type Gender =
  | "male"
  | "female"
  | "non-binary"
  | "prefer not to say"
  | undefined;
type Friend = "cat" | "dog" | "rodent" | undefined;
type FavColor = "cold" | "warm" | "no preferences" | undefined;

export interface UserData {
  _id: string;
  username: string;
  gender?: Gender;
  friend?: Friend;
  favColor?: FavColor;
  onboardingCompleted: boolean;
}

interface UserState {
  userData: UserData;
  currentStep: number;
  setUserData: (data: Partial<UserData>) => void;
  goToNextStep: () => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  userData: {
    _id: "user_1",
    username: "",
    gender: undefined,
    friend: undefined,
    favColor: undefined,
    onboardingCompleted: false,
  },
  currentStep: 1,
  setUserData: (data) => {
    const updatedData = { ...get().userData, ...data };
    set({ userData: updatedData });
  },
  goToNextStep: () => {
    const state = get();
    if (state.currentStep >= 4) {
      set({
        userData: { ...state.userData, onboardingCompleted: true },
        currentStep: state.currentStep + 1,
      });
    } else {
      set({ currentStep: state.currentStep + 1 });
    }
  },
  completeOnboarding: () => {
    const updatedData = { ...get().userData, onboardingCompleted: true };
    set({ userData: updatedData });
  },
}));
