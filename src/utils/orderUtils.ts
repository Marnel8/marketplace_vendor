export enum OrderStatus {
  PENDING = "pending",
  TO_BE_PICKED_UP = "to pick up",
  CONFIRMED = "confirmed",
  APPROVED = "approved",
  SUCCESS = "success",
  CANCELLED = "cancelled",
  DENIED = "denied",
}

export const getStatusColor = (status: OrderStatus) => {
  const colors = {
    [OrderStatus.PENDING]:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
    [OrderStatus.TO_BE_PICKED_UP]:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    [OrderStatus.CONFIRMED]:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
    [OrderStatus.APPROVED]:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
    [OrderStatus.SUCCESS]:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    [OrderStatus.CANCELLED]:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
    [OrderStatus.DENIED]:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
  };
  return colors[status];
};

export interface Order {
  id: string;
  orderCode: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  item: {
    name: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
}
