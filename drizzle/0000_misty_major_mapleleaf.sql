CREATE TABLE "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" varchar NOT NULL,
	"icon" varchar,
	"created_by" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric DEFAULT 0 NOT NULL,
	"budgetID" integer,
	"created_At" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"card_name" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"card_type" varchar NOT NULL,
	"last4" varchar NOT NULL,
	"created_at" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_budgetID_budgets_id_fk" FOREIGN KEY ("budgetID") REFERENCES "public"."budgets"("id") ON DELETE no action ON UPDATE no action;