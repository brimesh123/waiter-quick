
import {
  MenuItem,
  MenuCategory,
  Restaurant,
  menuItemsStorage,
  menuCategoriesStorage,
  restaurantStorage,
} from './localStorage';

// Generate a UUID
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Demo restaurant data
const demoRestaurant: Restaurant = {
  id: generateId(),
  name: 'Bistro Nouveau',
  logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200&auto=format&fit=crop',
  theme: {
    primaryColor: '#1E88E5',
    secondaryColor: '#E0E0E0',
    font: 'Inter',
  },
  socialLinks: {
    website: 'https://example.com',
    instagram: 'https://instagram.com/bistronouveau',
    facebook: 'https://facebook.com/bistronouveau',
    google: 'https://g.page/bistronouveau',
  },
};

// Demo menu categories
const demoCategories: MenuCategory[] = [
  { id: generateId(), name: 'Starters', order: 1 },
  { id: generateId(), name: 'Main Courses', order: 2 },
  { id: generateId(), name: 'Sides', order: 3 },
  { id: generateId(), name: 'Desserts', order: 4 },
  { id: generateId(), name: 'Drinks', order: 5 },
];

// Helper function to get category ID by name
const getCategoryIdByName = (name: string): string => {
  const category = demoCategories.find(cat => cat.name === name);
  return category ? category.id : demoCategories[0].id;
};

// Demo menu items
const generateDemoMenuItems = (): MenuItem[] => {
  return [
    {
      id: generateId(),
      name: 'Goat Cheese Salad',
      description: 'Mixed greens with warm goat cheese, walnuts, and balsamic vinaigrette',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Starters'),
      available: true,
    },
    {
      id: generateId(),
      name: 'French Onion Soup',
      description: 'Traditional onion soup with melted Gruyère cheese',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Starters'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Beef Tenderloin',
      description: 'Grilled beef tenderloin with red wine reduction and seasonal vegetables',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Main Courses'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Roasted Salmon',
      description: 'Oven-roasted salmon with lemon butter sauce and asparagus',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Main Courses'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Mushroom Risotto',
      description: 'Creamy Arborio rice with wild mushrooms and Parmesan',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Main Courses'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Truffle Fries',
      description: 'Crispy fries tossed with truffle oil and Parmesan',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Sides'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla ice cream',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1579306194872-64d3b7c47e63?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Desserts'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Crème Brûlée',
      description: 'Classic French custard with caramelized sugar top',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Desserts'),
      available: true,
    },
    {
      id: generateId(),
      name: 'House Red Wine',
      description: 'Glass of our selected cabernet sauvignon',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Drinks'),
      available: true,
    },
    {
      id: generateId(),
      name: 'Sparkling Water',
      description: 'Bottle of premium sparkling mineral water',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1603394151851-6fa1fb569a8d?q=80&w=300&auto=format&fit=crop',
      category: getCategoryIdByName('Drinks'),
      available: true,
    },
  ];
};

// Initialize demo data in local storage
export const initializeDemoData = (): void => {
  // Check if data already exists
  const existingRestaurant = restaurantStorage.get();
  
  if (!existingRestaurant) {
    // Save restaurant data
    restaurantStorage.save(demoRestaurant);
    
    // Save categories
    menuCategoriesStorage.saveAll(demoCategories);
    
    // Save menu items
    menuItemsStorage.saveAll(generateDemoMenuItems());
    
    console.log('Demo data initialized successfully!');
  } else {
    console.log('Data already exists in localStorage. Skipping initialization.');
  }
};
