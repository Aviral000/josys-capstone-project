import React, { useState } from "react";
import { useBanner } from "../../../customs/hooks/useBanner";
import Swal from 'sweetalert2';

const AM: React.FC = () => {
  const {
    data: banners,
    isLoading,
    isError,
    error,
    updateBanner,
    isUpdating,
    resetBanner,
    isResetting,
  } = useBanner();

  const [editingBanners, setEditingBanners] = useState(() =>
    banners ? [...banners] : []
  );

  const handleInputChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setEditingBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, [field]: value } : banner
      )
    );
  };

  const handleSave = (id: string) => {
    const updatedBanner = editingBanners.find((banner) => banner.id === id);
    if (updatedBanner) {
      updateBanner({ id, bannerData: updatedBanner });
    }
    Swal.fire({
        icon: 'success',
        title: 'Saved Successfully',
        text: 'The banner details have been updated successfully!',
        timer: 3000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
    });
  };

  const handleReset = () => {
    resetBanner();
  };

  if (isLoading) return <div>Loading banners...</div>;
  if (isError) return <div>Error loading banners: {error?.message}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Advertisement Management</h2>

      {banners[0] && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Banner 1</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <input
              type="text"
              value={editingBanners[0]?.discount || ""}
              onChange={(e) =>
                handleInputChange("1", "discount", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discount"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editingBanners[0]?.description || ""}
              onChange={(e) =>
                handleInputChange("1", "description", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              rows={4}
            ></textarea>
          </div>

          <button
            onClick={() => handleSave("1")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {banners[1] && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Banner 2</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={editingBanners[1]?.heading || ""}
              onChange={(e) =>
                handleInputChange("2", "heading", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter heading..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <input
              type="text"
              value={editingBanners[1]?.discount || ""}
              onChange={(e) =>
                handleInputChange("2", "discount", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discount..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editingBanners[1]?.description || ""}
              onChange={(e) =>
                handleInputChange("2", "description", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description..."
              rows={4}
            ></textarea>
          </div>

          <button
            onClick={() => handleSave("2")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {banners[2] && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Banner 3</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              value={editingBanners[2]?.heading || ""}
              onChange={(e) =>
                handleInputChange("3", "heading", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter heading..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <input
              type="text"
              value={editingBanners[2]?.discount || ""}
              onChange={(e) =>
                handleInputChange("3", "discount", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discount..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editingBanners[2]?.description || ""}
              onChange={(e) =>
                handleInputChange("3", "description", e.target.value)
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description..."
              rows={4}
            ></textarea>
          </div>

          <button
            onClick={() => handleSave("3")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        disabled={isResetting}
      >
        {isResetting ? "Resetting..." : "Reset All to Default"}
      </button>
    </div>
  );
};

export default AM;