"use client";

import type { Order, OrderStatus } from "@/utils/orderUtils";
import type React from "react";
import { useState, useEffect } from "react";
import { OrderHeader } from "./OrderHeader";
import { CustomerDetails } from "./CustomerDetails";
import { ProductDetails } from "./ProductDetails";
import { StatusActions } from "./StatusActions";
import { useUpdateOrderStatus } from "@/hooks/useOrders";
import toast from "react-hot-toast";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderId: string, newStatus: OrderStatus) => void;
  order: Order;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const { mutateAsync: updateStatus, isPending: isUpdatePending } =
    useUpdateOrderStatus();

  useEffect(() => {
    setCurrentStatus(order.status);
  }, [order]);

  if (!isOpen) return null;

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status as OrderStatus);
  };

  const handleSave = async () => {
    try {
      await updateStatus({ id: order.id, status: currentStatus });
      onSave(order.id, currentStatus);
      toast.success("The order status has been updated");
      onClose();
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl bg-white shadow-xl dark:bg-boxdark"
        onClick={handleModalClick}
      >
        <div className="space-y-6 p-6">
          <OrderHeader order={order} />

          <div className="grid gap-6 md:grid-cols-2">
            <ProductDetails order={order} />
            <CustomerDetails order={order} />
          </div>

          <StatusActions
            isSaving={isUpdatePending}
            order={order}
            currentStatus={currentStatus}
            onStatusChange={handleStatusChange}
            onSave={handleSave}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};
