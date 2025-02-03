import { Order } from "@/utils/orderUtils";
import type React from "react";

interface CustomerDetailsProps {
  order: Order;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({ order }) => (
  <div className="space-y-4">
    <h3 className="font-medium text-gray-900 dark:text-white">
      Customer Details
    </h3>
    <div className="space-y-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <p className="text-sm">
        <span className="text-gray-500 dark:text-gray-400">Name: </span>
        <span className="text-gray-900 dark:text-white">
          {order.user.firstName} {order.user.lastName}
        </span>
      </p>
      <p className="text-sm">
        <span className="text-gray-500 dark:text-gray-400">Email: </span>
        <span className="text-gray-900 dark:text-white">
          {order.user.email}
        </span>
      </p>
      <p className="text-sm">
        <span className="text-gray-500 dark:text-gray-400">Order Date: </span>
        <span className="text-gray-900 dark:text-white">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </p>
    </div>
  </div>
);
