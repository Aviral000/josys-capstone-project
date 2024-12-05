import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { VendorContext } from "../../contextAPI/vendors/CreateContext";
import VP from "./vendorProfile/VP.module";
import VendorProducts from "./vendorproducts/VendorProduct";
import AddProduct from "./addproduct/AddProduct.module";
import Reports from "./reports/Reports.module";
import RequestAd from "./requestad/RequestAd.module";

const VendorPanel: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Vendor Profile");
  const { logout } = useContext(VendorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    });
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Vendor Profile":
        return <VP />;
      case "Vendor's Products":
        return <VendorProducts />;
      case "Add new Product":
        return <AddProduct />;
      case "Request for Advertisement":
        return <RequestAd />;
      case "Against Reports":
        return <Reports />;
      default:
        return <div>Select an option to see details.</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-200">
          Vendor Panel
        </h2>
        <ul className="space-y-2 p-4">
          {["Vendor Profile", "Vendor's Products", "Add new Product", "Request for Advertisement", "Against Reports"].map(
            (option) => (
              <li
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  selectedOption === option
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-200 text-gray-800"
                }`}
              >
                {option}
              </li>
            )
          )}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-4">{selectedOption}</h2>
        <div className="bg-white shadow-md rounded-lg p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default VendorPanel;
