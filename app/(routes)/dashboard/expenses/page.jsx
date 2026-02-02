export default function Expenses() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Expenses</h1>
      <p className="text-gray-500 mt-2">
        List of recent expenses.
      </p>

      <div className="mt-6 space-y-3">
        <div className="border p-4 rounded">Starbucks – $6.45</div>
        <div className="border p-4 rounded">Uber – $14.20</div>
        <div className="border p-4 rounded">Groceries – $54.23</div>
        <div className="border p-4 rounded">Rent – $1,200</div>
      </div>
    </div>
  );
}
