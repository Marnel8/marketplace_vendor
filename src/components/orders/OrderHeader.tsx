import { Order } from "@/utils/orderUtils";
import type React from "react";

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
      Order Details
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Order Code: {order.orderCode}
    </p>
  </div>
);
