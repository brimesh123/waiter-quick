
// Types for our data models
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
}

export interface WaiterRequest {
  id: string;
  tableNumber: string;
  timestamp: number;
  status: 'pending' | 'acknowledged' | 'completed';
  type: 'service' | 'bill' | 'order';
  menuItemId?: string;
  note?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    font: string;
  };
  socialLinks: {
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    google?: string;
  };
}

// Storage keys
const STORAGE_KEYS = {
  MENU_ITEMS: 'waiterQuick_menuItems',
  MENU_CATEGORIES: 'waiterQuick_menuCategories',
  WAITER_REQUESTS: 'waiterQuick_waiterRequests',
  RESTAURANT: 'waiterQuick_restaurant',
};

// Generic storage function
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },
};

// Menu items
export const menuItemsStorage = {
  getAll: (): MenuItem[] => storage.get<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []),
  getById: (id: string): MenuItem | undefined => {
    const items = storage.get<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
    return items.find(item => item.id === id);
  },
  getByCategory: (categoryId: string): MenuItem[] => {
    const items = storage.get<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
    return items.filter(item => item.category === categoryId);
  },
  save: (item: MenuItem): void => {
    const items = storage.get<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
    const index = items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
      items[index] = item;
    } else {
      items.push(item);
    }
    
    storage.set(STORAGE_KEYS.MENU_ITEMS, items);
  },
  saveAll: (items: MenuItem[]): void => {
    storage.set(STORAGE_KEYS.MENU_ITEMS, items);
  },
  delete: (id: string): void => {
    const items = storage.get<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
    storage.set(
      STORAGE_KEYS.MENU_ITEMS,
      items.filter(item => item.id !== id)
    );
  },
};

// Menu categories
export const menuCategoriesStorage = {
  getAll: (): MenuCategory[] => {
    const categories = storage.get<MenuCategory[]>(STORAGE_KEYS.MENU_CATEGORIES, []);
    return categories.sort((a, b) => a.order - b.order);
  },
  getById: (id: string): MenuCategory | undefined => {
    const categories = storage.get<MenuCategory[]>(STORAGE_KEYS.MENU_CATEGORIES, []);
    return categories.find(category => category.id === id);
  },
  save: (category: MenuCategory): void => {
    const categories = storage.get<MenuCategory[]>(STORAGE_KEYS.MENU_CATEGORIES, []);
    const index = categories.findIndex(c => c.id === category.id);
    
    if (index >= 0) {
      categories[index] = category;
    } else {
      categories.push(category);
    }
    
    storage.set(STORAGE_KEYS.MENU_CATEGORIES, categories);
  },
  saveAll: (categories: MenuCategory[]): void => {
    storage.set(STORAGE_KEYS.MENU_CATEGORIES, categories);
  },
  delete: (id: string): void => {
    const categories = storage.get<MenuCategory[]>(STORAGE_KEYS.MENU_CATEGORIES, []);
    storage.set(
      STORAGE_KEYS.MENU_CATEGORIES,
      categories.filter(category => category.id !== id)
    );
  },
};

// Waiter requests
export const waiterRequestsStorage = {
  getAll: (): WaiterRequest[] => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    return requests.sort((a, b) => b.timestamp - a.timestamp);
  },
  getActive: (): WaiterRequest[] => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    return requests
      .filter(req => req.status !== 'completed')
      .sort((a, b) => b.timestamp - a.timestamp);
  },
  getByTable: (tableNumber: string): WaiterRequest[] => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    return requests
      .filter(req => req.tableNumber === tableNumber)
      .sort((a, b) => b.timestamp - a.timestamp);
  },
  save: (request: WaiterRequest): void => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    const index = requests.findIndex(r => r.id === request.id);
    
    if (index >= 0) {
      requests[index] = request;
    } else {
      requests.push(request);
    }
    
    storage.set(STORAGE_KEYS.WAITER_REQUESTS, requests);
  },
  updateStatus: (id: string, status: WaiterRequest['status']): void => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    const index = requests.findIndex(r => r.id === id);
    
    if (index >= 0) {
      requests[index].status = status;
      storage.set(STORAGE_KEYS.WAITER_REQUESTS, requests);
    }
  },
  delete: (id: string): void => {
    const requests = storage.get<WaiterRequest[]>(STORAGE_KEYS.WAITER_REQUESTS, []);
    storage.set(
      STORAGE_KEYS.WAITER_REQUESTS,
      requests.filter(request => request.id !== id)
    );
  },
};

// Restaurant data
export const restaurantStorage = {
  get: (): Restaurant | null => storage.get<Restaurant | null>(STORAGE_KEYS.RESTAURANT, null),
  save: (restaurant: Restaurant): void => {
    storage.set(STORAGE_KEYS.RESTAURANT, restaurant);
  },
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.MENU_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.MENU_CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.WAITER_REQUESTS);
  localStorage.removeItem(STORAGE_KEYS.RESTAURANT);
};
