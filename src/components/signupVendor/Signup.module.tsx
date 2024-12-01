import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  doPasswordsMatch,
  isStrongPassword,
  isValidEmail,
  isValidPhoneNumber,
} from "./Signup.validator";
import vgback1 from "../../assets/main/v-bg-1.webp";
import { Vendor } from "../../models/Vendor.type";
import { useVendor } from "../../customs/hooks/generic/useVendor";

type FormData = {
  companyName: string;
  email: string;
  password: string;
  confirm_password: string;
  address: string;
  phoneNumber: string;
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    phoneNumber: ""
  });
  const { create } = useVendor();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid email format",
        showConfirmButton: false,
        timer: 5000,
        toast: true
      });
      return;
    }

    if(!isValidPhoneNumber(formData.phoneNumber)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid phone Number, please start from 6 to 9, should contain 10 digits",
        showConfirmButton: false,
        timer: 5000,
        toast: true
      });
      return;
    }

    if (!isStrongPassword(formData.password)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        showConfirmButton: false,
        timer: 5000,
        toast: true
      });
      return;
    }

    if (!doPasswordsMatch(formData.password, formData.confirm_password)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 5000,
        toast: true
      });
      return;
    }

    const { confirm_password, ...vendorData } = formData;
    const newVendor: Omit<Vendor, 'id'> = {
      ...vendorData,
      roleId: "2",
      verified: false
    };

    await create.mutateAsync(newVendor, {
      onSuccess: () => {
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Your vendor request has been sent, please wait for Verification",
          showConfirmButton: false,
          timer: 4000,
          toast: true
        });
        navigate("/");
      },
      onError: (error: any) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 5000,
          toast: true
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: `url(${vgback1})` }}
      />
      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={create.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {create.isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
