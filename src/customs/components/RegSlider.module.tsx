import React, { useState, useRef, useEffect, useContext } from 'react';
import { customerContext } from '../../contextAPI/customers/createContext';

const RegSlider: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useContext(customerContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {isOpen ? '▲ Menu' : '▼ Menu'}
      </button>

      {isOpen && (
        <>
          {!isLoggedIn ? (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1 font-semibold" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a
                  href="/user-register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  User Register
                </a>
                <a
                  href="/user-login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  User Login
                </a>
                <a
                  href="/vendor-register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Vendor Register
                </a>
                <a
                  href="/vendor-login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Vendor Login
                </a>
              </div>
            </div>
          ) : (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-red-800 ring-1 ring-red ring-opacity-5">
              <div className="py-1 font-semibold" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-100 hover:bg-red-900"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RegSlider;
