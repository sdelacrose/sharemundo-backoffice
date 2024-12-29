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

const SmoothLineChart: React.FC<any> = ({ data, tooltipFormatter }) => {
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
          {tooltipFormatter ? (
            <Tooltip
              formatter={
                tooltipFormatter ? tooltipFormatter : (value) => [`$${value}`]
              }
            />
          ) : (
            <Tooltip />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0057B7"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmoothLineChart;
