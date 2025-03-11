
import { Restaurant, MenuCategory, MenuItem, TableRequest } from './types';

// Demo restaurant data
export const demoRestaurant: Restaurant = {
  id: '1',
  name: 'The Delicious Corner',
  description: 'A modern restaurant offering a delightful blend of international cuisines with a focus on fresh, locally-sourced ingredients.',
  logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
  socialLinks: {
    website: 'https://example.com',
    instagram: 'https://instagram.com/deliciouscorner',
    facebook: 'https://facebook.com/deliciouscorner',
    twitter: 'https://twitter.com/deliciouscorner',
    google: 'https://g.page/deliciouscorner',
  },
};

// Demo menu categories
export const demoMenuCategories: MenuCategory[] = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'main-courses', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

// Demo menu items
export const demoMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Crispy Calamari',
    price: 12.99,
    description: 'Tender calamari rings lightly coated in seasoned flour and fried to perfection, served with garlic aioli.',
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '2',
    name: 'Bruschetta',
    price: 9.99,
    description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and extra-virgin olive oil.',
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1672007735902-8dd1aa790485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    price: 24.99,
    description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables and lemon herb rice.',
    category: 'main-courses',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '4',
    name: 'Ribeye Steak',
    price: 32.99,
    description: 'Tender, juicy ribeye steak grilled to your preference, served with garlic mashed potatoes and grilled asparagus.',
    category: 'main-courses',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '5',
    name: 'Vegetable Pasta',
    price: 18.99,
    description: 'Fettuccine pasta tossed with seasonal vegetables in a light cream sauce, topped with shaved Parmesan.',
    category: 'main-courses',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    price: 9.99,
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1542124948-dc391252a940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '7',
    name: 'New York Cheesecake',
    price: 8.99,
    description: 'Creamy cheesecake with a graham cracker crust, topped with your choice of fruit compote.',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '8',
    name: 'Signature Cocktail',
    price: 12.99,
    description: 'Our house specialty cocktail with premium vodka, fresh citrus, and a touch of mint.',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
  {
    id: '9',
    name: 'Craft Beer Selection',
    price: 7.99,
    description: 'Rotating selection of local craft beers. Ask your server for current offerings.',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    available: true,
  },
];

// Demo table requests
export const demoTableRequests: TableRequest[] = [
  {
    id: '1',
    tableId: '3',
    reason: 'Need assistance with menu',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    completed: false,
    status: 'pending',
    type: 'service',
    tableNumber: '3'
  },
  {
    id: '2',
    tableId: '5',
    reason: 'Ready for bill',
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    completed: false,
    status: 'acknowledged',
    type: 'bill',
    tableNumber: '5'
  },
  {
    id: '3',
    tableId: '2',
    reason: 'Additional order',
    menuItemId: '6',
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    completed: true,
    completedAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    status: 'completed',
    type: 'order',
    tableNumber: '2'
  },
];
