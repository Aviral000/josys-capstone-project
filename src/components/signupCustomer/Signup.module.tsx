import React, { useState } from "react";
import { Customer } from "../../models/Customer.type";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  doPasswordsMatch,
  isStrongPassword,
  isValidEmail,
  isValidPhoneNumber,
} from "./Signup.validator";
import back1 from "../../assets/main/bg-4.webp";
import { useCustomer } from "../../customs/hooks/generic/useCustomer";

type FormData = {
  firstName: string;
  lastName: string,
  email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
  
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm_password: "",
  });
  const { create } = useCustomer();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid phone number. It should start with 6-9 and be 10 digits long.",
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

    const { confirm_password, ...customerData } = formData;
    const newCustomer: Customer = {
      ...customerData,
      id: uuidv4(),
      name: `${customerData.firstName} ${customerData.lastName}`,
      roleId: "3",
      addressIds: "",
      cartId: "",
    };

    create.mutate(newCustomer, {
      onSuccess: () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        navigate("/user-login");
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
        style={{ backgroundImage: `url(${back1})` }}
      />
      <div className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-60 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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
