"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { toast } from "sonner";

function AddExpenses({
  budgetId,
  user,
  refreshData,
  remaining,
  categoryName,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    try {
      const numericAmount = Number(amount);
      const previousRemaining = Number(remaining);
      const newRemaining = previousRemaining - numericAmount;

      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: amount,
          budgetId: Number(budgetId),
          createdAt: new Date().toISOString(),
        })
        .returning({ insertedId: Expenses.id });

      console.log(result);

      if (result) {
        if (
          previousRemaining >= 0 &&
          newRemaining < 0 &&
          user?.primaryEmailAddress?.emailAddress
        ) {
          try {
            await fetch("/api/send-budget-alert", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.primaryEmailAddress.emailAddress,
                category: categoryName,
                remaining: newRemaining,
                amount: numericAmount,
              }),
            });
          } catch (emailError) {
            console.log("Email send failed:", emailError);
          }
        }

        refreshData();
        toast("New Expense Added!");
        setName("");
        setAmount("");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to add expense");
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>

      <div className="mt-4">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          type="text"
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          type="number"
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Button
        disabled={!name || !amount || Number(amount) <= 0}
        onClick={addNewExpense}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpenses;