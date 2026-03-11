import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashBoard({budgetList}) {



  return (
    <div className = 'border rounded-md p-3'>
      <h2 className="text-lg font-semibold">Activity</h2>
      <ResponsiveContainer width="80%" height={300}>
      <BarChart
        
        data={budgetList}
        margin={{top:7}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip/>
        <Legend/>
        <YAxis />
        <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />

      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashBoard
