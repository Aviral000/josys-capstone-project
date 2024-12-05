import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VendorContext } from "../../../contextAPI/vendors/CreateContext";
import Swal from "sweetalert2";
import { createRequest } from "../../../services/Request.service";
import { Request } from "../../../models/Request.type";

const RequestAd: React.FC = () => {
  const quertClient = useQueryClient();
  const { vendorId } = useContext(VendorContext);
  const [bannerNum, setBannerNum] = useState("1");
  const [bannerDesc, setBannerDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation<Request, Error, Omit<Request, "id">>({
    mutationFn: createRequest,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Request Submitted",
        text: "Your advertisement request has been submitted successfully!",
        timer: 3000,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
      });
      quertClient.invalidateQueries({ queryKey: ['requests'] })
      setBannerNum("1");
      setBannerDesc("");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit the request. Please try again.",
        timer: 3000,
        toast: true,
        position: "top-right",
        showConfirmButton: false,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    mutation.mutate(
      {
        vendorId,
        bannerNum,
        bannerDesc,
      },
      {
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Request Advertisement Banner
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="vendorId" className="block text-sm font-medium text-gray-700">
            Vendor ID
          </label>
          <input
            id="vendorId"
            type="text"
            value={vendorId}
            readOnly
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Banner Number */}
        <div className="space-y-2">
          <label htmlFor="bannerNum" className="block text-sm font-medium text-gray-700">
            Select Banner Number
          </label>
          <select
            id="bannerNum"
            value={bannerNum}
            onChange={(e) => setBannerNum(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">Banner 1</option>
            <option value="2">Banner 2</option>
            <option value="3">Banner 3</option>
          </select>
        </div>

        {/* Banner Description */}
        <div className="space-y-2">
          <label htmlFor="bannerDesc" className="block text-sm font-medium text-gray-700">
            Banner Description
          </label>
          <textarea
            id="bannerDesc"
            value={bannerDesc}
            onChange={(e) => setBannerDesc(e.target.value)}
            placeholder="Enter banner description..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestAd;
