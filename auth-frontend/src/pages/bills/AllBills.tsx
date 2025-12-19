import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Bill {
  _id: string;
  invoice: string;
  date: string;
  description?: string;
  totalAmount?: number;
}

export default function AllBillsTable() {
  const navigate = useNavigate();
  const [bills, setBills] = useState<Bill[]>([]);

  // Fetch all bills
  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bills");
      setBills(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch bills");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Delete a bill
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await axios.delete(`http://localhost:3000/bills/${id}`);
      alert("Bill deleted successfully");
      fetchBills();
    } catch (err) {
      console.error(err);
      alert("Failed to delete bill");
    }
  };

  // Navigate to payment history
  const handlePaymentHistory = (billId: string) => {
  navigate(`/bills/${billId}/payments`);
};

  // Handle Pay button
  const handlePay = async (bill: Bill) => {
    const input = prompt(
      `Enter payment amount for ${bill.invoice} (Remaining: $${bill.totalAmount || 0}):`
    );
    if (!input) return;
    const amount = Number(input);
    if (isNaN(amount) || amount <= 0) return alert("Invalid amount");
    if (amount > (bill.totalAmount || 0))
      return alert("Amount exceeds remaining bill total");

    try {
      await axios.post("http://localhost:3000/payments", {
        billId: bill._id,
        amount,
      });
      alert("Payment successful");
      fetchBills(); // refresh the bills to update remaining totalAmount
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">All Bills</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Invoice</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.length > 0 ? (
              bills.map((bill) => (
                <tr key={bill._id}>
                  <td className="border px-4 py-2">{bill.invoice}</td>
                  <td className="border px-4 py-2">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{bill.description || "N/A"}</td>
                  <td className="border px-4 py-2">${bill.totalAmount || 0}</td>
                  <td className="border px-4 py-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => alert(`Update bill ${bill._id}`)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handlePay(bill)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Pay
                    </button>
                  <button
  onClick={() => handlePaymentHistory(bill._id)}
  className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
>
  Payment History
</button>

                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
