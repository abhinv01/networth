import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "2010",
      amount: 240000,
      amt: 2400,
    },
    {
      name: "2012",
      amount: 300000,
      amt: 2210,
    },
    {
      name: "2014",
      amount: 350000,
      amt: 2290,
    },
    {
      name: "2016",
      amount: 300000,
      amt: 2000,
    },
    {
      name: "2018",
      amount: 480000,
      amt: 2181,
    },
    {
      name: "2020",
      amount: 300000,
      amt: 2500,
    },
    {
      name: "2022",
      amount: 280000,
      amt: 2100,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#5765e9"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
