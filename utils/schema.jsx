import { pgTable } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
  id: serial('id'). primaryKey(),
  name: carchar('name').notnull(),
  amount: varchar('amount').notnull(),
  icon: varchar('icon'),
  createdBy: varchar('created_by').notnull(),
})