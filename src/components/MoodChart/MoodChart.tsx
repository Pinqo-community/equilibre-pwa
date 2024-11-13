import { useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import useMoods from "../../hooks/useMoods";
import { Feeling } from "../../types/Mood";

const feelingToLevel: Record<Feeling, number> = {
  agreable: 1,
  disagreable: 2,
  neutral: 3,
};

const levelToFeeling = Object.fromEntries(
  Object.entries(feelingToLevel).map(([key, value]) => [value, key]),
) as Record<number, string>;

const getFeelingLabel = (value: unknown): string | undefined =>
  typeof value === "number" ? levelToFeeling[value] : undefined;

const MoodChart: React.FC = () => {
  const { moods, fetchMoods } = useMoods();

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const data = moods.map((mood) => ({
    name: new Date(mood.createdAt).toLocaleDateString("fr-FR", {
      weekday: "short",
    }),
    mood: feelingToLevel[mood.feeling],
  }));

  return (
    <div
      style={{ width: "clamp(300px, 50%, 600px)" }}
      className="h-auto mx-auto"
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <Tooltip formatter={(value) => [getFeelingLabel(value)]} />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#8884d8"
            fill="#8884d8"
            animationDuration={800} // Optional smooth animation
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
