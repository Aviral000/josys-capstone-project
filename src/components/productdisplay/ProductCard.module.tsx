import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {

const navigate = useNavigate();

  return (
    <div className="group flex flex-col items-center border rounded-md p-4 cursor-pointer shadow-md bg-white hover:shadow-lg transition-shadow" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative w-full h-48 mb-4">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-bold mb-1">₹{product.cost.toFixed(2)}</p>
        <p className="text-sm font-medium text-gray-800 mb-1">{product.productName}</p>
        <p className="text-xs text-gray-500">{product.productDesc}</p>
        <p className="text-xs text-gray-500"><span className="text-red-600 line-through">₹{product.cost}</span> → ₹{(product.cost - ((product.cost * product.discount) / 100)).toFixed(2) }</p>
      </div>
    </div>
  );
};

export default ProductCard;
