import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Truck, RotateCcw, Shield, Package } from "lucide-react";
import { useProduct } from "../../customs/hooks/useProduct";
import { useCustomer } from "../../customs/hooks/useCustomer";
import { customerContext } from "../../contextAPI/customers/createContext";
import { useCart } from "../../customs/hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { product, isFetchingProduct, fetchErrorId } = useProduct(id);
  const { customer, isFetchingCustomer } = useCustomer();
  const { userId, cartId } = useContext(customerContext);
  const { cart, updateCart } = useCart(cartId);

  console.log(cartId);

  const handleAddToCart = async () => {
    if (!cartId) {
      alert("Cart not found!");
      return;
    }
  
    const newItem = {
      productId: product?.id!,
      quantity: quantity,
    };
  
    const updatedItems = [...(cart?.items || [])];
    const existingItemIndex = updatedItems.findIndex(
      (item) => item.productId === newItem.productId
    );
  
    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      updatedItems.push(newItem);
    }
  
    const updatedCart = { customerId: userId ,items: updatedItems };
  
    try {
      await updateCart.mutateAsync({ id: cartId, updates: updatedCart });
      navigate('/cart');
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart. Please try again.");
    }
  };
  

  if (isFetchingProduct || isFetchingCustomer) return <div>Loading...</div>;
  if (fetchErrorId) return <div>Error: {fetchErrorId.message}</div>;

  const features = [
    { icon: Truck, text: "Free Delivery", color: "text-blue-500" },
    { icon: Package, text: "Cash/Pay on Delivery", color: "text-orange-500" },
    { icon: RotateCcw, text: "10 days Returnable", color: "text-green-500" },
    { icon: Shield, text: "7 Day Warranty", color: "text-purple-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <img
              src={product!.images[selectedImage]}
              alt={product!.productName}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {product!.images.map((image, index) => (
              <div
                key={index}
                className={`border rounded-md overflow-hidden cursor-pointer ${
                  selectedImage === index ? "ring-2 ring-blue-500" : ""
                }`}
                onMouseOver={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product!.productName}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-blue-600 hover:underline cursor-pointer">
                #1 Best Seller
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold">
                ₹{(product!.cost - (product!.cost * product!.discount) / 100).toFixed(2)}
              </span>
              <span className="text-gray-500 line-through">₹{product!.cost}</span>
              <span className="text-red-600">({product!.discount}% off)</span>
            </div>
            <p className="text-green-600">Inclusive of all taxes</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md p-2"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg transition-colors"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;