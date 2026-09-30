import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const RADIAN = Math.PI / 180;

// Label customizado para exibir nome e percentual dentro/fora das fatias
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent === 0) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Tooltip customizado com estilo consistente com o projeto
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "0.5rem 0.75rem",
          boxShadow: "var(--shadow)",
          color: "var(--text-primary)",
          fontSize: "0.875rem",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{item.name}</p>
        <p>
          {item.value} tarefa{item.value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

// Legenda customizada
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
        marginTop: "0.5rem",
        padding: 0,
      }}
    >
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: entry.color,
              flexShrink: 0,
            }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const TaskChart = ({ data }) => {
  // Verifica se há dados para exibir
  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (total === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
        }}
      >
        <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</span>
        <p>Nenhuma tarefa para exibir</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskChart;
