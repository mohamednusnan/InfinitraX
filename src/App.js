import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Attributes from "./pages/Attributes";
import Product from "./pages/Product";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/attributes" element={<Attributes/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/inventory" element={<Inventory/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </div>
  );
}

export default App;
