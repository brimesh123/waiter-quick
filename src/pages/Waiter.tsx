
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
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlarmClock, 
  Users,
  LayoutDashboard
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const Waiter = () => {
  const { toast } = useToast();
  const { restaurant, tableRequests, markRequestComplete } = useRestaurant();
  const [activeRequests, setActiveRequests] = useState<TableRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<TableRequest[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  
  // Calculate metrics
  const calculateAverageResponseTime = () => {
    const completedWithTimes = completedRequests.filter(req => req.completedAt);
    if (completedWithTimes.length === 0) return "N/A";
    
    const totalMinutes = completedWithTimes.reduce((acc, req) => {
      const startTime = new Date(req.timestamp).getTime();
      const endTime = new Date(req.completedAt as Date).getTime();
      return acc + (endTime - startTime) / (1000 * 60); // Convert to minutes
    }, 0);
    
    const avgMinutes = (totalMinutes / completedWithTimes.length).toFixed(1);
    return `${avgMinutes}m`;
  };

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

  // Group requests by table
  const requestsByTable = activeRequests.reduce((acc, request) => {
    const tableId = request.tableId;
    if (!acc[tableId]) {
      acc[tableId] = [];
    }
    acc[tableId].push(request);
    return acc;
  }, {} as Record<string, TableRequest[]>);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title={`${restaurant.name} - Staff Portal`} 
        subtitle="Waiter Dashboard" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 mt-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutDashboard className="mr-2 h-8 w-8 text-primary" />
            Waiter Dashboard
          </h1>
          <p className="text-muted-foreground">Manage service requests and track performance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <FadeIn delay={100}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-blue-500" />
                  Active Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700">{activeRequests.length}</p>
                <p className="text-sm text-muted-foreground">Pending service calls</p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={200}>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-700">{completedRequests.length}</p>
                <p className="text-sm text-muted-foreground">Resolved requests today</p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={300}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-purple-500" />
                  Avg. Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-700">{calculateAverageResponseTime()}</p>
                <p className="text-sm text-muted-foreground">Average service time</p>
              </CardContent>
            </Card>
          </FadeIn>
          
          <FadeIn delay={400}>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <AlarmClock className="mr-2 h-5 w-5 text-amber-500" />
                  Tables Served
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-700">{Object.keys(requestsByTable).length}</p>
                <p className="text-sm text-muted-foreground">Tables with active requests</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Service Requests</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-secondary' : ''}
            >
              Grid View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-secondary' : ''}
            >
              List View
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Active Requests
              {activeRequests.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                  {activeRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="tables" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              By Table
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <RequestsTable 
              requests={activeRequests} 
              onMarkComplete={handleMarkComplete} 
              showActions={true}
              viewMode={viewMode}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <RequestsTable 
              requests={completedRequests} 
              showActions={false}
              viewMode={viewMode}
            />
          </TabsContent>
          
          <TabsContent value="tables">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(requestsByTable).map(([tableId, requests]) => (
                <Card key={tableId} className="overflow-hidden">
                  <CardHeader className="bg-muted pb-2">
                    <CardTitle className="text-lg">Table {tableId}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {requests.map((request) => (
                        <div key={request.id} className="p-4 hover:bg-muted/50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="font-medium">
                                {request.type === 'service' ? 'Service Request' : 
                                 request.type === 'bill' ? 'Bill Request' : 'Order'}
                              </span>
                              <p className="text-sm text-muted-foreground">
                                {new Date(request.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleMarkComplete(request.id)}
                            >
                              Complete
                            </Button>
                          </div>
                          {request.note && (
                            <p className="text-sm bg-muted p-2 rounded">{request.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {Object.keys(requestsByTable).length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted/30 rounded-full p-6 mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No active table requests</h3>
                  <p className="text-muted-foreground">
                    All tables are currently being served
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Waiter;
