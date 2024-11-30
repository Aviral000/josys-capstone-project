import React from "react";

const MenSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-6">MEN'S CLOTHING & SHOES</h2>
      <p className="text-gray-600 max-w-4xl mx-auto mb-8">
        As a creator, you look for ways to excel and express yourself when and
        where you can, from reaching for that last rep to evolving your
        streetwear style. Log miles or tear down the baseline in men's shoes
        with responsive cushioning. Rep an athletic style off the field in
        lifestyle apparel born of sport heritage. From athletes to streetwear
        enthusiasts, adidas men’s clothing and shoes exist to let you go
        harder, dig deeper, and get the most out of yourself, from the pitch to
        the street to the road less traveled.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <div>
          <h3 className="text-lg font-semibold">MEN'S SHOES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Men's Shoes</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">MEN'S CLOTHING</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Football Jerseys</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">MEN'S ACCESSORIES</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Men's Backpacks</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">MEN'S COLLECTIONS</h3>
          <ul className="text-sm text-gray-500">
            <li className="hover:text-black">
              <a href="/">Men's Running Shoes</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenSection;
