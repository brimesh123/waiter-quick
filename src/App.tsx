
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { RestaurantProvider } from "@/context/RestaurantContext";
import Index from "@/pages/Index";
import Customer from "@/pages/Customer";
import Admin from "@/pages/Admin";
import Waiter from "@/pages/Waiter";
import Restaurants from "@/pages/Restaurants";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  console.log("App rendering with routes");
  
  return (
    <RestaurantProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/:tableId" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/waiter" element={<Waiter />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </RestaurantProvider>
  );
}

export default App;
