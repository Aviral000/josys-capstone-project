import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminContext } from "../../contextAPI/admins/CreateContextAdmin";
import AdminVerify from "./adminVerification/AdminVerify.module";
import PBV from "./productsbyvendor/PBV.module";
import DA from "./disciplinaryAction/DA.module";
import AM from "./advertisementManagement/AM.module";
import OrderedProducts from "./orderedproducts/OrderedProducts.module";
import AllActions from "./allActions/AllActions.module";
import RequestedBanner from "./Request for Banner/RequestedBanner.module";

const AdminPanel: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Vendor Verifications");
  const { logout } = useContext(adminContext);
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
          toast: true
        });
      }
    });
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Vendor Verifications":
        return <AdminVerify />;
      case "Ordered Products":
        return <OrderedProducts />
      case "Products by Vendor":
        return <PBV />;
      case "Disciplinary Actions":
        return <DA />;
      case "Ads Request":
        return <RequestedBanner />;
      case "Advertisement Banner":
        return <AM />;
      case "All Actions":
          return <AllActions />;
      default:
        return <div>Select an option to see details.</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-200">
          Admin Panel
        </h2>
        <ul className="space-y-2 p-4">
          {["Vendor Verifications", "Products by Vendor", "Ordered Products", "Disciplinary Actions", "Ads Request", "Advertisement Banner", "All Actions"].map(
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

export default AdminPanel;
