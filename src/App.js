import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Get the pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
       </Router>
    </>
  );
}

export default App;
