import { FeelingLevel, Mood } from "../types/Mood";

export const transformMoodsToChartData = (moods: Mood[]) => {
  return moods.map((mood: Mood) => ({
    name: new Date(mood.createdAt).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    mood: FeelingLevel[mood.feeling],
  }));
};
