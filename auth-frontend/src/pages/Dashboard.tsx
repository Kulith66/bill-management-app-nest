import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
    const billLogs = () => {
    localStorage.removeItem("token");

    navigate("/bills/createBill");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard 🎉</h1>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
       <button
        onClick={billLogs}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        bilLogs
      </button>
    </div>
  );
}
