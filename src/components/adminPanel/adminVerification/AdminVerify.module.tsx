import React from "react";
import Swal from "sweetalert2";
import { useVendor } from "../../../customs/hooks/useVendor";

const AdminVerify: React.FC = () => {
  const { vendors, isFetchingVendors, isFetchError, fetchError, updateVendor } = useVendor();

  const handleVerification = (vendor: any, verified: boolean) => {
    const updatedVendor = { ...vendor, verified };

    updateVendor.mutate(
      { id: vendor.id, updates: updatedVendor },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: `${vendor.companyName} has been ${verified ? "verified" : "unverified"}`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'bottom-right'
          });
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: `Failed to update vendor verification`,
            text: error.message,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'bottom-right'
          });
        },
      }
    );
  };

  if (isFetchingVendors) {
    return <div>Loading vendors...</div>;
  }

  if (isFetchError) {
    return <div>Error fetching vendors: {fetchError?.message}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Vendor Verification</h2>
      <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Company Name</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
            <th className="px-4 py-2 border-b text-left">Phone Number</th>
            <th className="px-4 py-2 border-b text-left">Verified</th>
            <th className="px-4 py-2 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors?.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{vendor.companyName}</td>
              <td className="px-4 py-2 border-b">{vendor.email}</td>
              <td className="px-4 py-2 border-b">{vendor.phoneNumber}</td>
              <td className="px-4 py-2 border-b">{vendor.verified ? "Yes" : "No"}</td>
              <td className="px-4 py-2 border-b text-center">
                <input
                  type="checkbox"
                  checked={vendor.verified}
                  onChange={(e) => handleVerification(vendor, e.target.checked)}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVerify;
