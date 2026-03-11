import React from 'react'
import { Trash } from 'lucide-react'
import { Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList, refreshData }) {

    const deleteExpense = async (expenses) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, expenses.id))
        .returning();
        if(result){
            toast("Expense deleted successfully!")
            refreshData();
        }
    }
    return (
        <div className='mt-3'>
            <div className='grid grid-cols-4 bg-slate-200 p-2 font-bold text-slate-700'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>

            {expensesList?.map((expenses, index) => (
                <div key={index} className=' grid grid-cols-4 border-b p-2 items-center bg-slate-50'>
                    <h2>{expenses.name}</h2>
                    <h2>${expenses.amount}</h2>
                    <h2>
                        {new Date(expenses.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                    </h2>
                    <div>
                        <Trash className="cursor-pointer text-red-500" size={20}
                        onClick={() =>deleteExpense(expenses)
                            
                        } />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExpenseListTable