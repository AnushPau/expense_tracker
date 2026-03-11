import React from 'react'
import Link from 'next/link'

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const total = Number(budget?.amount) || 0;
    const spent = Number(budget?.totalSpend) || 0;

    if (total <= 0) return 0;

    const perc = (spent / total) * 100;
    return Math.min(perc, 100).toFixed(2);
  }

  return (
    <Link
      href={'/dashboard/expenses/' + budget?.id}
      
    >
      <div className='p-5 border rounded-lg gap-2 shadow-md hover:shadow-xl cursor-pointer h-45'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-3xl p-2 px-4 bg-slate-100 rounded-full'>
            {budget?.icon}
          </h2>
          <div>
            <h2 className='font-bold'>{budget?.name}</h2>
            <h2 className='text-sm text-gray-500'>
              {budget?.totalItems || 0} Item
            </h2>
          </div>
        </div>
        <h2 className='font-bold text-primary text-lg'>${budget?.amount}</h2>
      </div>

      <div className='mt-5'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-xs text-slate-400'>
            ${budget?.totalSpend ? budget.totalSpend : 0} Spent
          </h2>
          <h2 className='text-xs text-slate-400'>
            ${Number(budget?.amount || 0) - Number(budget?.totalSpend || 0)} Remaining
          </h2>
        </div>

        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div
            className='bg-primary h-2 rounded-full'
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
      </div>
      </div>
    </Link>
  )
}

export default BudgetItem