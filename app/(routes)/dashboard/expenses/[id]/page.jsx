"use client"
import React, { useEffect, useState } from 'react'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { eq, sql, getTableColumns, and } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from './_components/AddExpenses'

function ExpensesScreen() {
  const { user } = useUser();
  const params = useParams();
  const [budgetInfo, setBudgetInfo] = useState(null);

  useEffect(() => {
    if (user && params?.id) {
      getBudgetInfo();
    }
  }, [user, params]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress),
          eq(Budgets.id, Number(params.id))
        )
      )
      .groupBy(Budgets.id);

    setBudgetInfo(result[0] || null);
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold'>My expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem budget={budgetInfo} 
        />:
        <div className ='h-40 w-full bg-slate-200 rounded-lg animate-pulse'>
        </div>}
        <AddExpenses budgetId = {params.id}
        user={user}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen