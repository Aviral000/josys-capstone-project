import React from "react";

const WomenSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-6">WOMEN'S CLOTHING & SHOES</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-8">
        Find your stride with clothing and footwear designed to inspire
        confidence, whether you're on the pitch, the court, or the street.
        Explore our range of women's products for all occasions. From
        performance-driven sportswear to stylish streetwear, adidas women’s
        clothing and shoes help you reach new heights while looking your best.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <div>
          <h3 className="text-lg font-semibold">WOMEN'S SHOES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Women's Shoes</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">WOMEN'S CLOTHING</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Tennis Dresses</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">WOMEN'S ACCESSORIES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Women's Bags</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">WOMEN'S COLLECTIONS</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Women's Training Gear</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WomenSection;
