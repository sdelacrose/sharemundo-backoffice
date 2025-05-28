import PieChartLegend from "@/app/container/Dashboard/PieChartLegend";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#0F4C81",
  "#D4AF37",
  "#8E44AD",
  "#2C3E50",
  "#C0392B",
  "#16A085",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = ({ licenseData }: { licenseData: { product_name: string; license_count: number }[] }) => {
  // Filter out entries with zero license count
  const filteredData = licenseData
    .filter(item => item.license_count > 0)
    .map(item => ({
      name: item.product_name,
      value: item.license_count,
    }));

  return (
    <>
    <PieChartLegend data={filteredData} colors={COLORS} />
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Tooltip
          formatter={(value: any, name: any) => [`${value}`, name]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            cursor: "pointer",
          }}
        />
        <Pie
          data={filteredData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={220}
          fill="#8884d8"
          dataKey="value"
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    </>
  );
};

export default PieChartComponent;
