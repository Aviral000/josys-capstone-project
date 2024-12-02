import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useVendor } from "../../../customs/hooks/useVendor";
import { VendorContext } from "../../../contextAPI/vendors/CreateContext";

const VP: React.FC = () => {
  const { vendorId } = useContext(VendorContext);
  const { vendor, isFetchingVendor, isFetchErrorId, fetchErrorId, updateVendor } = useVendor(vendorId);
  const [editingVendor, setEditingVendor] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    if (!editingVendor) return;
    setEditingVendor((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editingVendor) return;

    const { id, roleId, verified, ...editableFields } = editingVendor;

    updateVendor.mutate(
      { id, updates: { ...editableFields, roleId, verified } },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Vendor Updated",
            text: "Vendor details updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setEditingVendor(null);
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message || "Could not update vendor details.",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      }
    );
  };

  if (isFetchingVendor) return <div>Loading vendor details...</div>;
  if (isFetchErrorId) return <div>Error loading vendor: {fetchErrorId?.message}</div>;

  if (!vendor) return <div>No vendor data found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Vendor Profile Management</h2>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">{vendor.companyName}</h3>
        <p className="text-sm text-gray-500 mb-4">Vendor ID: {vendor.id}</p>

        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={editingVendor?.companyName ?? vendor.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingVendor}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={editingVendor?.email ?? vendor.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingVendor}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={editingVendor?.address ?? vendor.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingVendor}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={editingVendor?.phoneNumber ?? vendor.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={!editingVendor}
            />
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {editingVendor ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingVendor(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditingVendor(vendor)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VP;
