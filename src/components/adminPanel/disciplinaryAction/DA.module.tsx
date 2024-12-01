import React, { useState } from "react";
import debounce from "lodash/debounce";
import { useVendor } from "../../../customs/hooks/useVendor";

const DA: React.FC = () => {
  const { vendors } = useVendor();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredVendor, setFilteredVendor] = useState<any | null>(null);
  const [complaintType, setComplaintType] = useState<string>("");
  const [complaintDetails, setComplaintDetails] = useState<string>("");

  const handleSearch = debounce((term: string) => {
    if (!term) {
      setFilteredVendor(null);
      return;
    }

    const foundVendor = vendors?.find((vendor) =>
      vendor.companyName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredVendor(foundVendor || null);
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleSubmitComplaint = () => {
    if (!filteredVendor) return;

    console.log("Complaint Submitted", {
      vendorId: filteredVendor.id,
      complaintType,
      complaintDetails,
    });

    alert(`Complaint submitted for ${filteredVendor.companyName}`);
    setComplaintType("");
    setComplaintDetails("");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Disciplinary Actions</h2>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a company..."
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {filteredVendor && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold">{filteredVendor.companyName}</h3>
          <p>
            <strong>Email:</strong> {filteredVendor.email}
          </p>
          <p>
            <strong>Phone:</strong> {filteredVendor.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {filteredVendor.address}
          </p>
          <p>
            <strong>Verified:</strong> {filteredVendor.verified ? "Yes" : "No"}
          </p>
        </div>
      )}

      {filteredVendor && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Submit a Complaint</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Complaint Type</label>
            <input
              type="text"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              placeholder="Enter complaint type..."
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Complaint Details</label>
            <textarea
              value={complaintDetails}
              onChange={(e) => setComplaintDetails(e.target.value)}
              placeholder="Enter complaint details..."
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            ></textarea>
          </div>
          <button
            onClick={handleSubmitComplaint}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Complaint
          </button>
        </div>
      )}
    </div>
  );
};

export default DA;
