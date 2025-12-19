import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateBill from "./pages/bills/CreateBill";
import AllBills from "./pages/bills/allBills";
import PaymentHistory from "./pages/PaymentHistory";

// Bill pages

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Private (Protected) Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bills/createBill"
          element={
              <CreateBill />
          }
        />
        <Route path="/bills" element={<AllBills/>}/>
          <Route path="/bills/:billId/payments" element={<PaymentHistory />} />

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
