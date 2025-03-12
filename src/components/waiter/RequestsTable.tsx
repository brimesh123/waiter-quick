
import React, { useState, useEffect } from 'react';
import { TableRequest } from '@/utils/types';
import { useRestaurant } from '@/context/RestaurantContext';
import RequestCard from './RequestCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckIcon, HistoryIcon, BellIcon, ClockIcon } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface RequestsTableProps {
  requests: TableRequest[];
  onMarkComplete?: (requestId: string) => void;
  showActions?: boolean;
  viewMode?: 'list' | 'grid';
}

const RequestsTable: React.FC<RequestsTableProps> = ({ 
  requests, 
  onMarkComplete,
  showActions = true,
  viewMode = 'list'
}) => {
  // Group requests by type for filtering
  const serviceRequests = requests.filter(req => req.type === 'service');
  const billRequests = requests.filter(req => req.type === 'bill');
  const orderRequests = requests.filter(req => req.type === 'order');
  
  // Get relative time string
  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const requestTime = new Date(timestamp);
    const diffMs = now.getTime() - requestTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/30 rounded-full p-6 mb-4">
        {requests.length === 0 ? (
          <CheckIcon className="h-8 w-8 text-muted-foreground" />
        ) : (
          <HistoryIcon className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-lg font-medium mb-1">No requests found</h3>
      <p className="text-muted-foreground">
        {showActions 
          ? 'All tables are currently being served' 
          : 'No completed requests yet'}
      </p>
    </div>
  );

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      {requests.map((request, index) => (
        <FadeIn key={request.id} delay={index * 100} duration="fast">
          <RequestCard 
            request={request} 
            onMarkComplete={onMarkComplete}
            showActions={showActions}
          />
        </FadeIn>
      ))}
    </div>
  );

  // Render grid view
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {requests.map((request, index) => (
        <FadeIn key={request.id} delay={index * 50} duration="fast">
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center mb-1">
                    <Badge variant={
                      request.type === 'service' ? 'default' :
                      request.type === 'bill' ? 'secondary' : 'outline'
                    }>
                      {request.type === 'service' ? 'Service' :
                       request.type === 'bill' ? 'Bill Request' : 'Order'}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-2 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {getRelativeTime(request.timestamp)}
                    </span>
                  </div>
                  <h3 className="font-medium">Table {request.tableNumber || request.tableId}</h3>
                </div>
                {showActions && onMarkComplete && (
                  <Button 
                    size="sm" 
                    onClick={() => onMarkComplete(request.id)}
                  >
                    Complete
                  </Button>
                )}
              </div>
              
              <div className="text-sm">
                {request.note && (
                  <p className="bg-muted p-2 rounded mb-2 text-sm">{request.note}</p>
                )}
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>ID: {request.id.substring(0, 8)}...</span>
                  <span>
                    {request.status === 'pending' ? 'Pending' :
                     request.status === 'acknowledged' ? 'Acknowledged' : 'Completed'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      ))}
    </div>
  );

  if (requests.length === 0) {
    return renderEmptyState();
  }

  return (
    <div className="w-full">
      {requests.length > 0 && showActions && onMarkComplete && (
        <div className="flex justify-end mb-4">
          <Button 
            onClick={() => {
              requests.forEach(request => {
                if (onMarkComplete) onMarkComplete(request.id);
              });
            }} 
            variant="outline" 
            size="sm"
          >
            <CheckIcon className="h-4 w-4 mr-2" />
            Mark All Complete
          </Button>
        </div>
      )}

      {/* Filter tabs by request type */}
      {requests.length > 0 && (
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2">{requests.length}</Badge>
            </TabsTrigger>
            {serviceRequests.length > 0 && (
              <TabsTrigger value="service">
                Service
                <Badge variant="outline" className="ml-2">{serviceRequests.length}</Badge>
              </TabsTrigger>
            )}
            {billRequests.length > 0 && (
              <TabsTrigger value="bill">
                Bill
                <Badge variant="outline" className="ml-2">{billRequests.length}</Badge>
              </TabsTrigger>
            )}
            {orderRequests.length > 0 && (
              <TabsTrigger value="order">
                Orders
                <Badge variant="outline" className="ml-2">{orderRequests.length}</Badge>
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="all">
            {viewMode === 'list' ? renderListView() : renderGridView()}
          </TabsContent>
          
          <TabsContent value="service">
            {viewMode === 'list' 
              ? <div className="space-y-4">
                  {serviceRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 100} duration="fast">
                      <RequestCard 
                        request={request} 
                        onMarkComplete={onMarkComplete}
                        showActions={showActions}
                      />
                    </FadeIn>
                  ))}
                </div>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 50} duration="fast">
                      <Card className="overflow-hidden hover:shadow-md transition-shadow p-4">
                        {/* Same card content as in renderGridView but for serviceRequests */}
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Badge>Service</Badge>
                            <h3 className="font-medium mt-1">Table {request.tableNumber || request.tableId}</h3>
                          </div>
                          {showActions && onMarkComplete && (
                            <Button 
                              size="sm" 
                              onClick={() => onMarkComplete(request.id)}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                        
                        {request.note && (
                          <p className="bg-muted p-2 rounded mb-2 text-sm">{request.note}</p>
                        )}
                      </Card>
                    </FadeIn>
                  ))}
                </div>
            }
          </TabsContent>
          
          <TabsContent value="bill">
            {/* Similar structure for bill requests */}
            {viewMode === 'list' 
              ? <div className="space-y-4">
                  {billRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 100} duration="fast">
                      <RequestCard 
                        request={request} 
                        onMarkComplete={onMarkComplete}
                        showActions={showActions}
                      />
                    </FadeIn>
                  ))}
                </div>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {billRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 50} duration="fast">
                      <Card className="overflow-hidden hover:shadow-md transition-shadow p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Badge variant="secondary">Bill Request</Badge>
                            <h3 className="font-medium mt-1">Table {request.tableNumber || request.tableId}</h3>
                          </div>
                          {showActions && onMarkComplete && (
                            <Button 
                              size="sm" 
                              onClick={() => onMarkComplete(request.id)}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </Card>
                    </FadeIn>
                  ))}
                </div>
            }
          </TabsContent>
          
          <TabsContent value="order">
            {/* Similar structure for order requests */}
            {viewMode === 'list' 
              ? <div className="space-y-4">
                  {orderRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 100} duration="fast">
                      <RequestCard 
                        request={request} 
                        onMarkComplete={onMarkComplete}
                        showActions={showActions}
                      />
                    </FadeIn>
                  ))}
                </div>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orderRequests.map((request, index) => (
                    <FadeIn key={request.id} delay={index * 50} duration="fast">
                      <Card className="overflow-hidden hover:shadow-md transition-shadow p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Badge variant="outline">Order</Badge>
                            <h3 className="font-medium mt-1">Table {request.tableNumber || request.tableId}</h3>
                          </div>
                          {showActions && onMarkComplete && (
                            <Button 
                              size="sm" 
                              onClick={() => onMarkComplete(request.id)}
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                        
                        {request.note && (
                          <p className="bg-muted p-2 rounded mb-2 text-sm">{request.note}</p>
                        )}
                      </Card>
                    </FadeIn>
                  ))}
                </div>
            }
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default RequestsTable;
