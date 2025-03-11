
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useRestaurant } from '@/context/RestaurantContext';
import { Instagram, Facebook, Twitter, Globe } from 'lucide-react';

interface FooterProps {
  className?: string;
  minimal?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ className, minimal = false }) => {
  const { restaurant } = useRestaurant();
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Website',
      url: restaurant?.socialLinks.website,
      icon: <Globe className="w-5 h-5" />,
    },
    {
      name: 'Instagram',
      url: restaurant?.socialLinks.instagram,
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: 'Facebook',
      url: restaurant?.socialLinks.facebook,
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      url: restaurant?.socialLinks.twitter,
      icon: <Twitter className="w-5 h-5" />,
    },
  ].filter(link => link.url);
  
  if (minimal) {
    return (
      <footer className={cn('mt-auto py-4 px-6 text-center text-sm text-muted-foreground', className)}>
        <p>© {currentYear} {restaurant?.name || 'Waiter Quick'}. All rights reserved.</p>
      </footer>
    );
  }
  
  return (
    <footer className={cn('mt-auto py-8 bg-secondary/50', className)}>
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              {restaurant?.logo ? (
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-10 w-10 object-cover rounded-full mr-3"
                />
              ) : (
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-3">
                  {restaurant?.name?.substring(0, 1) || 'W'}
                </div>
              )}
              <span className="font-semibold text-lg">{restaurant?.name || 'Waiter Quick'}</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Enhancing your dining experience with quick and efficient service.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/customer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Customer View
                </Link>
              </li>
              <li>
                <Link to="/waiter" className="text-muted-foreground hover:text-foreground transition-colors">
                  Waiter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-primary/10 transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No social links available</p>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} {restaurant?.name || 'Waiter Quick'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
