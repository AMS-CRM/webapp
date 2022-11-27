import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./compenents/ProtectedRoute"

// Get the pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Applications from "./pages/Applications";

import Contacts from "./pages/Contacts";

function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
             <Route path="/" element={<Dashboard />} />
             <Route path="/contacts/" element={<Contacts />} />
             <Route path="/contacts/:page" element={<Contacts />} />

             <Route path="/applications" element={<Applications />} />

          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
       </Router>
    </>
  );
}

export default App;
