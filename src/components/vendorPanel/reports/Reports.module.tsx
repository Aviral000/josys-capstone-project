import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getActionsByVendorId, updateAction } from "../../../services/Action.service";
import { VendorContext } from "../../../contextAPI/vendors/CreateContext";
import type { Actions } from "../../../models/Action.type";
import Swal from "sweetalert2";

const Reports = () => {
  const { vendorId } = useContext(VendorContext);
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["actions", vendorId],
    queryFn: () => getActionsByVendorId(vendorId),
    enabled: !!vendorId,
  });

  const { mutate: handleCheckboxChange } = useMutation({
    mutationFn: async ({ id, obj }: { id: string; obj: Actions }) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You have done all the changes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const updatedObj = {
          ...obj,
          customerAction: !obj.customerAction
        };
        return updateAction(id, updatedObj);
      }
      
      return Promise.reject("Update cancelled by user");
    },
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "The action has been updated successfully.",
        icon: "success",
        timer: 1500
      });
      queryClient.invalidateQueries({ queryKey: ["actions", vendorId] });
    },
    onError: (error) => {
      if (error.message === "Update cancelled by user") {
        return;
      }
      Swal.fire({
        title: "Error!",
        text: "Failed to update the action.",
        icon: "error",
      });
      console.error("Failed to update action:", error);
    }
  });

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500 font-semibold text-lg">
        Please try again later. {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="ml-4 text-blue-500 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Vendor Reports
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Complaint ID</th>
              <th className="px-6 py-3">Complaint Type</th>
              <th className="px-6 py-3">Complaint Details</th>
              <th className="px-6 py-3">Uploaded Date</th>
              <th className="px-6 py-3">Corrections</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((complaint: Actions, index: number) => (
              <tr
                key={complaint.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-50`}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {complaint.id}
                </td>
                <td className="px-6 py-4">{complaint.complaintType}</td>
                <td className="px-6 py-4">{complaint.complaintDetails}</td>
                <td className="px-6 py-4">{complaint.uploadedDate}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={complaint.customerAction}
                    onChange={(e) =>
                      handleCheckboxChange({
                        id: complaint.id!,
                        obj: complaint,
                      })
                    }
                    className="cursor-pointer w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    aria-label={`Mark complaint ${complaint.id} as corrected`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;