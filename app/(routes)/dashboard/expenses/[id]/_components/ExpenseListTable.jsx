import React from 'react'
import { Trash } from 'lucide-react'
import { Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function ExpenseListTable({ expensesList = [], refreshData }) {

    const deleteExpense = async (expenses) => {
        const result = await db.delete(Expenses).where(eq(Expenses.id, expenses.id))
        .returning();

        if (result) {
            toast("Expense deleted successfully!")
            refreshData?.();
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg'>Latest Expenses</h2>

            <div className='grid grid-cols-4 bg-slate-200 p-2 font-bold text-slate-700'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>

            {expensesList
                .filter((expense) => expense?.id && expense?.name && expense?.amount && expense?.createdAt)
                .map((expense) => (
                    <div key={expense.id} className='grid grid-cols-4 border-b p-2 items-center bg-slate-50'>
                        <h2>{expense.name}</h2>
                        <h2>${expense.amount}</h2>
                        <h2>
                            {new Date(expense.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                            })}
                        </h2>
                        <div>
                            <Trash
                                className="cursor-pointer text-red-500"
                                size={20}
                                onClick={() => deleteExpense(expense)}
                            />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ExpenseListTable