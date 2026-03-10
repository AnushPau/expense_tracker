"use client"
import React, { useEffect } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const[budgetList, setBudgetList] = React.useState([]);
  const {user}=useUser();
useEffect(() => {
  user&&getBudgetList();
}, [user])
const getBudgetList = async () => {

  const result = await db.select({
    ...getTableColumns(Budgets),
    totalSpend:sql`sum(${Expenses.amount})`.mapWith(Number),
    totalItems:sql`count(${Expenses.id})`.mapWith(Number)
  }).from(Budgets)
  .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
  .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
  .groupBy(Budgets.id);

  setBudgetList(result);

}

  return (
    <div className = 'mt-7'>
        <div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <CreateBudget/>
      {budgetList.map((budget) => (
        <BudgetItem key={budget.id} budget={budget}/>
      ))}
        </div>
    </div>
  )
}

export default BudgetList
