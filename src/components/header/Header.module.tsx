import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useProduct } from '../../customs/hooks/useProduct';
import ProDropper from '../../customs/components/ProDropper.module';
import { Search, ShoppingCart, User } from 'lucide-react';
import RegSlider from '../../customs/components/RegSlider.module';

// Types for better type safety
type Product = {
  id: string;
  productName: string;
  cost: number;
  images: string[];
};

// Separate SearchResult component for better organization
const SearchResult = ({ 
  product, 
  onSelect 
}: { 
  product: Product; 
  onSelect: () => void;
}) => (
  <Link
    to={`/product/${product.id}`}
    className="block p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
    onClick={onSelect}
  >
    <div className="flex items-center space-x-3">
      <img 
        src={product.images[0]} 
        alt={product.productName}
        className="w-12 h-12 object-cover rounded-md"
      />
      <div>
        <p className="font-medium">{product.productName}</p>
        <p className="text-sm text-gray-500">₹{product.cost.toFixed(2)}</p>
      </div>
    </div>
  </Link>
);

// Separate SearchBox component for better modularity
const SearchBox = ({
  isOpen,
  searchTerm,
  onSearchChange,
  searchResults,
  onResultSelect
}: {
  isOpen: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Product[];
  onResultSelect: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-12 right-0 w-96 bg-white shadow-lg rounded-lg p-4 border"
      style={{ 
        position: 'absolute',
        zIndex: 10000,
      }}
    >
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={onSearchChange}
        autoFocus
      />
      <div className="mt-4 max-h-64 overflow-y-auto">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <SearchResult
              key={product.id}
              product={product}
              onSelect={onResultSelect}
            />
          ))
        ) : searchTerm ? (
          <p className="text-gray-500 p-2">No products found.</p>
        ) : null}
      </div>
    </div>
  );
};

const Header = () => {
  const { products } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!products) return;
      
      if (query.trim()) {
        const filteredProducts = products.filter((product) =>
          product.productName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } else {
        setSearchResults([]);
      }
    }, 300),
    [products]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    {
      to: "/cart",
      ariaLabel: "Cart",
      icon: ShoppingCart
    },
    {
      to: "/profile",
      ariaLabel: "Profile",
      icon: User
    }
  ];

  return (
    <header className="bg-white shadow-md relative" style={{ zIndex: 9999 }}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Active Attire
        </Link>

        <ProDropper />

        <div className="flex items-center space-x-4">
          <div ref={searchContainerRef} className="relative" style={{ position: 'relative', zIndex: 9999 }}>
            <button
              onClick={() => setShowSearchBox(!showSearchBox)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Search"
              aria-expanded={showSearchBox}
            >
              <Search className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
            </button>

            <SearchBox
              isOpen={showSearchBox}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              searchResults={searchResults}
              onResultSelect={() => setShowSearchBox(false)}
            />
          </div>

          {navigationItems.map(({ to, ariaLabel, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label={ariaLabel}
            >
              <Icon className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
            </Link>
          ))}
          <div className="fixed right-8 z-50">
            <RegSlider />
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);