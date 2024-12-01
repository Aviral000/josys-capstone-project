import React from "react";
import { useProduct } from "../../../customs/hooks/useProduct";
import { useCategory } from "../../../customs/hooks/useCategory";
import { useSubCategory } from "../../../customs/hooks/useSubCategory";
import { useVendor } from "../../../customs/hooks/useVendor";
import Swal from "sweetalert2";

const PBV: React.FC = () => {
  const { products, isFetchingProducts, isFetchError: isFetchErrorProducts, deleteProduct } = useProduct();
  const { categories } = useCategory();
  const { subCategories } = useSubCategory();
  const { vendors } = useVendor();

  const handleDeleteProduct = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      toast: true,
      position: 'bottom-right'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(productId, {
          onSuccess: () => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          },
          onError: (error: any) => {
            Swal.fire("Error!", `Failed to delete product: ${error.message}`, "error");
          },
        });
      }
    });
  };

  if (isFetchingProducts) return <div>Loading products...</div>;
  if (isFetchErrorProducts) return <div>Error fetching products.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products by Vendors</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left max-w-[150px]">Product Name</th>
              <th className="px-4 py-2 border-b text-left max-w-[200px]">Description</th>
              <th className="px-4 py-2 border-b text-left max-w-[100px]">Category</th>
              <th className="px-4 py-2 border-b text-left max-w-[100px]">SubCategory</th>
              <th className="px-4 py-2 border-b text-left max-w-[150px]">Vendor</th>
              <th className="px-4 py-2 border-b text-left max-w-[80px]">Stock</th>
              <th className="px-4 py-2 border-b text-center max-w-[150px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              const category = categories?.find((cat) => cat.id === product.categoryId)?.categoryName || "Unknown";
              const subCategory =
                subCategories?.find((sub) => sub.id === product.subtypeId)?.name || "Unknown";
              const vendor = vendors?.find((vend) => vend.id === product.vendorId)?.companyName || "Unknown Vendor";

              return (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b max-w-[150px] whitespace-normal break-words">{product.productName}</td>
                  <td className="px-4 py-2 border-b max-w-[200px] whitespace-normal break-words">
                    {product.productDesc}
                  </td>
                  <td className="px-4 py-2 border-b max-w-[100px]">{category}</td>
                  <td className="px-4 py-2 border-b max-w-[100px]">{subCategory}</td>
                  <td className="px-4 py-2 border-b max-w-[150px] whitespace-normal break-words">{vendor}</td>
                  <td className="px-4 py-2 border-b max-w-[80px]">{product.stock}</td>
                  <td className="px-4 py-2 border-b text-center max-w-[150px]">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PBV;
