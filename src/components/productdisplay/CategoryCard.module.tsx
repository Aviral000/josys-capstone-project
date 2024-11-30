import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard: React.FC<{ category: any; products: any[] }> = ({
  category,
  products,
}) => {

const navigate = useNavigate();

  return (
    <div className="border rounded-md shadow-md p-4 bg-white hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-bold mb-4 text-center">
        {category.categoryName}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <p className="text-sm font-medium">{product.productName}</p>
              <p className="text-sm text-gray-500">
                ₹{product.cost.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
