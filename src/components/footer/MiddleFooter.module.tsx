import React from "react";
import { Link } from "react-router-dom";
import { FaShippingFast, FaSyncAlt, FaCreditCard } from "react-icons/fa";

const MiddleFooter: React.FC = () => {
  return (
    <div className="bg-yellow-400 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-black">
        <div className="flex flex-col md:flex-row items-center gap-40">
          <div className="flex items-center gap-2">
            <FaShippingFast size={24} />
            <p className="text-lg font-medium">Fast Delivery</p>
          </div>
          <div className="flex items-center gap-2">
            <FaSyncAlt size={24} />
            <p className="text-lg font-medium">24-Hour Replacement</p>
          </div>
          <div className="flex items-center gap-2">
            <FaCreditCard size={24} />
            <p className="text-lg font-medium">No-Cost EMI</p>
          </div>
        </div>

        <Link
          to="/user-register"
          className="mt-4 md:mt-0 bg-black text-white px-6 py-3 text-sm font-medium rounded-md shadow-md hover:bg-gray-800 flex items-center gap-2"
        >
          Join Now
          <span className="text-xl">→</span>
        </Link>
      </div>
    </div>
  );
};

export default MiddleFooter;
