
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { RestaurantProvider } from "@/context/RestaurantContext";
import Index from "@/pages/Index";
import Customer from "@/pages/Customer";
import Admin from "@/pages/Admin";
import Waiter from "@/pages/Waiter";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/:tableId" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/waiter" element={<Waiter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </RestaurantProvider>
  );
}

export default App;
