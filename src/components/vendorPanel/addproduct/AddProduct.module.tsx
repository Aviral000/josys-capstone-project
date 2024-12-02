import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useSubCategory } from "../../../customs/hooks/useSubCategory";
import { useCategory } from "../../../customs/hooks/useCategory";
import { useProduct } from "../../../customs/hooks/useProduct";
import { VendorContext } from "../../../contextAPI/vendors/CreateContext";
import { Product } from "../../../models/Product.type";

const AddProduct: React.FC = () => {
  const { createProduct } = useProduct();
  const { subCategories } = useSubCategory();
  const { categories } = useCategory();
  const { vendorId } = useContext(VendorContext);

  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    productName: "",
    productDesc: "",
    cost: 0,
    vendorId: vendorId,
    stock: 0,
    discount: 0,
    images: ["", "", "", "", ""],
    categoryId: "",
    subtypeId: "",
    uploadedDate: ""
  });

  const handleInputChange = (field: string, value: string | number) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSave = () => {
    const { productName, productDesc, cost, stock, categoryId, subtypeId, images } = newProduct;

    if (!productName || !productDesc || !cost || !stock || !categoryId || !subtypeId) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields before saving.",
      });
      return;
    }

    const filteredImages = images.filter((image) => image.trim() !== "");

    createProduct.mutate(
      { ...newProduct, images: filteredImages },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Product Added",
            text: "Product added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setNewProduct({
            id: "",
            productName: "",
            productDesc: "",
            cost: 0,
            vendorId: vendorId,
            stock: 0,
            discount: 0,
            images: ["", "", "", "", ""],
            categoryId: "",
            subtypeId: "",
            uploadedDate: ""
          });
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Add Product Failed",
            text: error.message || "Could not add product.",
          });
        },
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={newProduct.productName}
            onChange={(e) => handleInputChange("productName", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newProduct.productDesc}
            onChange={(e) => handleInputChange("productDesc", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost</label>
            <input
              type="number"
              value={newProduct.cost === 0 ? "" : newProduct.cost}
              onChange={(e) => handleInputChange("cost", Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={newProduct.stock === 0 ? "" : newProduct.stock}
              onChange={(e) => handleInputChange("stock", Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={newProduct.discount === 0 ? "" : newProduct.discount}
              onChange={(e) => handleInputChange("discount", Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-medium">Product Images</h3>
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">{`Image ${index + 1}`}</label>
              <input
                type="text"
                value={newProduct.images[index] ?? ""}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newProduct.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              value={newProduct.subtypeId}
              onChange={(e) => handleInputChange("subtypeId", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subcategory</option>
              {subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
