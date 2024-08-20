import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Products />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
