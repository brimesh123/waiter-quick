
import React from 'react';
import MenuItem from './MenuItem';
import { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '@/utils/types';
import FadeIn from '@/components/ui/FadeIn';

interface MenuCategoryProps {
  category: MenuCategoryType;
  items: MenuItemType[];
  tableNumber: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, items, tableNumber }) => {
  if (items.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-muted-foreground">No items available in this category</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{category.name}</h2>
      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <FadeIn key={item.id} delay={index * 100} duration="normal">
            <MenuItem item={item} tableNumber={tableNumber} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
