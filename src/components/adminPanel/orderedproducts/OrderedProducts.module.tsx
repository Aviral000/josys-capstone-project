import React, { useState } from "react";
import Swal from "sweetalert2";
import { useOrder } from "../../../customs/hooks/useOrder";

interface Order {
    id?: string;
    customerId: string;
    status: string;
    items: OrderItem[];
}

interface OrderItem {
    productId: string;
    quantity: number;
}

const OrderedProducts: React.FC = () => {
  const { orders, isFetchingOrders, isFetchError, fetchError, updateOrder } = useOrder();
  const [updatedStatus, setUpdatedStatus] = useState<Record<string, string>>({});

  const handleStatusChange = (orderId: string, status: string) => {
    setUpdatedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleSaveStatus = (order: Order) => {
    const status = updatedStatus[order.id!] || order.status;

    if (!order.id) {
        console.error("Order ID is undefined");
        return;
    }

    const { id, ...updates } = { ...order, status };

    updateOrder.mutate(
      { id: order.id, updates },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Status Updated",
            text: "Order status updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        },
        onError: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: error.message || "Could not update order status.",
            timer: 2000,
            showConfirmButton: false,
          });
        },
      }
    );
  };

  if (isFetchingOrders) return <div>Loading orders...</div>;
  if (isFetchError) return <div>Error fetching orders: {fetchError?.message}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ordered Products</h2>
      {orders?.length ? (
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">Customer ID</th>
              <th className="border border-gray-300 p-2">Items</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.customerId}</td>
                <td className="border border-gray-300 p-2">
                  {order.items.map((item) => (
                    <div key={item.productId}>
                      <strong>Product ID:</strong> {item.productId}, <strong>Quantity:</strong> {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 p-2">
                <select
                    value={order.id ? updatedStatus[order.id] || order.status : ""}
                    onChange={(e) => order.id && handleStatusChange(order.id, e.target.value)}
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleSaveStatus(order)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrderedProducts;
