import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>

      <Accordion type="single" collapsible className="space-y-4">

        <AccordionItem value="item-1" className="border rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="text-lg font-semibold">
            What is the purpose of this budgeting app?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            This app helps users track their spending and manage personal budgets in one place. Users can create budgets for different categories (such as groceries, travel, or entertainment), add expenses to those budgets, and monitor how much of their budget has been used.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="text-lg font-semibold">
            How do I add a new expense?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            To add a new expense, navigate to the Expenses page and click the Add Expense button. Fill in the amount, category, and date, then save the expense.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="text-lg font-semibold">
            Can I edit or update my budgets?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            Yes. Each budget includes an Edit option that allows you to update the budget name, amount, or icon. Once saved, the changes update immediately across the dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="text-lg font-semibold">
            How does the app calculate my remaining budget?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            The app calculates your remaining budget by subtracting the total amount of recorded expenses from the budget limit you set for each category.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg px-4 shadow-sm">
          <AccordionTrigger className="text-lg font-semibold">
            Is my financial information secure?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            Yes. Your budgeting data is securely stored and protected through authentication and modern security practices to keep your information safe.
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}