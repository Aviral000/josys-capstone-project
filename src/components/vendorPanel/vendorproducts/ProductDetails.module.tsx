import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useProduct } from "../../../customs/hooks/useProduct";
import { useSubCategory } from "../../../customs/hooks/useSubCategory";
import { useCategory } from "../../../customs/hooks/useCategory";

type ProductDetailsProps = {
  productId: string;
  onClose: () => void;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onClose }) => {
  const { product, isFetchingProduct, isFetchErrorId, fetchErrorId, updateProduct } = useProduct(productId);
  const { subCategories } = useSubCategory();
  const { categories } = useCategory();

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imageInputs, setImageInputs] = useState<string[]>([]);

  // Update imageInputs state when product.images is available
  useEffect(() => {
    if (product?.images) {
      setImageInputs(product.images);
    }
  }, [product?.images]);

  const handleInputChange = (field: string, value: string | number) => {
    if (!editingProduct) return;
    setEditingProduct((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...imageInputs];
    updatedImages[index] = value;
    setImageInputs(updatedImages);
  };

  const handleSave = () => {
    if (!editingProduct) return;

    const { id, ...editableFields } = editingProduct;

    updateProduct.mutate(
      { id, updates: { ...editableFields, images: imageInputs } },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Product Updated",
            text: "Product details updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setEditingProduct(null);
          onClose();
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message || "Could not update product details.",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      }
    );
  };

  if (isFetchingProduct) return <div>Loading product details...</div>;
  if (isFetchErrorId) return <div>Error fetching product: {fetchErrorId?.message}</div>;
  if (!product) return <div>No product data found.</div>;

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl">
      <div className="w-full lg:w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {imageInputs.map((image: string, index: number) => (
            <div key={index}>
              {image.slice(-3).toLowerCase() === "mp4" ? (
                <video
                  className="w-full h-48 object-cover rounded-md"
                  autoPlay
                  src={image}
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              ) : (
                <img
                  src={image}
                  alt={`Product images ${index + 1}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={editingProduct?.productName ?? product.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingProduct}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editingProduct?.productDesc ?? product.productDesc}
              onChange={(e) => handleInputChange("productDesc", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows={2}
              disabled={!editingProduct}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                value={editingProduct?.cost ?? product.cost}
                onChange={(e) => handleInputChange("cost", e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={!editingProduct}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={editingProduct?.stock ?? product.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={!editingProduct}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
              <input
                type="number"
                value={editingProduct?.discount ?? product.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                disabled={!editingProduct}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {editingProduct ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditingProduct(product)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 pl-4">
        <h3 className="text-xl font-bold mb-4">Manage Product Images</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{`Image ${index + 1}`}</label>
              <input
                type="text"
                value={imageInputs[index] ?? ""}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={editingProduct?.categoryId ?? product.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingProduct}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              value={editingProduct?.subtypeId ?? product.subtypeId}
              onChange={(e) => handleInputChange("subtypeId", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingProduct}
            >
              {subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
