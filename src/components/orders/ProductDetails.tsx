import type React from "react";
import Image from "next/image";
import { Order } from "@/utils/orderUtils";
import { getImageUrl } from "@/utils/imageUtils";

interface ProductDetailsProps {
  order: Order;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ order }) => (
  <div className="space-y-4">
    <h3 className="font-medium text-gray-900 dark:text-white">
      Product Details
    </h3>
    <div className="flex gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <Image
        src={getImageUrl(order.item.thumbnail) || "/placeholder.svg"}
        alt={order.item.name}
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">
          {order.item.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Quantity: {order.quantity}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          ₱{order.totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);
