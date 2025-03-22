"use client";
import React from "react";
import "./orderStyle.css";
import CustomButton from "@/components/shared/custom-btn";

const orders = [
  { id: 1, orderId: "ORD1001", plan: "Custom Weekly", orderStatus: "Processing", paymentStatus: "Paid", totalAmount: "$30.00", deliveryDate: "2025-03-20" },
  { id: 2, orderId: "ORD1002", plan: "My Monthly", orderStatus: "Completed", paymentStatus: "Paid", totalAmount: "$120.00", deliveryDate: "2025-03-15"  },
  { id: 3, orderId: "ORD1003", plan: "One-time (For Guests)", orderStatus: "Pending", paymentStatus: "Unpaid", totalAmount: "$18.50", deliveryDate: "2025-03-22" },
  { id: 4, orderId: "ORD1004", plan: "Custom Weekly", orderStatus: "Canceled", paymentStatus: "Refunded", totalAmount: "$28.00", deliveryDate: "2025-03-18"},
];

const Order = () => {
  return (

    <div>
    <h3 style={{ fontSize: "20px" }}>Your Orders</h3>
    <div className="overflow-x-auto rounded-xl mt-4">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-4 py-3 text-left">S.NO</th>
            <th className="px-4 py-3 text-left">Order ID</th>
            <th className="px-4 py-3 text-left">Plan</th>
            <th className="px-4 py-3 text-left">Order Status</th>
            <th className="px-4 py-3 text-left">Payment Status</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Delivery Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                 <td className="px-4 py-3 text-gray-700">{index + 1}</td>
              {/* Order ID */}
              <td className="px-4 py-3 text-gray-700">{order.orderId}</td>

              {/* Plan */}
              <td className="px-4 py-3 text-gray-700">{order.plan}</td>

              {/* Order Status with Badge */}
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.orderStatus === "Completed" ? "bg-green-100 text-green-600" : order.orderStatus === "Pending" ? "bg-yellow-100 text-yellow-600" : order.orderStatus === "Canceled" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  {order.orderStatus}
                </span>
              </td>

              {/* Payment Status with Badge */}
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-600" : order.paymentStatus === "Unpaid" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                  {order.paymentStatus}
                </span>
              </td>

              {/* Total Amount */}
              <td className="px-4 py-3 text-gray-800 font-medium">{order.totalAmount}</td>

              {/* Delivery Date */}
              <td className="px-4 py-3 text-gray-600">{order.deliveryDate}</td>

              {/* Action Button */}
              <td className="px-4 py-3">
                <CustomButton
                onClick={() => alert(`Viewing details for Order ID: ${order.orderId}`)}
                label="View Detail"
                className="px-3 py-1"
                >
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Order;


