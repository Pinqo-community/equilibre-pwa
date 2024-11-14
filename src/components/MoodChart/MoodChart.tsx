import { useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import useMoods from "../../hooks/useMoods";
import { FeelingLevel } from "../../types/Mood";
import { transformMoodsToChartData } from "../../utils/dataTransformers";

const MoodChart: React.FC = () => {
  const { moods, fetchMoods } = useMoods();

  useEffect(() => {
    fetchMoods();
  }, [fetchMoods]);

  const data = transformMoodsToChartData(moods);

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
          <Tooltip formatter={(value) => [FeelingLevel[value as number]]} />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
