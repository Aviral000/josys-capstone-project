import React, { useContext, useState } from "react";
import { useCart } from "../../customs/hooks/useCart";
import { customerContext } from "../../contextAPI/customers/createContext";
import { useProduct } from "../../customs/hooks/useProduct";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cartId } = useContext(customerContext);
  const { cart, updateCart, deleteCartItem } = useCart(cartId);
  const { products } = useProduct();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<Record<string, number>>(
    cart?.items.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {}) || {}
  );

  const cartItems = cart?.items.map((cartItem) => {
    const product = products?.find((p) => p.id === cartItem.productId);
    return {
      id: cartItem.productId,
      quantity: quantities[cartItem.productId] || cartItem.quantity,
      name: product?.productName || "Unknown Product",
      price: (product?.cost || 0) - ((product?.cost || 0) * (product?.discount || 0)) / 100,
      originalPrice: product?.cost || 0,
      image: product?.images[0] || "https://via.placeholder.com/150",
    };
  }) || [];

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    const updatedItems = cartItems.map((item) =>
      item.id === productId
        ? { productId: item.id, quantity: newQuantity }
        : { productId: item.id, quantity: item.quantity }
    );

    const updatedCart = { items: updatedItems };

    updateCart.mutate({ id: cartId!, updates: updatedCart });
  };

  const handleDeleteItem = (productId: string) => {
    if (!cartId) return;
  
    deleteCartItem.mutate(
      { cartId, productId },
      {
        onSuccess: () => {
          setQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[productId];
            return newQuantities;
          });
  
          const updatedItems = cartItems.filter((item) => item.id !== productId);
  
          Swal.fire({
            position: "bottom-right",
            icon: "success",
            title: "Item deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
            toast: true
          });
  
          updateCart.mutate({ id: cartId, updates: { items: updatedItems.map((item) => ({ productId: item.id, quantity: item.quantity })) } });
        },
        onError: (error) => {
          console.error("Error deleting item:", error);
          Swal.fire({
            position: "bottom-right",
            icon: "error",
            title: "Failed to delete item. Please try again.",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      }
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">YOUR BAG</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="border-b pb-4 mb-4">
            <p>
              TOTAL ({totalItems} item{totalItems > 1 ? "s" : ""}) ₹{totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Items in your bag are not reserved — check out now to make them yours.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-medium">BLACK FRIDAY IS HERE!</p>
            <p className="text-sm">
              Get extra 20% off on total purchase of INR 4999 or more * (Maximum discount of INR 1500)
            </p>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">SIZE: Not Available</p>
              </div>
              <div className="flex flex-col items-center">
                <select
                  value={quantities[item.id] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                  className="border p-2 rounded-md text-sm w-16"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 font-bold mt-2">₹{item.price.toFixed(2)}</p>
                <p className="text-gray-500 line-through text-sm">
                  ₹{item.originalPrice.toFixed(2)}
                </p>
              </div>
              <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 text-sm font-bold ml-4 hover:underline">
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3 border rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Original price</p>
            <p className="text-sm">
              ₹{cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Delivery</p>
            <p className="text-sm text-green-600">Free</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-red-500">On Sale</p>
            <p className="text-sm text-red-500">
              - ₹{cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0).toFixed(2)}
            </p>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <p className="font-medium">Total (Inclusive of all taxes)</p>
              <p className="font-bold">₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800">
            CHECKOUT
          </button>
          <button className="text-sm mt-2 text-blue-500 underline w-full text-center">
            USE A PROMO CODE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
