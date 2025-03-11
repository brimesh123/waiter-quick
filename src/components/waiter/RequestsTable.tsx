
import React, { useState, useEffect } from 'react';
import { TableRequest } from '@/utils/types';
import { useRestaurant } from '@/context/RestaurantContext';
import RequestCard from './RequestCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckIcon, HistoryIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

interface RequestsTableProps {
  requests: TableRequest[];
  onMarkComplete?: (requestId: string) => void;
  showActions?: boolean;
}

const RequestsTable: React.FC<RequestsTableProps> = ({ 
  requests, 
  onMarkComplete,
  showActions = true
}) => {
  const [selectedTab, setSelectedTab] = useState('active');

  // Render content based on request state
  const renderRequestContent = (requests: TableRequest[]) => {
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
        {requests.length > 0 && showActions && onMarkComplete && (
          <Button onClick={() => {
            requests.forEach(request => {
              if (onMarkComplete) onMarkComplete(request.id);
            });
          }} variant="outline" size="sm">
            <CheckIcon className="h-4 w-4 mr-2" />
            Mark All Complete
          </Button>
        )}
      </div>

      {renderRequestContent(requests)}
    </div>
  );
};

export default RequestsTable;
