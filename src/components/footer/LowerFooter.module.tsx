import React, { memo } from "react";
import { FaInstagram } from "react-icons/fa";

const LowerFooter: React.FC = () => {
  return (
    <div>
      <div className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-black text-sm">
          <div>
            <h3 className="font-bold mb-4">PRODUCTS</h3>
            <ul className="space-y-2">
              <li>Footwear</li>
              <li>Clothing</li>
              <li>Accessories</li>
              <li>Outlet-Sale</li>
              <li>New Arrivals</li>
              <li>Special Offer</li>
              <li>Flat 50% Off!</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SPORTS</h3>
            <ul className="space-y-2">
              <li>CRICKET</li>
              <li>Running</li>
              <li>Football</li>
              <li>Gym/Training</li>
              <li>Tennis</li>
              <li>Outdoor</li>
              <li>Basketball</li>
              <li>Swimming</li>
              <li>Skateboarding</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">COLLECTIONS</h3>
            <ul className="space-y-2">
              <li>Ultraboost</li>
              <li>Superstar</li>
              <li>NMD</li>
              <li>Stan Smith</li>
              <li>Sustainability</li>
              <li>Predator</li>
              <li>Parley</li>
              <li>Adicolor</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">SUPPORT</h3>
            <ul className="space-y-2">
              <li>Help</li>
              <li>Customer Services</li>
              <li>Returns & Exchanges</li>
              <li>Shipping</li>
              <li>Order Tracker</li>
              <li>Store Finder</li>
              <li>adiClub</li>
              <li>adiClub Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">COMPANY INFO</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>adidas stories</li>
              <li>adidas Apps</li>
              <li>Entity Details</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">FOLLOW US</h3>
            <div className="flex items-center space-x-4">
              <FaInstagram size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="/" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" className="hover:underline">
              Terms and Conditions
            </a>
            <a href="/" className="hover:underline">
              Cookies
            </a>
          </div>
          <div>
            &copy; 2024 ActiveAttire India Marketing Pvt. Ltd
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LowerFooter);
