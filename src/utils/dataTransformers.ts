import { FeelingLevel, Mood } from "../types/Mood";

export const transformMoodsToChartData = (moods: Mood[]) => {
  return moods.map((mood: Mood) => ({
    name: new Date(mood.createdAt).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    mood: FeelingLevel[mood.feeling],
  }));
};

export const filterDocsByType = <T extends { type: string }>(
  docs: T[],
  type: string,
): T[] => {
  return docs.filter((doc) => doc.type === type);
};
