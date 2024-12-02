import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { VendorContext } from "../../../contextAPI/vendors/CreateContext";
import { useProduct } from "../../../customs/hooks/useProduct";
import ProductDetails from "./ProductDetails.module";

const VendorProducts: React.FC = () => {
  const { vendorId } = useContext(VendorContext);
  const { products, isFetchingProducts, isFetchError, fetchError, deleteProduct } = useProduct();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const vendorProducts = products?.filter((product) => product.vendorId === vendorId);

  const handleDelete = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(productId, {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Product Deleted",
              text: "Product has been deleted successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
          },
          onError: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: error.message || "Could not delete product.",
              timer: 2000,
              showConfirmButton: false,
            });
          },
        });
      }
    });
  };

  if (isFetchingProducts) return <div>Loading products...</div>;
  if (isFetchError) return <div>Error fetching products: {fetchError?.message}</div>;

  if (!vendorProducts || vendorProducts.length === 0) {
    return <div>No products found for this vendor.</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Vendor Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.images[0]} alt={product.productName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.productName}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.productDesc}</p>
              <p className="text-lg font-semibold text-indigo-600">₹{product.cost}</p>
              <p className="text-sm text-gray-500">
                Stock: {product.stock} | Discount: {product.discount}%
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setSelectedProductId(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProductId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ProductDetails productId={selectedProductId} onClose={() => setSelectedProductId(null)} />
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
