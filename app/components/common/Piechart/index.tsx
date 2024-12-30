import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#00C1D4", "#004FA7", "#F3A218"];

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

const PieChartComponent = ({ totalUsers, totalCustomers, licenseCount }: any) => {
  const total = totalUsers + totalCustomers + licenseCount;

  const data = [
    { name: "Solution with the amount of Users", value: totalUsers },
    { name: "Solution with the amount of Customers", value: totalCustomers },
    { name: "Solution with the amount of Licenses", value: licenseCount },
  ].map((item) => ({ ...item, value: (item.value / total) * 100 }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Tooltip
          formatter={(value: any, name: any) => [`${value.toFixed(2)}%`, name]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            cursor:"pointer"
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props) => renderCustomizedLabel({ ...props, ...data[props.index] })}
          outerRadius={220}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
