import React from "react";

const KidsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-6">KIDS' CLOTHING & SHOES</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-8">
        Fuel their adventures with clothing and shoes designed for kids on the
        go. Whether they're in the classroom, on the playground, or at practice,
        adidas kids' clothing and shoes keep them comfortable, stylish, and
        ready to take on the day.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <div>
          <h3 className="text-lg font-semibold">KIDS' SHOES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Kids' Sneakers</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">KIDS' CLOTHING</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Kids' Hoodies</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">KIDS' ACCESSORIES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Kids' Backpacks</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">KIDS' COLLECTIONS</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Kids' Sports Gear</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
