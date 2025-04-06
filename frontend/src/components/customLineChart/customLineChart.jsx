import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// import linechartData from "../../data/linechartData";

const CustomLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="95%" height="90%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="performance_date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="impressions"
          stroke="#1E88E5"
          activeDot={{ r: 8 }}
        />
        <Line name="clicks" type="monotone" dataKey="clicks" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
