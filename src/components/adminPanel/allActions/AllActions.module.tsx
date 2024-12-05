import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAction, getAllActions } from "../../../services/Action.service";
import type { Actions } from "../../../models/Action.type";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const AllActions = () => {
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["actions"],
    queryFn: getAllActions,
  });

  const { mutate: handleDelete } = useMutation({
    mutationFn: async (id: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        return deleteAction(id);
      }
      
      return Promise.reject("Delete cancelled by user");
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "The action has been deleted successfully.",
        icon: "success",
        timer: 1500
      });
      queryClient.invalidateQueries({ queryKey: ["actions"] });
    },
    onError: (error) => {
      if (error.message === "Delete cancelled by user") {
        return;
      }
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the action.",
        icon: "error",
      });
      console.error("Failed to delete action:", error);
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
        All Vendor Reports
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Complaint ID</th>
              <th className="px-6 py-3">Uploaded Date</th>
              <th className="px-6 py-3">Corrections</th>
              <th className="px-6 py-3">Actions</th>
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
                <td className="px-6 py-4">{complaint.uploadedDate}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={complaint.customerAction}
                    disabled
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-not-allowed opacity-60"
                    aria-label={`Complaint ${complaint.id} correction status`}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(complaint.id!)}
                    className="text-red-600 hover:text-red-800 transition-colors focus:outline-none"
                    aria-label={`Delete complaint ${complaint.id}`}
                  >
                    <Trash2 className="h-5 w-5" />
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

export default AllActions;