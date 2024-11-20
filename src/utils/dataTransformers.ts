import { FeelingLevel, Mood } from "../types/Mood";

export const transformMoodsToChartData = (moods: Mood[]) => {
  return moods.map((mood: Mood) => ({
    name: new Date(mood.createdAt).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    mood: FeelingLevel[mood.feeling],
  }));
};

export const filterMoodDocs = (docs: unknown[]): Mood[] => {
  return docs.filter((doc): doc is Mood => {
    return (
      typeof doc === "object" &&
      doc !== null &&
      "type" in doc &&
      doc.type === "mood"
    );
  });
};
