import { useEffect, useState } from "react";
import axios from "axios";
import BillCard from "../components/BillCard";

export default function BillsList() {
  const [bills, setBills] = useState([]);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:3000/bills");
      setBills(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load bills");
    }
  };

  const handleUpdate = (id: string) => {
    alert("Update Bill: " + id);
  };

  const handlePay = (id: string) => {
    alert("Pay Bill: " + id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this bill?")) return;

    try {
      await axios.delete(`http://localhost:3000/bills/${id}`);
      fetchBills(); // refresh list
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Bills</h1>

      <div className="flex flex-col gap-4">
        {bills.map((bill: any) => (
          <BillCard
            key={bill._id}
            bill={bill}
            onUpdate={handleUpdate}
            onPay={handlePay}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
