
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { TableRequest, MenuItem } from '@/utils/types';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, CreditCard, FileText, Bell, MessageSquare, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RequestCardProps {
  request: TableRequest;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const { updateRequestStatus, menuItems } = useRestaurant();
  const [isLoading, setIsLoading] = useState(false);

  // Find menu item for the request if it exists
  const menuItem = request.menuItemId 
    ? menuItems.find(item => item.id === request.menuItemId) 
    : undefined;

  // Format the request time
  const timeAgo = formatDistanceToNow(new Date(request.timestamp), { addSuffix: true });

  // Get request type icon
  const getRequestTypeIcon = () => {
    switch (request.type) {
      case 'bill':
        return <CreditCard className="h-5 w-5" />;
      case 'order':
        return <FileText className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Get request status color
  const getStatusStyles = () => {
    switch (request.status) {
      case 'acknowledged':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-amber-50 text-amber-600 border-amber-200';
    }
  };

  // Get request status label
  const getStatusLabel = () => {
    switch (request.status) {
      case 'acknowledged':
        return 'Acknowledged';
      case 'completed':
        return 'Completed';
      default:
        return 'Pending';
    }
  };

  // Handle status update
  const handleUpdateStatus = (newStatus: 'pending' | 'acknowledged' | 'completed') => {
    setIsLoading(true);
    
    // Simulate a network delay (remove in production)
    setTimeout(() => {
      updateRequestStatus(request.id, newStatus);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className={cn(
      "overflow-hidden border transition-all duration-300",
      request.status === 'pending' 
        ? "border-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.1)]" 
        : request.status === 'acknowledged'
          ? "border-blue-200"
          : "border-gray-200 bg-gray-50/50"
    )}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium flex items-center">
                Table {request.tableNumber || request.tableId}
                {request.status === 'pending' && (
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse ml-2"></span>
                )}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <Clock className="inline h-3 w-3 mr-1" />
                {timeAgo}
              </p>
            </div>
            <Badge className={getStatusStyles()}>
              {getStatusLabel()}
            </Badge>
          </div>

          <div className="flex items-start space-x-3 mb-3">
            <div className="bg-secondary p-2 rounded-md">
              {getRequestTypeIcon()}
            </div>
            <div>
              <h4 className="font-medium">
                {request.type === 'service' ? 'Service Request' : 
                 request.type === 'bill' ? 'Bill Request' : 'Additional Order'}
              </h4>
              {menuItem && (
                <p className="text-sm">For: <span className="font-medium">{menuItem.name}</span></p>
              )}
              {request.note && (
                <div className="mt-2 p-2 bg-muted/30 rounded-md text-sm flex items-start space-x-2">
                  <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                  <p>{request.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {request.status !== 'completed' && (
          <div className="flex border-t border-border bg-card">
            {request.status === 'pending' && (
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => handleUpdateStatus('acknowledged')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                Acknowledge
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="flex-1 rounded-none h-12 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => handleUpdateStatus('completed')}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Complete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestCard;
