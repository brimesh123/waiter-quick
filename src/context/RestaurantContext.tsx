
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Restaurant, 
  MenuCategory, 
  MenuItem, 
  TableRequest, 
  demoRestaurant, 
  demoMenuCategories, 
  demoMenuItems, 
  demoTableRequests 
} from '@/utils/demoData';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';

type RestaurantContextType = {
  restaurant: Restaurant;
  updateRestaurantInfo: (info: Partial<Restaurant>) => void;
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  removeMenuItem: (id: string) => void;
  tableRequests: TableRequest[];
  addTableRequest: (tableId: string, reason: string) => void;
  markRequestComplete: (requestId: string) => void;
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
    getStorageItem('menuItems', demoMenuItems)
  );
  
  const [tableRequests, setTableRequests] = useState<TableRequest[]>(
    getStorageItem('tableRequests', demoTableRequests)
  );

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
  }, [tableRequests]);

  // Restaurant info management
  const updateRestaurantInfo = (info: Partial<Restaurant>) => {
    setRestaurant(prev => ({ ...prev, ...info }));
  };

  // Menu management
  const addMenuItem = (item: MenuItem) => {
    setMenuItems(prev => [...prev, item]);
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
    };
    setTableRequests(prev => [...prev, newRequest]);
  };

  const markRequestComplete = (requestId: string) => {
    setTableRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, completed: true, completedAt: new Date() } 
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
    menuItems,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    tableRequests,
    addTableRequest,
    markRequestComplete,
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
