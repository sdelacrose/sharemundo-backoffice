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

const BarChartComponent: React.FC<any> = ({ data, tooltipFormatter }) => {
  return (
    <div style={{ width: "100%", height: 400, margin: "20px auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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

          <Bar dataKey="value" fill="#0057b7" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
