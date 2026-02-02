export default function FAQs() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">FAQs</h1>
      <p className="text-gray-500 mt-2">
        Common questions about the app.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <strong>How do I add an expense?</strong>
          <p className="text-gray-600">Go to the Expenses page.</p>
        </div>

        <div>
          <strong>What is a budget?</strong>
          <p className="text-gray-600">
            A spending limit for a category.
          </p>
        </div>

        <div>
          <strong>Is this connected to a bank?</strong>
          <p className="text-gray-600">
            Maybe in the future.
          </p>
        </div>
      </div>
    </div>
  );
}
