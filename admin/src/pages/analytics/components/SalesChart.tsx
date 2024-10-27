import { memo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "../data";


const SalesChart = () => {

  return (
    <ResponsiveContainer width="100%" height={400}>
    <BarChart data={salesData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
  )
}

export default memo(SalesChart)
