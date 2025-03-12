
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRestaurant } from "@/context/RestaurantContext";
import { Restaurant } from "@/utils/types";
import { PlusCircle, Store, Users, Settings, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/ui/FadeIn";

const Restaurants = () => {
  const { toast } = useToast();
  const { restaurant } = useRestaurant();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'The Delicious Corner',
      description: 'A modern restaurant offering a delightful blend of international cuisines.',
      logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      socialLinks: {},
      tables: 12,
      active: true,
      createdAt: new Date('2023-05-15')
    },
    {
      id: '2',
      name: 'Pasta Paradise',
      description: 'Authentic Italian restaurant with homemade pasta and traditional recipes.',
      logoUrl: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      socialLinks: {},
      tables: 8,
      active: true,
      createdAt: new Date('2023-07-22')
    },
    {
      id: '3',
      name: 'Sushi Sensation',
      description: 'Premium Japanese cuisine featuring the freshest seafood and skilled chefs.',
      logoUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      socialLinks: {},
      tables: 15,
      active: false,
      createdAt: new Date('2023-09-10')
    }
  ]);
  
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [newRestaurantDescription, setNewRestaurantDescription] = useState("");
  
  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRestaurantName) {
      toast({
        title: "Error",
        description: "Please enter a restaurant name",
        variant: "destructive",
      });
      return;
    }
    
    const newRestaurant: Restaurant = {
      id: (restaurants.length + 1).toString(),
      name: newRestaurantName,
      description: newRestaurantDescription,
      logoUrl: '',
      socialLinks: {},
      tables: 8,
      active: true,
      createdAt: new Date()
    };
    
    setRestaurants([...restaurants, newRestaurant]);
    setNewRestaurantName("");
    setNewRestaurantDescription("");
    
    toast({
      title: "Restaurant added",
      description: `${newRestaurantName} has been added to your account`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        title="TableWave - Restaurant Management" 
        subtitle="Multiple Restaurant Dashboard" 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Store className="mr-2 h-8 w-8 text-primary" />
            Restaurant Management
          </h1>
          <p className="text-muted-foreground">
            Manage all your restaurants from one central dashboard
          </p>
        </div>
        
        <Tabs defaultValue="restaurants" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="restaurants" className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              Restaurants
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="restaurants">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Add New Restaurant Card */}
              <FadeIn>
                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle>Add New Restaurant</CardTitle>
                    <CardDescription>
                      Create a new restaurant profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddRestaurant} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Restaurant Name</label>
                        <Input 
                          id="name"
                          value={newRestaurantName}
                          onChange={(e) => setNewRestaurantName(e.target.value)}
                          placeholder="Enter restaurant name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
                        <Input 
                          id="description"
                          value={newRestaurantDescription}
                          onChange={(e) => setNewRestaurantDescription(e.target.value)}
                          placeholder="Brief description"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Restaurant
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
              
              {/* Restaurant Cards */}
              {restaurants.map((restaurant, index) => (
                <FadeIn key={restaurant.id} delay={index * 100}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500" />
                      <div className="absolute -bottom-10 left-4">
                        {restaurant.logoUrl ? (
                          <img 
                            src={restaurant.logoUrl}
                            alt={restaurant.name}
                            className="h-20 w-20 rounded-full border-4 border-background object-cover"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-full border-4 border-background bg-primary flex items-center justify-center text-white text-2xl font-bold">
                            {restaurant.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant={restaurant.active ? "success" : "warning"}>
                          {restaurant.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pt-12 pb-4">
                      <CardTitle>{restaurant.name}</CardTitle>
                      <CardDescription>
                        {restaurant.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Tables</p>
                          <p className="font-medium">{restaurant.tables}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Since</p>
                          <p className="font-medium">{restaurant.createdAt?.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2 pt-2">
                      <Button asChild variant="outline" className="flex-1" size="sm">
                        <Link to={`/admin?restaurant=${restaurant.id}`}>
                          <Settings className="mr-2 h-4 w-4" />
                          Manage
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                        <Input 
                          id="fullName"
                          defaultValue="Restaurant Owner"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                        <Input 
                          id="email"
                          type="email"
                          defaultValue="owner@example.com"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Branding Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize how your restaurant interfaces appear to customers
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="brandName" className="text-sm font-medium">Brand Name</label>
                        <Input 
                          id="brandName"
                          defaultValue="TableWave"
                          placeholder="Your brand name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="primaryColor" className="text-sm font-medium">Primary Color</label>
                        <div className="flex gap-2">
                          <Input 
                            id="primaryColor"
                            type="color"
                            defaultValue="#8B5CF6"
                            className="w-16 h-10 p-1"
                          />
                          <Input 
                            value="#8B5CF6"
                            readOnly
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Subscription</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Pro Plan</h4>
                            <p className="text-sm text-muted-foreground">$49/month, billed monthly</p>
                          </div>
                          <Badge variant="success">Active</Badge>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>Next billing date: June 15, 2023</p>
                          <p>Includes 20 restaurant profiles and premium support</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Restaurants;
