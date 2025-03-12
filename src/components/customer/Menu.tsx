
import React, { useState, useEffect } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import MenuCategory from './MenuCategory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FadeIn from '@/components/ui/FadeIn';
import { Search } from 'lucide-react';

interface MenuProps {
  tableNumber: string;
}

const Menu: React.FC<MenuProps> = ({ tableNumber }) => {
  const { categories, menuItems, requestWaiter } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log("Menu component rendering with tableNumber:", tableNumber);
    console.log("Menu component categories:", categories);
    console.log("Menu component menuItems:", menuItems);
  }, [tableNumber, categories, menuItems]);

  // Handle search
  const filteredItems = searchQuery
    ? menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Organize menu items by category
  const itemsByCategory = categories.map((category) => ({
    category,
    items: menuItems.filter((item) => item.category === category.id && item.available),
  }));

  if (categories.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">No menu categories available</p>
      </div>
    );
  }

  const handleRequestWaiter = (itemId: string, itemName: string) => {
    requestWaiter(tableNumber, 'service', itemId, `Question about ${itemName}`);
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search the menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {searchQuery ? (
        // Show search results
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-xl font-semibold flex items-center">
            Search Results
            <Badge variant="outline" className="ml-2">
              {filteredItems.length} items
            </Badge>
          </h2>
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const category = categories.find((c) => c.id === item.category);
                return (
                  <FadeIn key={item.id}>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-start gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              {category && (
                                <Badge variant="outline" className="mt-1">
                                  {category.name}
                                </Badge>
                              )}
                            </div>
                            <span className="font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                          <div className="mt-3">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleRequestWaiter(item.id, item.name)}
                            >
                              Request waiter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No menu items found matching "{searchQuery}"</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Show regular menu
        <Tabs defaultValue={categories.length > 0 ? categories[0]?.id : ''} className="w-full">
          <TabsList className="mb-6 flex w-full h-auto overflow-x-auto scrollbar-hide justify-start p-1 space-x-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-4 py-2 whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => {
            const categoryItems = menuItems.filter(
              (item) => item.category === category.id && item.available
            );

            return (
              <TabsContent key={category.id} value={category.id} className="animate-fade-in space-y-6">
                <FadeIn>
                  <MenuCategory
                    category={category}
                    items={categoryItems}
                    tableNumber={tableNumber}
                  />
                </FadeIn>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default Menu;
