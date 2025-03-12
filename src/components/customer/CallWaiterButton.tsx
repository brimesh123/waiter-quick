
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRestaurant } from '@/context/RestaurantContext';
import { Bell, CreditCard, FileText, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface CallWaiterButtonProps {
  tableNumber: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  className?: string;
}

const CallWaiterButton: React.FC<CallWaiterButtonProps> = ({
  tableNumber,
  variant = 'default',
  className,
}) => {
  const { requestWaiter } = useRestaurant();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState<'service' | 'bill' | 'order'>('service');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleRequest = () => {
    setStatus('loading');
    
    try {
      console.log(`Calling waiter for table ${tableNumber}, type: ${requestType}, note: ${note}`);
      // Send the request
      requestWaiter(tableNumber, requestType, undefined, note);
      
      setStatus('success');
      
      toast({
        title: "Request sent",
        description: "A waiter will be with you shortly.",
      });
      
      // Reset and close after 2 seconds
      setTimeout(() => {
        setStatus('idle');
        setDialogOpen(false);
        setNote('');
      }, 2000);
    } catch (error) {
      console.error("Error sending request:", error);
      setStatus('idle');
      
      toast({
        title: "Request failed",
        description: "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const requestOptions = [
    {
      value: 'service',
      label: 'Assistance',
      icon: <Bell className="h-4 w-4 mr-2" />,
      description: 'Request a waiter to come to your table',
    },
    {
      value: 'bill',
      label: 'Bill',
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      description: 'Request the bill for your table',
    },
    {
      value: 'order',
      label: 'More Order',
      icon: <FileText className="h-4 w-4 mr-2" />,
      description: 'Request to place additional orders',
    },
  ];

  return (
    <>
      <Button
        variant={variant}
        onClick={() => setDialogOpen(true)}
        className={className}
      >
        <Bell className="h-4 w-4 mr-2" />
        Call Waiter
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
            <DialogDescription>
              Let us know how we can assist you at table {tableNumber}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="request-type" className="text-sm font-medium">
                Request Type
              </label>
              <Select
                value={requestType}
                onValueChange={(value) => setRequestType(value as any)}
              >
                <SelectTrigger id="request-type">
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  {requestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        {option.icon}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {requestOptions.find(o => o.value === requestType)?.description}
              </p>
            </div>

            <div className="grid gap-2">
              <label htmlFor="note" className="text-sm font-medium">
                Additional Note (Optional)
              </label>
              <Textarea
                id="note"
                placeholder="Any specific requirements?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground text-right">
                {note.length}/200
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={status === 'loading'}>
              Cancel
            </Button>
            <Button onClick={handleRequest} disabled={status !== 'idle'}>
              {status === 'idle' && (
                <>
                  <Bell className="mr-2 h-4 w-4" />
                  Send Request
                </>
              )}
              {status === 'loading' && (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Request Sent
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallWaiterButton;
