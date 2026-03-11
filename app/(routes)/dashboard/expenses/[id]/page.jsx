"use client"
import React, { use, useEffect, useState } from 'react'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { eq, sql, getTableColumns, and, desc } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from './_components/AddExpenses'
import ExpenseListTable from './_components/ExpenseListTable'
import { Pen, PenBox, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from './_components/EditBudget'

function ExpensesScreen() {
  const { user } = useUser();
  const params = useParams();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const route=useRouter();

  useEffect(() => {
    if (user && params?.id) {
      getBudgetInfo();
      getExpensesList();
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
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, Number(params.id)))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    console.log(result);
  };
  /**
   * Delete budget and all expenses related to that budget
   */


  const deleteBudget=async()=>{

    const deleteExpenses = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning();

    if(deleteExpenses){
      
          const result = await db.delete(Budgets)
            .where(eq(Budgets.id,params.id))
            .returning();
  }
  toast("Budget Deleted!");
  route.replace("/dashboard/budgets");
  }
  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>My expenses
        
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo}
          refreshData={()=>getBudgetInfo()} />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        
                          <Button className='flex gap-2' variant="destructive"> 
                                <Trash/>Delete</Button>
                        
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your current budget and expenses data
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
        </div>
            
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className='h-40 w-full bg-slate-200 rounded-lg animate-pulse'></div>
        )}

        <AddExpenses
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>

      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()} />
      </div>
    </div>
  );
}

export default ExpensesScreen