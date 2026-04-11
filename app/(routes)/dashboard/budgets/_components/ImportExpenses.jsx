"use client";

import React, { useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ImportExpenses({ refreshData, user }) {
  const [loading, setLoading] = useState(false);

  const normalizeCategory = (category) => {
    if (!category) return "Other";
    return category.trim();
  };

  const parseCsv = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    return lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row = {};

      headers.forEach((header, index) => {
        row[header] = values[index] ?? "";
      });

      return {
        date: row.date || new Date().toISOString(),
        name: row.description || row.name || "Imported Expense",
        amount: row.amount,
        category: row.category || "Other",
      };
    });
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const text = await file.text();
      const rows = parseCsv(text);

      if (!rows.length) {
        toast("No valid rows found.");
        return;
      }

      const userEmail = user?.primaryEmailAddress?.emailAddress;

      if (!userEmail) {
        toast("User not found.");
        return;
      }

      const existingBudgets = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, userEmail));

      const budgetMap = {};
      existingBudgets.forEach((budget) => {
        budgetMap[budget.name.toLowerCase()] = budget;
      });

      let importedCount = 0;

      for (const row of rows) {
        const numericAmount = Number(row.amount);
        if (!row.name || Number.isNaN(numericAmount) || numericAmount <= 0) {
          continue;
        }

        const categoryName = normalizeCategory(row.category);
        let budget = budgetMap[categoryName.toLowerCase()];

        if (!budget) {
          const insertedBudget = await db
            .insert(Budgets)
            .values({
              name: categoryName,
              amount: "0",
              icon: "📦",
              createdBy: userEmail,
            })
            .returning();

          budget = insertedBudget[0];
          budgetMap[categoryName.toLowerCase()] = budget;
        }

        await db.insert(Expenses).values({
          name: row.name,
          amount: String(numericAmount),
          budgetId: budget.id,
          createdAt: row.date,
        });

        importedCount++;
      }

      refreshData?.();
      toast(`${importedCount} expenses imported!`);
      event.target.value = "";
    } catch (error) {
      console.log(error);
      toast("Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <label className='bg-slate-100 p-10 rounded-md h-35 w-full flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:shadow-md'>
    <h2 className="text-3xl font-bold mb-2">
      {loading ? "..." : "↑"}
    </h2>

    <p className="text-sm font-medium">
      {loading ? "Importing..." : "Import Expenses"}
    </p>

    <input
      type="file"
      accept=".csv"
      onChange={handleFileChange}
      className="hidden"
      disabled={loading}
    />
  </label>
);
}

export default ImportExpenses;