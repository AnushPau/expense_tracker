"use client"
import React, { useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import CardInfo from './_components/CardInfo';
import BarChartDashBoard from './_components/BarChartDashBoard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable';


export default function Dashboard() {
  const { user } = useUser()

const [budgetList, setBudgetList] = React.useState([]);
const [expensesList, setExpensesList] = React.useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItems: sql`count(${Expenses.id})`.mapWith(Number)
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
      ;

    setBudgetList(result);
    getAllExpenses();
  }
/**
 * used to get all expenses of the user for the bar chart in dashboard
 */
const getAllExpenses=async()=>{
  const result=await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdAt:Expenses.createdAt
  }).from(Budgets)
  .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
  .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
  .orderBy(desc(Expenses.id));
  setExpensesList(result);

  console.log(result);
}

  return (
    <div>
     <div className ='p-8'>
        <h2 className = 'font-bold text-3xl '>Hi, {user?.fullName} ! </h2>
        <p className='text-gray-500' >
          Welcome to your dashboard, Here's what happened with your expenses!
        </p>

        <CardInfo budgetList={budgetList} />
        <div className= 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashBoard
              budgetList={budgetList}
            />
          <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />


          </div>
          <div className ='grid gap-5'>
            <h2 className = 'font-bold text-lg' >Latest Budgets </h2>
            {budgetList.map((budget) => (
                <BudgetItem budget={budget} key={budget.id} />
            ))}
          </div>
          
        </div>
     </div>
    </div>
  );
}
