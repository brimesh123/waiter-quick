
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRestaurant } from "@/context/RestaurantContext";

const Admin = () => {
  const { toast } = useToast();
  const { restaurant, updateRestaurantInfo, menuCategories, addMenuItem } = useRestaurant();
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !newItemCategory) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addMenuItem({
      id: Date.now().toString(),
      name: newItemName,
      price: parseFloat(newItemPrice),
      category: newItemCategory,
      description: newItemDescription,
      image: "",
      available: true
    });

    toast({
      title: "Item added",
      description: `${newItemName} has been added to the menu`,
    });

    // Reset form
    setNewItemName("");
    setNewItemPrice("");
    setNewItemDescription("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title={`${restaurant.name} - Admin Portal`} 
        subtitle="Restaurant Management" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 mt-20">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="settings">Restaurant Settings</TabsTrigger>
            <TabsTrigger value="tables">Table Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Add Menu Item</CardTitle>
                <CardDescription>
                  Add a new item to your restaurant menu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddMenuItem} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Item Name</label>
                      <Input 
                        id="name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Chicken Parmesan"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">Price</label>
                      <Input 
                        id="price"
                        type="number"
                        step="0.01"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        placeholder="12.99"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">Category</label>
                      <select 
                        id="category"
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="">Select category</option>
                        {menuCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">Image URL (optional)</label>
                      <Input 
                        id="image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
                    <textarea 
                      id="description"
                      value={newItemDescription}
                      onChange={(e) => setNewItemDescription(e.target.value)}
                      placeholder="Delicious chicken parmesan with homemade sauce"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Add Menu Item</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
                <CardDescription>
                  Update your restaurant details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="restaurantName" className="text-sm font-medium">Restaurant Name</label>
                    <Input 
                      id="restaurantName"
                      defaultValue={restaurant.name}
                      placeholder="Restaurant Name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea 
                      id="description"
                      defaultValue={restaurant.description}
                      placeholder="A short description of your restaurant"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="logo" className="text-sm font-medium">Logo URL</label>
                    <Input 
                      id="logo"
                      defaultValue={restaurant.logoUrl}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle>Table Management</CardTitle>
                <CardDescription>
                  Configure your restaurant tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate QR codes for each table to allow customers to access the digital menu.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <Card key={i} className="p-4 text-center">
                      <p className="font-bold text-xl mb-2">Table {i + 1}</p>
                      <div className="bg-gray-200 w-full aspect-square mb-2 flex items-center justify-center">
                        <p className="text-xs text-gray-500">QR Code</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">Download</Button>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Service Analytics</CardTitle>
                <CardDescription>
                  View insights about your waiter service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                  <p className="text-muted-foreground">Analytics chart will appear here</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <p className="text-muted-foreground text-sm">Total Requests</p>
                    <p className="text-3xl font-bold">245</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-muted-foreground text-sm">Average Response Time</p>
                    <p className="text-3xl font-bold">3.5m</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-muted-foreground text-sm">Customer Satisfaction</p>
                    <p className="text-3xl font-bold">95%</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
