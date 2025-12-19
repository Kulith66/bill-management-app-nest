import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Bill interface
interface Bill {
  _id: string;
  invoice: string;
  date: string;
  description?: string;
  totalAmount?: number;
}

const AllBillsCom = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const navigate = useNavigate();

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

  // Delete bill
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;

    try {
      await axios.delete(`http://localhost:3000/bills/${id}`);
      alert("Bill deleted successfully");
      fetchBills(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete bill");
    }
  };

  // Update bill
  const handleUpdate = (id: string) => {
    navigate(`/bills/update/${id}`);
  };

  // Pay bill
  const handlePay = (id: string) => {
    alert(`Pay bill with ID: ${id}`);
    // Implement your payment logic here
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Bills</h1>
        <button
          onClick={() => navigate("/bills/create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create New Bill
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="border p-4 rounded shadow flex flex-col justify-between"
          >
            <div className="mb-4">
              <p>
                <strong>Invoice:</strong> {bill.invoice}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(bill.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {bill.description || "N/A"}
              </p>
              <p>
                <strong>Total:</strong> ${bill.totalAmount || 0}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUpdate(bill._id)}
                className="text-blue-600 hover:text-blue-800"
                title="Update"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>

              <button
                onClick={() => handlePay(bill._id)}
                className="text-green-600 hover:text-green-800"
                title="Pay"
              >
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </button>

              <button
                onClick={() => handleDelete(bill._id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBillsCom;
