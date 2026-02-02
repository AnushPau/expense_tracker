export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-500 mt-2">
        Overview of your finances.
      </p>

      <div className="mt-6 space-y-4">
        <div className="border p-4 rounded">
          Total Balance: $3,420
        </div>
        <div className="border p-4 rounded">
          Monthly Spending: $812
        </div>
        <div className="border p-4 rounded">
          Remaining Budget: $487
        </div>
      </div>
    </div>
  );
}
