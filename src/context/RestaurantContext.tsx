
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  MenuItem, 
  MenuCategory, 
  WaiterRequest, 
  Restaurant,
  menuItemsStorage,
  menuCategoriesStorage,
  waiterRequestsStorage,
  restaurantStorage
} from '../utils/localStorage';
import { initializeDemoData } from '../utils/demoData';
import { toast } from 'sonner';

interface RestaurantContextType {
  // Restaurant data
  restaurant: Restaurant | null;
  updateRestaurant: (data: Partial<Restaurant>) => void;
  
  // Menu categories
  categories: MenuCategory[];
  addCategory: (category: Omit<MenuCategory, 'id'>) => void;
  updateCategory: (id: string, data: Partial<Omit<MenuCategory, 'id'>>) => void;
  deleteCategory: (id: string) => void;
  
  // Menu items
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => MenuItem;
  updateMenuItem: (id: string, data: Partial<Omit<MenuItem, 'id'>>) => void;
  deleteMenuItem: (id: string) => void;
  
  // Waiter requests
  waiterRequests: WaiterRequest[];
  activeRequests: WaiterRequest[];
  requestWaiter: (tableNumber: string, type: WaiterRequest['type'], menuItemId?: string, note?: string) => void;
  updateRequestStatus: (id: string, status: WaiterRequest['status']) => void;
  
  // Table-specific data
  getRequestsForTable: (tableNumber: string) => WaiterRequest[];
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Generate a UUID
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [waiterRequests, setWaiterRequests] = useState<WaiterRequest[]>([]);
  const [activeRequests, setActiveRequests] = useState<WaiterRequest[]>([]);

  // Initialize data from localStorage
  useEffect(() => {
    // Initialize demo data if not already initialized
    initializeDemoData();
    
    // Load data from localStorage
    setRestaurant(restaurantStorage.get());
    setCategories(menuCategoriesStorage.getAll());
    setMenuItems(menuItemsStorage.getAll());
    setWaiterRequests(waiterRequestsStorage.getAll());
    setActiveRequests(waiterRequestsStorage.getActive());
  }, []);

  // Restaurant operations
  const updateRestaurant = (data: Partial<Restaurant>) => {
    if (!restaurant) return;
    
    const updatedRestaurant = {
      ...restaurant,
      ...data,
    };
    
    restaurantStorage.save(updatedRestaurant);
    setRestaurant(updatedRestaurant);
  };

  // Category operations
  const addCategory = (category: Omit<MenuCategory, 'id'>) => {
    const newCategory = {
      ...category,
      id: generateId(),
    };
    
    menuCategoriesStorage.save(newCategory);
    setCategories(prev => [...prev, newCategory].sort((a, b) => a.order - b.order));
    toast.success(`Added category: ${category.name}`);
  };

  const updateCategory = (id: string, data: Partial<Omit<MenuCategory, 'id'>>) => {
    const categoryIndex = categories.findIndex(cat => cat.id === id);
    if (categoryIndex === -1) return;
    
    const updatedCategory = {
      ...categories[categoryIndex],
      ...data,
    };
    
    menuCategoriesStorage.save(updatedCategory);
    
    setCategories(prev => {
      const newCategories = [...prev];
      newCategories[categoryIndex] = updatedCategory;
      return newCategories.sort((a, b) => a.order - b.order);
    });
  };

  const deleteCategory = (id: string) => {
    // First check if there are menu items in this category
    const itemsInCategory = menuItems.filter(item => item.category === id);
    
    if (itemsInCategory.length > 0) {
      toast.error("Cannot delete category with menu items. Move or delete the items first.");
      return;
    }
    
    menuCategoriesStorage.delete(id);
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Category deleted");
  };

  // Menu item operations
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = {
      ...item,
      id: generateId(),
    };
    
    menuItemsStorage.save(newItem);
    setMenuItems(prev => [...prev, newItem]);
    toast.success(`Added menu item: ${item.name}`);
    return newItem;
  };

  const updateMenuItem = (id: string, data: Partial<Omit<MenuItem, 'id'>>) => {
    const itemIndex = menuItems.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const updatedItem = {
      ...menuItems[itemIndex],
      ...data,
    };
    
    menuItemsStorage.save(updatedItem);
    
    setMenuItems(prev => {
      const newItems = [...prev];
      newItems[itemIndex] = updatedItem;
      return newItems;
    });
  };

  const deleteMenuItem = (id: string) => {
    menuItemsStorage.delete(id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.success("Menu item deleted");
  };

  // Waiter request operations
  const requestWaiter = (
    tableNumber: string,
    type: WaiterRequest['type'],
    menuItemId?: string,
    note?: string
  ) => {
    const newRequest: WaiterRequest = {
      id: generateId(),
      tableNumber,
      timestamp: Date.now(),
      status: 'pending',
      type,
      menuItemId,
      note,
    };
    
    waiterRequestsStorage.save(newRequest);
    setWaiterRequests(prev => [newRequest, ...prev]);
    setActiveRequests(prev => [newRequest, ...prev]);
    
    // Get item name if available
    let successMessage = `Service requested for Table ${tableNumber}`;
    if (menuItemId) {
      const item = menuItems.find(item => item.id === menuItemId);
      if (item) {
        successMessage = `Requested waiter for ${item.name} at Table ${tableNumber}`;
      }
    }
    
    toast.success(successMessage);
    return newRequest;
  };

  const updateRequestStatus = (id: string, status: WaiterRequest['status']) => {
    const requestIndex = waiterRequests.findIndex(req => req.id === id);
    if (requestIndex === -1) return;
    
    const updatedRequest = {
      ...waiterRequests[requestIndex],
      status,
    };
    
    waiterRequestsStorage.updateStatus(id, status);
    
    setWaiterRequests(prev => {
      const newRequests = [...prev];
      newRequests[requestIndex] = updatedRequest;
      return newRequests;
    });
    
    // Update active requests
    if (status === 'completed') {
      setActiveRequests(prev => prev.filter(req => req.id !== id));
    } else {
      setActiveRequests(prev => {
        const activeIndex = prev.findIndex(req => req.id === id);
        if (activeIndex === -1) return prev;
        
        const newActiveRequests = [...prev];
        newActiveRequests[activeIndex] = updatedRequest;
        return newActiveRequests;
      });
    }
    
    toast.success(`Request ${status === 'completed' ? 'completed' : 'updated'}`);
  };

  // Table-specific operations
  const getRequestsForTable = (tableNumber: string) => {
    return waiterRequests.filter(req => req.tableNumber === tableNumber);
  };

  // Refresh active requests periodically (every 30 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveRequests(waiterRequestsStorage.getActive());
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const value = {
    restaurant,
    updateRestaurant,
    
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    
    waiterRequests,
    activeRequests,
    requestWaiter,
    updateRequestStatus,
    
    getRequestsForTable,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
