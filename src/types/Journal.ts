import { Mood } from "./Mood";

export interface Journal {
  _id: string;
  _rev?: string;
  createdAt: string;
  type: "journal";
  content: string;
  title: string;
  date: string;
  category:
    | "reflexion"
    | "gratitude"
    | "victory"
    | "challenge"
    | "goal"
    | "inspiration"
    | "difficulty";
  mood?: Mood;
  isPrivate: boolean;
}
