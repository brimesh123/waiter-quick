
import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Instagram, Facebook, Twitter, Star } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

interface SocialLink {
  name: string;
  url?: string;
  icon: React.ReactNode;
  color: string;
}

const Linktree: React.FC = () => {
  const { restaurant } = useRestaurant();

  if (!restaurant) {
    return null;
  }

  const { socialLinks } = restaurant;

  const links: SocialLink[] = [
    {
      name: 'Website',
      url: socialLinks?.website,
      icon: <Globe className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      name: 'Instagram',
      url: socialLinks?.instagram,
      icon: <Instagram className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      name: 'Facebook',
      url: socialLinks?.facebook,
      icon: <Facebook className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-blue-600 to-blue-400',
    },
    {
      name: 'Twitter',
      url: socialLinks?.twitter,
      icon: <Twitter className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-sky-500 to-blue-500',
    },
    {
      name: 'Google Reviews',
      url: socialLinks?.google,
      icon: <Star className="h-5 w-5" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
    },
  ].filter((link) => link.url);

  if (links.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Connect With Us</CardTitle>
        <CardDescription>Follow us on social media or leave a review</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {links.map((link, index) => (
          <FadeIn key={link.name} delay={index * 100}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg border border-input hover:border-primary/50 transition-all hover:shadow-sm"
            >
              <div className={`${link.color} text-white p-2 rounded-md mr-3`}>
                {link.icon}
              </div>
              <span className="font-medium">{link.name}</span>
            </a>
          </FadeIn>
        ))}
      </CardContent>
    </Card>
  );
};

export default Linktree;
