
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Users, Settings, Utensils } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <FadeIn duration="slow">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Table<span className="text-primary">Wave</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-12">
            The smart way to enhance restaurant service. Manage multiple restaurants, allow customers to browse menus and call waiters with a simple tap.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <FadeIn delay={100}>
            <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-blue-500" />
                  Customer Portal
                </CardTitle>
                <CardDescription>Browse menu and request service</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Scan a QR code at your table to browse the menu and call a waiter when needed.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link to="/customer">Enter as Customer</Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
          
          <FadeIn delay={200}>
            <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-500" />
                  Waiter Dashboard
                </CardTitle>
                <CardDescription>Manage service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p>View and respond to customer requests from all tables in real-time with our enhanced UI.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Link to="/waiter">Staff Login</Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
          
          <FadeIn delay={300}>
            <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="mr-2 h-5 w-5 text-green-500" />
                  Restaurant Manager
                </CardTitle>
                <CardDescription>Multiple restaurant management</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Manage multiple restaurants from a single dashboard with branding options for each.</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  <Link to="/restaurants">Restaurant Management</Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        </div>
        
        <FadeIn delay={400}>
          <div className="mt-16 bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">New Multi-Restaurant Support</h2>
            <p className="mb-4">
              TableWave now supports managing multiple restaurants from a single dashboard. Perfect for restaurant groups or franchises.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-left">
              <li>Manage menus, tables, and staff for multiple locations</li>
              <li>Custom branding options for each restaurant</li>
              <li>Centralized analytics and reporting</li>
              <li>Improved waiter dashboard with real-time updates</li>
            </ul>
            <Button asChild>
              <Link to="/restaurants" className="flex items-center">
                <Store className="mr-2 h-4 w-4" />
                Try Multi-Restaurant Features
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Index;
