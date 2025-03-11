
export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  items?: MenuItem[];
};

export type TableRequest = {
  id: string;
  tableId: string;
  reason: string;
  timestamp: Date;
  completed: boolean;
  completedAt?: Date;
};

export type SocialLink = {
  platform: string;
  url: string;
  label: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  socialLinks: SocialLink[];
};

// Demo restaurant data
export const demoRestaurant: Restaurant = {
  id: "1",
  name: "Bella Cucina",
  description: "Authentic Italian cuisine prepared with the freshest ingredients. Our chefs bring the flavors of Italy to your table with traditional recipes and modern creativity.",
  logoUrl: "/placeholder.svg", // Update with a real logo later
  socialLinks: [
    { platform: "instagram", url: "https://instagram.com", label: "Follow us on Instagram" },
    { platform: "facebook", url: "https://facebook.com", label: "Like us on Facebook" },
    { platform: "google", url: "https://google.com/maps", label: "Google Reviews" },
    { platform: "website", url: "https://example.com", label: "Visit our website" },
  ]
};

// Demo menu categories and items
export const demoMenuCategories: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Start your meal with these delicious appetizers",
    items: []
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Handmade pasta dishes with authentic Italian sauces",
    items: []
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Wood-fired pizzas with a variety of toppings",
    items: []
  },
  {
    id: "main-courses",
    name: "Main Courses",
    description: "Hearty main dishes featuring the finest ingredients",
    items: []
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats to end your meal",
    items: []
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Beverages and cocktails",
    items: []
  }
];

// Demo menu items
export const demoMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Bruschetta",
    price: 8.99,
    description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
    category: "appetizers",
  },
  {
    id: "2",
    name: "Caprese Salad",
    price: 10.99,
    description: "Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil",
    category: "appetizers",
  },
  {
    id: "3",
    name: "Spaghetti Carbonara",
    price: 15.99,
    description: "Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper",
    category: "pasta",
  },
  {
    id: "4",
    name: "Fettuccine Alfredo",
    price: 14.99,
    description: "Fettuccine tossed with butter and Parmesan cheese",
    category: "pasta",
  },
  {
    id: "5",
    name: "Margherita Pizza",
    price: 12.99,
    description: "Tomato sauce, mozzarella, and basil",
    category: "pizza",
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    price: 13.99,
    description: "Tomato sauce, mozzarella, and pepperoni",
    category: "pizza",
  },
  {
    id: "7",
    name: "Chicken Parmesan",
    price: 17.99,
    description: "Breaded chicken breast topped with tomato sauce and mozzarella",
    category: "main-courses",
  },
  {
    id: "8",
    name: "Tiramisu",
    price: 8.99,
    description: "Coffee-flavored Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese",
    category: "desserts",
  },
  {
    id: "9",
    name: "House Red Wine",
    price: 7.99,
    description: "Glass of our house red wine",
    category: "drinks",
  },
  {
    id: "10",
    name: "Espresso",
    price: 3.99,
    description: "Single shot of espresso",
    category: "drinks",
  }
];

// Demo table requests
export const demoTableRequests: TableRequest[] = [
  {
    id: "1",
    tableId: "1",
    reason: "Need assistance with menu",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    completed: false,
  },
  {
    id: "2",
    tableId: "3",
    reason: "Ready to order",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    completed: false,
  },
  {
    id: "3",
    tableId: "5",
    reason: "Request the check",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    completed: false,
  },
  {
    id: "4",
    tableId: "2",
    reason: "Additional water please",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    completed: true,
    completedAt: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: "5",
    tableId: "4",
    reason: "Need condiments",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    completed: true,
    completedAt: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
  },
];

// Demo tables
export const demoTables = Array.from({ length: 12 }, (_, i) => ({
  id: (i + 1).toString(),
  number: i + 1,
  section: i < 6 ? "Main Dining" : "Patio",
  qrCode: `/table-${i + 1}-qr.png`, // Placeholder, would be real QR code images in production
}));
