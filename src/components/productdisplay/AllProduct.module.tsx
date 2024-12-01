import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard.module";
import CategoryCard from "./CategoryCard.module";
import { useProduct } from "../../customs/hooks/useProduct";
import { useCategory } from "../../customs/hooks/useCategory";

const AllProduct: React.FC = () => {
  const { products } = useProduct();
  const { categories } = useCategory();

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25000]);
  const [appliedFilters, setAppliedFilters] = useState({
    sortBy: "",
    discount: 0,
    priceRange: [500, 25000] as [number, number],
  });

  const drawerRef = useRef<HTMLDivElement | null>(null);

  const toggleFilterWindow = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ sortBy, discount, priceRange });
    setFilterVisible(false);
  };

  const handleClearFilters = () => {
    setSortBy("");
    setDiscount(0);
    setPriceRange([500, 25000]);
    setAppliedFilters({ sortBy: "", discount: 0, priceRange: [500, 25000] });
  };

  const filteredProducts = products
    ?.filter((product) => product.discount >= appliedFilters.discount)
    .filter(
      (product) =>
        product.cost >= appliedFilters.priceRange[0] &&
        product.cost <= appliedFilters.priceRange[1]
    )
    .sort((a, b) => {
      if (appliedFilters.sortBy === "low-to-high") return a.cost - b.cost;
      if (appliedFilters.sortBy === "high-to-low") return b.cost - a.cost;
      return 0;
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setFilterVisible(false);
      }
    };

    if (isFilterVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterVisible]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {categories?.map((category) => {
          const categoryProducts = products?.filter(
            (product) => product.categoryId === category.id
          );
          return (
            <CategoryCard
              key={category.id}
              category={category}
              products={categoryProducts || []}
            />
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button
          className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={toggleFilterWindow}
        >
          <span>Filter & Sort</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h18M8 12h8M10 16h4"
            />
          </svg>
        </button>
      </div>

      {isFilterVisible && (
        <div
          ref={drawerRef}
          className="fixed right-0 top-20 bg-white border-l shadow-lg w-80 h-full p-4 z-50"
        >
          <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Minimum Discount (%)</h3>
            <input
              type="number"
              placeholder="Enter minimum discount"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 border rounded-md"
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 border rounded-md"
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
