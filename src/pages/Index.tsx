
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">
          Table<span className="text-primary">Wave</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-12">
          The smart way to enhance restaurant service. Allow your customers to browse menus and call waiters with a simple tap.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Customer Portal</CardTitle>
              <CardDescription>Browse menu and request service</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Scan a QR code at your table to browse the menu and call a waiter when needed.</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/customer">Enter as Customer</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Waiter Dashboard</CardTitle>
              <CardDescription>Manage service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p>View and respond to customer requests from all tables in real-time.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/waiter">Staff Login</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>Manage your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Update menus, customize settings, and view analytics for your restaurant.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin">Admin Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
