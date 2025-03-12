
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, Menu, X, Store } from 'lucide-react';
import { useRestaurant } from '@/context/RestaurantContext';
import FadeIn from '@/components/ui/FadeIn';

interface HeaderProps {
  backLink?: string;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ backLink, title, subtitle }) => {
  const location = useLocation();
  const { restaurant } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Customer View', path: '/customer' },
    { name: 'Waiter Dashboard', path: '/waiter' },
    { name: 'Admin', path: '/admin' },
    { name: 'Restaurants', path: '/restaurants' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8',
        scrolled ? 'bg-white/80 backdrop-blur shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-tight flex items-center justify-between">
        {/* Back button or logo */}
        <div className="flex items-center">
          {backLink ? (
            <Link
              to={backLink}
              className="flex items-center mr-4 text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1 font-medium">Back</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center">
              {restaurant?.logoUrl ? (
                <img
                  src={restaurant.logoUrl}
                  alt={restaurant.name}
                  className="h-10 w-10 object-cover rounded-full mr-3"
                />
              ) : (
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  {restaurant?.name.substring(0, 1) || 'T'}
                </div>
              )}
              <span className="font-semibold text-lg">{title || restaurant?.name || 'TableWave'}</span>
              {subtitle && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col md:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                {restaurant?.logoUrl ? (
                  <img
                    src={restaurant.logoUrl}
                    alt={restaurant.name}
                    className="h-10 w-10 object-cover rounded-full mr-3"
                  />
                ) : (
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                    {restaurant?.name.substring(0, 1) || 'T'}
                  </div>
                )}
                <span className="font-semibold text-lg">{restaurant?.name || 'TableWave'}</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item, index) => (
                <FadeIn key={item.path} delay={index * 100}>
                  <Link
                    to={item.path}
                    className={cn(
                      'px-4 py-3 rounded-lg text-lg font-medium transition-all block',
                      isActive(item.path)
                        ? 'bg-primary text-white'
                        : 'hover:bg-secondary'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
