import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "1", value: 100 },
  { name: "2", value: 200 },
  { name: "3", value: 150 },
  { name: "4", value: 250 },
  { name: "5", value: 300 },
  { name: "6", value: 280 },
  { name: "7", value: 320 },
  { name: "8", value: 290 },
  { name: "9", value: 330 },
  { name: "10", value: 400 },
  { name: "11", value: 100 },
  { name: "12", value: 900 },
];

interface SmoothLineChartProps {
  data: { name: string; value: number }[];
}

const SmoothLineChart: React.FC<SmoothLineChartProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 400, margin: "20px auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#007bff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmoothLineChart;
