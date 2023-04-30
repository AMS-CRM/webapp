import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./compenents/ProtectedRoute";

// Get the pages
import Login from "./pages/Login";
import { AuthenticationImage } from "./pages/Login2";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Applications from "./pages/Applications";
import Payroll from "./pages/Payroll";
import RunPayroll from "./pages/RunPayroll";
import PayrollView from "./pages/PayrollView";

import Contacts from "./pages/Contacts";
import Contact from "./pages/Contact";

import WhatsApp from "./pages/WhatsApp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contacts/" element={<Contacts />} />
            <Route path="/contacts/:page" element={<Contacts />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Payrolls" element={<Payroll />} />
            <Route path="/Payrolls/run" element={<RunPayroll />} />
            <Route path="/Payrolls/:payroll" element={<PayrollView />} />
            <Route path="/Payrolls/run/:page" element={<RunPayroll />} />
            <Route path="/Contact/:email" element={<Contact />} />
            <Route path="/whatsapp" element={<WhatsApp />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login2" element={<AuthenticationImage />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
