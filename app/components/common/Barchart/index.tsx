import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BarChartComponent: React.FC<any> = ({ data, tooltipFormatter, yAxisFormatter }) => {
  return (
    <div style={{ width: "100%", height: 400, margin: "20px auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          {tooltipFormatter ? (
            <Tooltip
              formatter={
                tooltipFormatter ? tooltipFormatter : (value) => [`$${value}`]
              }
            />
          ) : (
            <Tooltip />
          )}

          <Bar
            dataKey="value"
            fill="#0057b7"
            barSize={50}
            label={({ x, y, value }) => (
              <text
                x={x + 25}
                y={y - 10}
                fill="#0057B7"
                fontSize={12}
                textAnchor="middle"
              >
                {yAxisFormatter ? yAxisFormatter(value) : value}
              </text>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
