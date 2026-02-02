export default function Budgets() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Budgets</h1>
      <p className="text-gray-500 mt-2">
        Manage spending limits by category.
      </p>

      <div className="mt-6 space-y-3">
        <div className="border p-4 rounded">Food: $280 / $400</div>
        <div className="border p-4 rounded">Transport: $95 / $150</div>
        <div className="border p-4 rounded">Entertainment: $120 / $200</div>
      </div>
    </div>
  );
}
