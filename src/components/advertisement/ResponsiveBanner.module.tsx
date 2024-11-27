import React from "react";
import back1 from '../../assets/main/bg-1.webp'

const ResponsiveBanner: React.FC = () => {
  return (
    <div
      className="relative w-full h-[80vh] md:h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${back1})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center px-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">BLACK FRIDAY</h1>
          <p className="text-lg md:text-xl mb-2">UPTO 60% + EXTRA 20% OFF</p>
          <p className="text-sm md:text-base">Buy More! Save More!</p>
        </div>
      </div>
      <div className="absolute bottom-8 left-8 space-x-4">
        <button className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP MEN
        </button>
        <button className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP WOMEN
        </button>
        <button className="bg-white text-black px-5 py-2 text-sm md:text-base font-medium rounded-md shadow hover:bg-gray-200">
          SHOP KIDS
        </button>
      </div>
    </div>
  );
};

export default ResponsiveBanner;
