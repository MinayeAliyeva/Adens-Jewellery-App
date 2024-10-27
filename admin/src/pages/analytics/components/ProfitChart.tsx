import { memo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { salesData } from '../data'

const ProfitChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
    <LineChart data={salesData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="profit" stroke="#ff7300" />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default memo(ProfitChart)
