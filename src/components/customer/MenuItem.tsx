
import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '@/utils/types';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface MenuItemProps {
  item: MenuItemType;
  tableNumber: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, tableNumber }) => {
  const { requestWaiter } = useRestaurant();
  const { toast } = useToast();
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleRequestWaiter = () => {
    setRequestStatus('loading');
    
    try {
      // Send the request without artificial delay
      requestWaiter(tableNumber, 'service', item.id, `Question about ${item.name}`);
      console.log(`Waiter requested for table ${tableNumber}, item ${item.id}`);
      
      setRequestStatus('success');
      
      toast({
        title: "Waiter requested",
        description: `A waiter will come to assist you with ${item.name}`,
      });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setRequestStatus('idle');
      }, 3000);
    } catch (error) {
      console.error("Error requesting waiter:", error);
      setRequestStatus('idle');
      
      toast({
        title: "Request failed",
        description: "There was a problem requesting a waiter. Please try again.",
        variant: "destructive",
      });
    }
  };

  const imageLoaded = item.image !== undefined;

  return (
    <Card className="overflow-hidden border border-border">
      <div className="flex flex-col md:flex-row">
        {imageLoaded && (
          <div className="w-full md:w-1/3 h-40 md:h-auto">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        
        <CardContent className={cn(
          "flex-1 flex flex-col p-6",
          !imageLoaded && "md:w-full"
        )}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="font-medium text-lg">${item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{item.description}</p>
          
          <div className="mt-auto">
            <Button
              variant="outline"
              className={cn(
                "transition-all duration-300",
                requestStatus === 'success' && "bg-green-50 text-green-600 border-green-200"
              )}
              onClick={handleRequestWaiter}
              disabled={requestStatus !== 'idle'}
            >
              {requestStatus === 'idle' && (
                <>
                  <Bell className="mr-2 h-4 w-4" />
                  Request waiter
                </>
              )}
              {requestStatus === 'loading' && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              )}
              {requestStatus === 'success' && (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Waiter notified
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MenuItem;
