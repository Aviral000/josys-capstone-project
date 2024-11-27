import React from 'react';
import { Link } from 'react-router-dom';
import ProDropper from '../../customs/components/ProDropper.module';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Men', path: '/shop/men-clothing' },
  { name: 'Women', path: '/shop/women-clothing' },
  { name: 'Kids', path: '/shop/kids-clothing' },
  { name: 'Sale', path: '/sale' },
];

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Active Attire
        </Link>
        {/* <nav>
          <ul className="flex space-x-10 font-bold">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
        <ProDropper />
        <div className="flex items-center space-x-4">
          <Link to="/search" aria-label="Search">
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </Link>
          <Link to="/cart" aria-label="Cart">
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6m0 0h11m-11 0a1.5 1.5 0 11-3 0m14.5 0a1.5 1.5 0 11-3 0"
              />
            </svg>
          </Link>
          <Link to="/profile" aria-label="Profile">
            <svg
              className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;