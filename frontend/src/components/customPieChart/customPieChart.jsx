import {
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({ data, colors, legendName }) => {
  return (
    <ResponsiveContainer width="95%" height="85%">
      <PieChart width="100%" height="100%">
        <Pie data={data} dataKey="status_count" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const entry = payload[0].payload;
              return (
                <div>
                  {entry[legendName]}:{entry.status_count}
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
          formatter={(value, entry, index) => {
            return data[index][legendName];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
