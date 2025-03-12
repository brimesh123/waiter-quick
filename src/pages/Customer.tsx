
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Menu from "@/components/customer/Menu";
import CallWaiterButton from "@/components/customer/CallWaiterButton";
import Linktree from "@/components/customer/Linktree";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRestaurant } from "@/context/RestaurantContext";

const Customer = () => {
  const { tableId } = useParams();
  const { toast } = useToast();
  const { restaurant, getTableNumber } = useRestaurant();
  const [currentTableId, setCurrentTableId] = useState(tableId || "1");
  
  useEffect(() => {
    // If table ID is provided in URL, use it
    if (tableId) {
      setCurrentTableId(tableId);
      console.log("Table ID set from URL param:", tableId);
    }
  }, [tableId]);

  // Log the categories and menu items when the component mounts
  useEffect(() => {
    const { categories, menuItems } = useRestaurant();
    console.log("Customer view - Categories:", categories);
    console.log("Customer view - Menu Items:", menuItems);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title={restaurant.name} 
        subtitle={`Table ${getTableNumber(currentTableId)}`} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 mt-20">
        <Card className="mb-6 p-4 shadow-sm">
          <CallWaiterButton tableNumber={currentTableId} />
        </Card>
        
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="mt-0">
            <Menu tableNumber={currentTableId} />
          </TabsContent>
          
          <TabsContent value="about" className="mt-0">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
              <p className="mb-4">{restaurant.description}</p>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Find Us Online</h3>
                <Linktree />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Customer;
