// PieChartLegend.tsx
import React from "react";

const PieChartLegend = ({
  data,
  colors,
}: {
  data: { name: string; value: number }[];
  colors: string[];
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem", marginLeft: 1 }}>
      {data.map((item, index) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: colors[index % colors.length],
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <span style={{ fontSize: 14, color: "#333" }}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PieChartLegend;
