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

const SharpLineChart: React.FC<any> = ({
  data,
  tooltipFormatter,
  yAxisFormatter,
  yAxisLabel,
}) => {
  return (
    <div style={{ width: "100%", height: 400, margin: "20px auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 40, left: 70, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={yAxisFormatter}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              offset: -60,
              style: { textAnchor: "middle" },
            }}
          />
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
            type="linear"
            dataKey="value"
            stroke="#0057B7"
            strokeWidth={2}
            dot={false}
            label={({ x, y, value }) => (
              <text
                x={x}
                y={y - 10}
                fill="#0057B7"
                fontSize={12}
                textAnchor="middle"
              >
                {yAxisFormatter ? yAxisFormatter(value) : value}
              </text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SharpLineChart;
