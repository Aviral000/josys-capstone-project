import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ControlledMenu, MenuItem, useHover } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

interface Category {
  id: string;
  category_name: string;
  icon?: string;
  sub_type_ids?: string[];
}

interface SubType {
  id: string;
  name: string;
}

interface MenuItemProps {
  category: Category;
  index: number;
}

const categories: Category[] = [
  {
    id: '501',
    category_name: 'Men',
    icon: 'https://example.com/icons/men.png',
    sub_type_ids: ['601', '602', '603']
  },
  {
    id: '502',
    category_name: 'Women',
    icon: 'https://example.com/icons/women.png',
    sub_type_ids: ['601', '602', '603']
  },
  {
    id: '503',
    category_name: 'Kids',
    icon: 'https://example.com/icons/kids.png',
    sub_type_ids: ['601', '602', '603']
  },
  {
    id: '504',
    category_name: 'sales',
    sub_type_ids: ['604', '605']
  }
];

const subTypes: SubType[] = [
  { id: '601', name: 'Clothing' },
  { id: '602', name: 'Footwear' },
  { id: '603', name: 'Accessories' },
  { id: '604', name: 'Black Friday Sales' },
  { id: '605', name: '50% Off Deals' }
];

const NavigationMenuItem: React.FC<MenuItemProps> = ({ category, index }) => {
    const ref = useRef<HTMLLIElement>(null);
    const [menuState, setMenuState] = React.useState<boolean>(false);
    const { anchorProps, hoverProps } = useHover(menuState, setMenuState);
  
    return (
      <li key={category.id} ref={ref} {...anchorProps} className="relative">
        <Link
          to={`/shop/${category.category_name.toLowerCase()}-clothing`}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 px-10 text-lg"
        >
          {category.category_name}
        </Link>
        <ControlledMenu
          {...hoverProps}
          state={menuState ? 'open' : 'closed'}
          anchorRef={ref}
          onClose={() => setMenuState(false)}
          transition
          menuClassName="bg-white shadow-lg rounded-md"
          portal={true}
          align="center"
          position="auto"
        >
          {category.sub_type_ids?.map((subId) => {
            const subCategory = subTypes.find((sub) => sub.id === subId);
            if (!subCategory) return null;
  
            return (
              <MenuItem key={subId} className="hover:bg-gray-100">
                <Link 
                  className="block w-full px-2 py-2 font-serif font-semibold"
                  // to={`/shop/${category.category_name.toLowerCase()}/${subCategory.name.toLowerCase()}`}
                  to={`/shop/${category.category_name.toLowerCase()}-clothing`}
                >
                  {subCategory.name}
                </Link>
              </MenuItem>
            );
          })}
        </ControlledMenu>
      </li>
    );
  };
  
  const ProDropper: React.FC = () => {
    return (
      <nav className="bg-white shadow-md relative">
        <div className="container mx-auto flex justify-between items-center p-4">
          <ul className="flex space-x-10 font-bold">
            {categories.map((category, index) => (
              <NavigationMenuItem 
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </ul>
        </div>
      </nav>
    );
  };
  
  export default ProDropper;