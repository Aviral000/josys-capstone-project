import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllRequest, deleteRequest } from "../../../services/Request.service";
import Swal from "sweetalert2";

const RequestedBanner: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: requests, isLoading, isError, error } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRequest,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Requests'] });
      Swal.fire({
        icon: "success",
        title: "Request Approved",
        text: "The request has been approved and removed successfully.",
        timer: 3000,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: `Failed to approve the request: ${error.message}`,
        timer: 3000,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
      });
    },
  });

  const handleApprove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once approved, this request will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="ml-4 text-blue-500 font-medium">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-8 text-red-500 font-semibold text-lg">
        Error: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Requested Banners
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Request ID</th>
              <th className="px-6 py-3">Vendor ID</th>
              <th className="px-6 py-3">Banner Number</th>
              <th className="px-6 py-3">Banner Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((request, index) => (
              <tr
                key={request.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-50`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {request.id}
                </td>
                <td className="px-6 py-4">{request.vendorId}</td>
                <td className="px-6 py-4">{request.bannerNum}</td>
                <td className="px-6 py-4">{request.bannerDesc}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleApprove(request.id!)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBanner;
