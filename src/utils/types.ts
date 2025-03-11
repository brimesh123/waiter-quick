
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
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  available: boolean;
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
}

export type WaiterRequest = TableRequest;
