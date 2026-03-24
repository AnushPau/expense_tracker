import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

function BarChartDashBoard({ budgetList }) {

  const isLoading = !budgetList || budgetList.length === 0;

  return (
    <div className='border rounded-md p-3'>
      <h2 className="text-lg font-semibold mb-3">Activity</h2>

      {isLoading ? (
        // 🔥 Skeleton UI
        <div className="animate-pulse space-y-3">
          
          {/* fake bars */}
          <div className="h-[300px] flex items-end gap-3">
            <div className="bg-gray-300 rounded w-6 h-20"></div>
            <div className="bg-gray-300 rounded w-6 h-32"></div>
            <div className="bg-gray-300 rounded w-6 h-24"></div>
            <div className="bg-gray-300 rounded w-6 h-40"></div>
            <div className="bg-gray-300 rounded w-6 h-28"></div>
            <div className="bg-gray-300 rounded w-6 h-36"></div>
          </div>

          {/* fake labels */}
          <div className="flex justify-between px-2">
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      ) : (
        // ✅ Actual chart
        <ResponsiveContainer width="80%" height={300}>
          <BarChart
            data={budgetList}
            margin={{ top: 7 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <YAxis />
            <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
            <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default BarChartDashBoard