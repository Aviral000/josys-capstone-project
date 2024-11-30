import React, { useContext, useState } from "react";
import { useCart } from "../../customs/hooks/useCart";
import { customerContext } from "../../contextAPI/customers/createContext";
import { useCustomer } from "../../customs/hooks/useCustomer";
import Swal from "sweetalert2";
import { useProduct } from "../../customs/hooks/useProduct";
import { Customer } from "../../models/Customer.type";
import { useOrder } from "../../customs/hooks/useOrder";
import { Order } from "../../models/Order.type";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { userId, cartId } = useContext(customerContext);
  const { cart, updateCart } = useCart(cartId);
  const { customer, updateCustomer } = useCustomer(userId);
  const { products } = useProduct();
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const cartItems = cart?.items.map((cartItem) => {
    const product = products?.find((p) => p.id === cartItem.productId);
    return {
      id: cartItem.productId,
      quantity: cartItem.quantity,
      name: product?.productName || "Unknown Product",
      price: (product?.cost || 0) - ((product?.cost || 0) * (product?.discount || 0)) / 100,
      originalPrice: product?.cost || 0,
      image: product?.images[0] || "https://via.placeholder.com/150",
    };
  }) || [];

  const cartObj = cartItems.map((item) => {
    return {
        productId: item.id,
        quantity: item.quantity
    }
  })

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
    Swal.fire({
      icon: "info",
      title: `Payment Method Selected`,
      text: `You have selected ${method}.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleAddAddress = () => {
    const customerObj: Customer = {
      name: customer?.name || "",
      addressIds: address,
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      phoneNumber: customer?.phoneNumber || "",
      email: customer?.email || "",
      password: customer?.password || "",
      roleId: customer?.roleId || "",
      cartId: customer?.cartId || "",
    };
  
    updateCustomer.mutate(
      { id: userId, updates: customerObj },
      {
        onSuccess: () => {
          setAddress("");
          Swal.fire({
            icon: "success",
            title: "Address Updated",
            text: "Your address has been successfully updated!",
            timer: 2000,
            showConfirmButton: false,
          });
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message || "Something went wrong while updating your address.",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      }
    );
  };
  

  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;


    const handlePlaceOrder = () => {
        if (!customer?.id || !cartId || cartItems.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Order Failed",
            text: "Cart is empty or customer information is missing.",
            timer: 2000,
            showConfirmButton: false,
          });
          return;
        }
      
        const createOrderObj: Order = {
          customerId: customer.id,
          items: cartObj,
          status: "pending",
        };
      
        createOrder.mutate(createOrderObj, {
          onSuccess: () => {
            const emptyCart = {
              id: cartId,
              items: [],
            };
      
            updateCart.mutate(
              { id: cartId, updates: emptyCart },
              {
                onSuccess: () => {
                  Swal.fire({
                    icon: "success",
                    title: "Order Placed",
                    text: "Your order has been successfully placed!",
                    timer: 3000,
                    showConfirmButton: false,
                  }).then(() => {
                    navigate('/thank-you');
                  });
                },
                onError: (error: any) => {
                  Swal.fire({
                    icon: "error",
                    title: "Cart Update Failed",
                    text: error.message || "Could not clear the cart.",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                },
              }
            );
          },
          onError: (error) => {
            Swal.fire({
              icon: "error",
              title: "Order Failed",
              text: error.message || "Something went wrong while placing the order.",
              timer: 2000,
              showConfirmButton: false,
            });
          },
        });
      };
      

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-bold">CONTACT</h2>
            <input
              type="email"
              value={customer?.email || ""}
              readOnly
              className="w-full border p-3 rounded-md mt-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold">ADDRESS</h2>
            <textarea
              rows={3}
              placeholder="Enter your delivery address"
              className="w-full border p-3 rounded-md mt-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <button
                onClick={handleAddAddress}
                className="bg-zinc-900 text-white py-2 px-4 rounded-md mt-4 hover:bg-zinc-800"
            >
                {customer?.addressIds ? 'Update Address' : 'Add Address'}
            </button>
          </div>

          {customer?.addressIds &&<div>
            <span className="text-2xl font-semibold pr-3">✓ Address</span><span className="font-bold pr-3">: </span><span className="text-teal-800 text-balance font-medium">{customer?.addressIds}</span>
          </div>}

          <div className="mb-6 mt-6">
            <h2 className="text-lg font-bold">PAYMENT</h2>
            <div className="grid gap-4 mt-4">
              <div
                className={`border p-4 rounded-md cursor-pointer ${
                  paymentMethod === "UPI" ? "border-blue-500" : ""
                }`}
                onClick={() => handlePaymentSelection("UPI")}
              >
                <h3 className="font-semibold">UPI</h3>
                <p className="text-sm text-gray-500">
                  Pay using your UPI ID or scan the QR code for payment.
                </p>
              </div>
              <div
                className={`border p-4 rounded-md cursor-pointer ${
                  paymentMethod === "PayPal" ? "border-blue-500" : ""
                }`}
                onClick={() => handlePaymentSelection("PayPal")}
              >
                <h3 className="font-semibold">PayPal</h3>
                <p className="text-sm text-gray-500">
                  Use your PayPal account to complete the payment securely.
                </p>
              </div>
              <div
                className={`border p-4 rounded-md cursor-pointer ${
                  paymentMethod === "COD" ? "border-blue-500" : ""
                }`}
                onClick={() => handlePaymentSelection("COD")}
              >
                <h3 className="font-semibold">Cash on Delivery</h3>
                <p className="text-sm text-gray-500">
                  Pay with cash when your order is delivered.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">YOUR CART</h2>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Items:</p>
            <p className="text-sm">{totalItems} item(s)</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Total Price:</p>
            <p className="text-sm">₹{totalPrice.toFixed(2)}</p>
          </div>
          <div className="border-t pt-4">
            {cartItems?.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handlePlaceOrder} className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
