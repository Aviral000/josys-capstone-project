import React, { useState } from "react";
import Swal from "sweetalert2";
import { useCustomer } from "../../customs/hooks/useCustomer";

const CustomerProfile: React.FC = () => {
  const userId = localStorage.getItem('userId') || "";
  const { customer, isFetchingCustomer, isFetchError, fetchError, updateCustomer } = useCustomer(userId);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const handleInputChange = (field: string, value: string | number) => {
    if (!editingCustomer) return;

    setEditingCustomer((prev: any) => {
      const updatedCustomer = { ...prev, [field]: value };

      if (field === "firstName" || field === "lastName") {
        updatedCustomer.name = `${updatedCustomer.firstName || ""} ${updatedCustomer.lastName || ""}`.trim();
      }

      return updatedCustomer;
    });
  };

  const handleSave = () => {
    if (!editingCustomer) return;

    const { id, ...editableFields } = editingCustomer;

    updateCustomer.mutate(
      { id: userId, updates: editableFields },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Customer details updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          setEditingCustomer(null);
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message || "Could not update profile details.",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      }
    );
  };

  if (isFetchingCustomer) return <div>Loading customer details...</div>;
  if (isFetchError) return <div>Error fetching customer: {fetchError?.message}</div>;
  if (!customer) return <div>No customer data found.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={editingCustomer?.firstName ?? customer.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={!editingCustomer}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={editingCustomer?.lastName ?? customer.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={!editingCustomer}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={editingCustomer?.email ?? customer.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={!editingCustomer}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={editingCustomer?.phoneNumber ?? customer.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={!editingCustomer}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={editingCustomer?.addressIds ?? customer.addressIds}
            onChange={(e) => handleInputChange("addressIds", e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows={2}
            disabled={!editingCustomer}
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        {editingCustomer ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditingCustomer(null)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditingCustomer(customer)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
