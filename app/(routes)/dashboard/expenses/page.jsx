"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Expenses, Budgets } from '@/utils/schema'
import { eq, desc } from 'drizzle-orm'
import ExpenseListTable from './[id]/_components/ExpenseListTable'

function ExpensesPage() {
  const { user } = useUser()
  const [expensesList, setExpensesList] = useState([])

  useEffect(() => {
    if (user) {
      getAllExpenses()
    }
  }, [user])

  const getAllExpenses = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .orderBy(desc(Expenses.id))

    setExpensesList(result)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">All Expenses</h2>

      <div className="mt-6">
        <ExpenseListTable expensesList={expensesList} />
      </div>
    </div>
  )
}

export default ExpensesPage