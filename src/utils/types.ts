
// Define all types used in the application

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  socialLinks: {
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    google?: string;
  };
  tables?: number;
  active?: boolean;
  createdAt?: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  available: boolean;
  restaurantId: string;
}

export interface TableRequest {
  id: string;
  tableId: string;
  reason: string;
  menuItemId?: string;
  note?: string;
  timestamp: Date;
  completed: boolean;
  completedAt?: Date;
  status?: 'pending' | 'acknowledged' | 'completed';
  type?: 'service' | 'bill' | 'order';
  tableNumber?: string;
  restaurantId: string;
}

export type WaiterRequest = TableRequest;

export interface Waiter {
  id: string;
  name: string;
  email?: string;
  restaurantId: string;
  active?: boolean;
}

