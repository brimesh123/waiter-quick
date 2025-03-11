
import React, { useState, useEffect } from 'react';
import { WaiterRequest } from '@/utils/localStorage';
import { useRestaurant } from '@/context/RestaurantContext';
import RequestCard from './RequestCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckIcon, HistoryIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const RequestsTable: React.FC = () => {
  const { waiterRequests, updateRequestStatus } = useRestaurant();
  const [selectedTab, setSelectedTab] = useState('active');
  const [pendingRequests, setPendingRequests] = useState<WaiterRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<WaiterRequest[]>([]);

  // Group and sort requests
  useEffect(() => {
    const pending = waiterRequests.filter(req => req.status !== 'completed')
      .sort((a, b) => b.timestamp - a.timestamp);
    
    const completed = waiterRequests.filter(req => req.status === 'completed')
      .sort((a, b) => b.timestamp - a.timestamp);
    
    setPendingRequests(pending);
    setCompletedRequests(completed);
  }, [waiterRequests]);

  // Mark all requests as complete
  const handleMarkAllComplete = () => {
    pendingRequests.forEach(request => {
      updateRequestStatus(request.id, 'completed');
    });
  };

  // Render content based on request state
  const renderRequestContent = (requests: WaiterRequest[]) => {
    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/30 rounded-full p-6 mb-4">
            {selectedTab === 'active' ? (
              <CheckIcon className="h-8 w-8 text-muted-foreground" />
            ) : (
              <HistoryIcon className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-medium mb-1">
            {selectedTab === 'active' ? 'No active requests' : 'No completed requests'}
          </h3>
          <p className="text-muted-foreground">
            {selectedTab === 'active'
              ? 'All tables are currently being served'
              : 'Completed requests will appear here'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {requests.map((request, index) => (
          <FadeIn key={request.id} delay={index * 100} duration="fast">
            <RequestCard request={request} />
          </FadeIn>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Service Requests</h2>
        {pendingRequests.length > 0 && (
          <Button onClick={handleMarkAllComplete} variant="outline" size="sm">
            <CheckIcon className="h-4 w-4 mr-2" />
            Mark All Complete
          </Button>
        )}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active" className="relative">
            Active
            {pendingRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            {completedRequests.length > 0 && (
              <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2 py-0.5">
                {completedRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 animate-fade-in">
          {renderRequestContent(pendingRequests)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 animate-fade-in">
          {renderRequestContent(completedRequests)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestsTable;
