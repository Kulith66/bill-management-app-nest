import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllBillsTable from "./allBills";

interface Bill {
  _id: string;
  invoice: string;
  date: string;
  description?: string;
  totalAmount?: number;
}

export default function CreateBill() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    invoice: "",
    date: "",
    description: "",
    totalAmount: "",
  });

  const [bills, setBills] = useState<Bill[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.invoice || !form.date) {
      alert("Invoice and Date are required");
      return;
    }

    try {
      await axios.post("http://localhost:3000/bills", {
        invoice: form.invoice,
        date: form.date,
        description: form.description,
        totalAmount: Number(form.totalAmount),
      });

      alert("Bill created successfully!");
      setForm({ invoice: "", date: "", description: "", totalAmount: "" });
      fetchBills(); // refresh table
    } catch (error) {
      console.error("CREATE BILL ERROR:", error);
      alert("Failed to create bill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await axios.delete(`http://localhost:3000/bills/${id}`);
      alert("Bill deleted successfully!");
      fetchBills();
    } catch (err) {
      console.error(err);
      alert("Failed to delete bill");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6">
      {/* Create Bill Form */}
      <div className="max-w-lg bg-white shadow rounded p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Create Bill</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="invoice"
            placeholder="Invoice Number"
            value={form.invoice}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700 flex-1"
            >
              Create Bill
            </button>

            <button
              type="button"
              onClick={() => navigate("/bills")}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex-1"
            >
              View All Bills
            </button>
          </div>
        </form>
      </div>

     
      <AllBillsTable/>
    </div>
  );
}
