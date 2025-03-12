
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestsTable from "@/components/waiter/RequestsTable";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { TableRequest } from "@/utils/types";

const Waiter = () => {
  const { toast } = useToast();
  const { restaurant, tableRequests, markRequestComplete } = useRestaurant();
  const [activeRequests, setActiveRequests] = useState<TableRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<TableRequest[]>([]);

  useEffect(() => {
    // Filter requests into active and completed
    console.log("Waiter page - All table requests:", tableRequests);
    setActiveRequests(tableRequests.filter(req => !req.completed));
    setCompletedRequests(tableRequests.filter(req => req.completed));
  }, [tableRequests]);

  const handleMarkComplete = (requestId: string) => {
    console.log("Marking request complete:", requestId);
    markRequestComplete(requestId);
    toast({
      title: "Request completed",
      description: "The request has been marked as completed.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title={`${restaurant.name} - Staff Portal`} 
        subtitle="Waiter Dashboard" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{activeRequests.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{completedRequests.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Avg. Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">3.2m</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Today's Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{tableRequests.length}</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Requests</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <RequestsTable 
              requests={activeRequests} 
              onMarkComplete={handleMarkComplete} 
              showActions={true}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <RequestsTable 
              requests={completedRequests} 
              showActions={false}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Waiter;
