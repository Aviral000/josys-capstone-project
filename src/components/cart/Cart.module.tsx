import React from "react";

const Cart: React.FC = () => {
  const cartItems = [
    {
      id: 1,
      name: "GYM+TRAINING SMALL LOGO HOODIE",
      color: "Black / White",
      size: "XL",
      quantity: 1,
      price: 1840,
      originalPrice: 4599,
      image: "https://via.placeholder.com/150",
    },
  ];

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">YOUR BAG</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="border-b pb-4 mb-4">
            <p>
              TOTAL ({totalItems} item{totalItems > 1 ? "s" : ""}) ₹{totalPrice}
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
                <p className="text-sm text-gray-500">{item.color}</p>
                <p className="text-sm text-gray-500">SIZE: {item.size}</p>
              </div>
              <div className="flex flex-col items-center">
                <select
                  defaultValue={item.quantity}
                  className="border p-2 rounded-md text-sm w-16"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 font-bold mt-2">₹{item.price}</p>
                <p className="text-gray-500 line-through text-sm">₹{item.originalPrice}</p>
              </div>
              <button className="text-red-500 text-sm font-bold ml-4 hover:underline">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-1/3 border rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Original price</p>
            <p className="text-sm">₹4599</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Delivery</p>
            <p className="text-sm text-green-600">Free</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-red-500">On Sale</p>
            <p className="text-sm text-red-500">- ₹759</p>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <p className="font-medium">Total (Inclusive of all taxes)</p>
              <p className="font-bold">₹{totalPrice}</p>
            </div>
          </div>
          <button className="w-full bg-black text-white py-2 mt-4 rounded-md hover:bg-gray-800">
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
