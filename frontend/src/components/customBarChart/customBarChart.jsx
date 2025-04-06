import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="95%" height="90%">
      <BarChart width="100%" height="100%" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="performance_date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="click_through_rate" fill="#1E88E5" />
        <Bar dataKey="cost_per_click" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
