
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Restaurant, 
  MenuCategory, 
  MenuItem, 
  TableRequest 
} from '@/utils/types';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';
import { demoRestaurant, demoMenuCategories, demoMenuItems, demoTableRequests } from '@/utils/demoData';

type RestaurantContextType = {
  restaurant: Restaurant;
  updateRestaurantInfo: (info: Partial<Restaurant>) => void;
  menuCategories: MenuCategory[];
  categories: MenuCategory[];
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  removeMenuItem: (id: string) => void;
  tableRequests: TableRequest[];
  waiterRequests: TableRequest[];
  addTableRequest: (tableId: string, reason: string) => void;
  requestWaiter: (tableId: string, type: 'service' | 'bill' | 'order', menuItemId?: string, note?: string) => void;
  markRequestComplete: (requestId: string) => void;
  updateRequestStatus: (requestId: string, status: 'pending' | 'acknowledged' | 'completed') => void;
  getTableNumber: (tableId: string) => number;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage or use demo data as fallback
  const [restaurant, setRestaurant] = useState<Restaurant>(
    getStorageItem('restaurant', demoRestaurant)
  );
  
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(
    getStorageItem('menuCategories', demoMenuCategories)
  );
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    getStorageItem('menuItems', demoMenuItems.map(item => ({
      ...item,
      available: true, // Ensure all menu items are available by default
      image: item.image || getMenuItemDefaultImage(item.category) // Add default images based on category
    })))
  );
  
  const [tableRequests, setTableRequests] = useState<TableRequest[]>(
    getStorageItem('tableRequests', demoTableRequests)
  );

  // Helper function to get default images based on category
  function getMenuItemDefaultImage(categoryId: string): string {
    switch(categoryId) {
      case 'appetizers':
        return 'https://images.unsplash.com/photo-1676037150408-4b6ed7931c8e?q=80&w=1600&auto=format&fit=crop';
      case 'pasta':
        return 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1600&auto=format&fit=crop';
      case 'pizza':
        return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1600&auto=format&fit=crop';
      case 'main-courses':
        return 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop';
      case 'desserts':
        return 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1600&auto=format&fit=crop';
      case 'drinks':
        return 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1600&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1600&auto=format&fit=crop';
    }
  }

  // Log initial data
  useEffect(() => {
    console.log("Restaurant Context Initialized");
    console.log("Restaurant:", restaurant);
    console.log("Menu Categories:", menuCategories);
    console.log("Menu Items:", menuItems);
    console.log("Table Requests:", tableRequests);
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    setStorageItem('restaurant', restaurant);
  }, [restaurant]);

  useEffect(() => {
    setStorageItem('menuCategories', menuCategories);
  }, [menuCategories]);

  useEffect(() => {
    setStorageItem('menuItems', menuItems);
  }, [menuItems]);

  useEffect(() => {
    setStorageItem('tableRequests', tableRequests);
    console.log("All table requests:", tableRequests);
  }, [tableRequests]);

  // Restaurant info management
  const updateRestaurantInfo = (info: Partial<Restaurant>) => {
    setRestaurant(prev => ({ ...prev, ...info }));
  };

  // Menu management
  const addMenuItem = (item: MenuItem) => {
    // Add a default image if none provided
    const itemWithImage = {
      ...item,
      image: item.image || getMenuItemDefaultImage(item.category)
    };
    setMenuItems(prev => [...prev, itemWithImage]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Table request management
  const addTableRequest = (tableId: string, reason: string) => {
    const newRequest: TableRequest = {
      id: Date.now().toString(),
      tableId,
      reason,
      timestamp: new Date(),
      completed: false,
      status: 'pending',
      type: 'service',
      tableNumber: tableId
    };
    console.log("Adding table request:", newRequest);
    setTableRequests(prev => [...prev, newRequest]);
  };

  const requestWaiter = (tableId: string, type: 'service' | 'bill' | 'order', menuItemId?: string, note?: string) => {
    // Ensure tableId is a string
    const tableIdStr = String(tableId);
    
    const newRequest: TableRequest = {
      id: Date.now().toString(),
      tableId: tableIdStr,
      reason: type,
      menuItemId,
      note,
      timestamp: new Date(),
      completed: false,
      status: 'pending',
      type,
      tableNumber: tableIdStr
    };
    console.log("Requesting waiter:", newRequest);
    setTableRequests(prev => [...prev, newRequest]);
  };

  const markRequestComplete = (requestId: string) => {
    console.log("Marking request complete:", requestId);
    setTableRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, completed: true, completedAt: new Date(), status: 'completed' } 
          : request
      )
    );
  };

  const updateRequestStatus = (requestId: string, status: 'pending' | 'acknowledged' | 'completed') => {
    console.log("Updating request status:", requestId, status);
    setTableRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { 
              ...request, 
              status,
              completed: status === 'completed',
              completedAt: status === 'completed' ? new Date() : request.completedAt
            } 
          : request
      )
    );
  };

  // Helper functions
  const getTableNumber = (tableId: string): number => {
    return parseInt(tableId, 10);
  };

  // Context value
  const value = {
    restaurant,
    updateRestaurantInfo,
    menuCategories,
    categories: menuCategories, // Alias for consistency with component expectations
    menuItems,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    tableRequests,
    waiterRequests: tableRequests, // Alias for consistency with component expectations
    addTableRequest,
    requestWaiter,
    markRequestComplete,
    updateRequestStatus,
    getTableNumber,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Custom hook to use the context
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
