import React, { memo, useEffect, useState, useRef } from "react";
import SubCategoryCarousel from "../../customs/components/SubCategory.module";
import { useCategory } from "../../customs/hooks/useCategory";
import { useProduct } from "../../customs/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCategories } from "../../services/SubCategory.service";
import { SubType } from "../../models/Category.type";

const MenCategory: React.FC = () => {
  const { categories, isFetchingCategories, fetchError: categoryFetchError } = useCategory();
  const { products, isFetchingProducts, fetchError: productFetchError } = useProduct();
  
  const { data: subTypes = [], error: subTypeFetchError, isLoading: isFetchingSubTypes } =
    useQuery<SubType[], Error>({
      queryKey: ["subTypes"],
      queryFn: getAllSubCategories,
    });

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const subTypeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (products?.length && categories?.length) {
      const menCategory = categories.find((category) => category.categoryName === "Kids");
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

  const menCategory = categories!.find((category) => category.categoryName === "Kids");

  const menSubTypes =
    menCategory?.subTypeIds?.map((subTypeId) =>
      subTypes?.find((subType) => subType.id === subTypeId)
    ) || [];

  const scrollToSubCategory = (subTypeId: string) => {
    const targetRef = subTypeRefs.current[subTypeId];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative p-4">

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
          <h2 className="text-xl font-semibold mb-4 -z-50">{subType?.name}</h2>
          <SubCategoryCarousel
            products={filteredProducts.filter((product) => product.subtypeId === subType?.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(MenCategory);
