import React, { memo, useEffect, useState, useRef } from "react";
import SubCategoryCarousel from "../../customs/components/SubCategory.module";
import { useCategory } from "../../customs/hooks/useCategory";
import { useProduct } from "../../customs/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCategories } from "../../services/SubCategory.service";
import { SubType } from "../../models/Category.type";
import { FaFilter } from "react-icons/fa";

const MenCategory: React.FC = () => {
  const { categories, isFetchingCategories, fetchError: categoryFetchError } = useCategory();
  const { products, isFetchingProducts, fetchError: productFetchError } = useProduct();
  
  const { data: subTypes = [], error: subTypeFetchError, isLoading: isFetchingSubTypes } =
    useQuery<SubType[], Error>({
      queryKey: ["subTypes"],
      queryFn: getAllSubCategories,
    });

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const subTypeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (products?.length && categories?.length) {
      const menCategory = categories.find((category) => category.categoryName === "Men");
      const menProducts = products.filter((product) => product.categoryId === menCategory?.id);
      setFilteredProducts(menProducts);
    }
  }, [products, categories]);

  if (isFetchingCategories || isFetchingProducts || isFetchingSubTypes) {
    return <div>Loading...</div>;
  }

  if (categoryFetchError || productFetchError || subTypeFetchError) {
    return <div>Error fetching data.</div>;
  }

  const menCategory = categories!.find((category) => category.categoryName === "Men");

  const menSubTypes =
    menCategory?.subTypeIds?.map((subTypeId) =>
      subTypes?.find((subType) => subType.id === subTypeId)
    ) || [];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const menProducts = products!.filter((product) => product.categoryId === menCategory?.id);
      setFilteredProducts(
        menProducts.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      const menProducts = products!.filter((product) => product.categoryId === menCategory?.id);
      setFilteredProducts(menProducts);
    }
  };

  const handleSubCategoryFilter = (subTypeId: string) => {
    const menProducts = products!.filter((product) => product.categoryId === menCategory?.id);
    setFilteredProducts(menProducts.filter((product) => product.subtypeId === subTypeId));
    scrollToSubCategory(subTypeId);
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const scrollToSubCategory = (subTypeId: string) => {
    const targetRef = subTypeRefs.current[subTypeId];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Men's Category</h1>
        <button
          className="text-xl bg-gray-200 p-2 rounded-md shadow-md hover:bg-gray-300"
          onClick={toggleFilterDrawer}
        >
          <FaFilter />
        </button>
      </div>

      {filterDrawerOpen && (
        <div className="absolute right-0 top-16 bg-white border-l shadow-lg w-80 h-full p-4 z-50">
          <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium mb-2">
              Search by Name
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-md shadow hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Subcategories</h3>
            {menSubTypes?.map((subType) => (
              <button
                key={subType?.id}
                className="block w-full text-left p-2 bg-gray-100 rounded-md mb-2 hover:bg-gray-200"
                onClick={() => handleSubCategoryFilter(subType?.id!)}
              >
                {subType?.name}
              </button>
            ))}
          </div>

          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600"
            onClick={toggleFilterDrawer}
          >
            Close
          </button>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">Subcategories</h2>
      <div className="flex flex-wrap gap-4">
        {menSubTypes?.map((subType) => (
          <div
            key={subType?.id}
            className="border p-2 rounded-md shadow-md bg-gray-100 text-center cursor-pointer"
            onClick={() => scrollToSubCategory(subType?.id!)}
          >
            <p className="font-medium">{subType?.name}</p>
          </div>
        ))}
      </div>

      {menSubTypes?.map((subType) => (
        <div
          key={subType?.id}
          className="mt-8"
          ref={(el) => (subTypeRefs.current[subType?.id!] = el)}
        >
          <h2 className="text-xl font-semibold mb-4">{subType?.name}</h2>
          <SubCategoryCarousel
            products={filteredProducts.filter((product) => product.subtypeId === subType?.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(MenCategory);
