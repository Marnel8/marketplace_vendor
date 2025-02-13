"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useDeleteOrder, useGetAllOrders } from "@/hooks/useOrders";
import { getStatusColor, type OrderStatus } from "@/utils/orderUtils";
import toast from "react-hot-toast";
import MiniSpinner from "../spinner/mini-spinner";
import { OrderDetailsModal } from "../orders/OrderDetails";

const OrdersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const {
    data: orders,
    isFetching: isOrdersFetching,
    refetch,
  } = useGetAllOrders();

  const { mutateAsync: deleteOrder, isPending: isDeleting } = useDeleteOrder();

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      toast.success("Order deleted!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data.message || "Failed to delete order");
    }
  };

  if (isOrdersFetching) return <MiniSpinner />;

  const handleSave = (orderId: string, newStatus: OrderStatus) => {
    console.log(`Saving order ${orderId} with new status: ${newStatus}`);
    refetch();
  };

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full">
        <table className="w-full overflow-x-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="hidden max-w-[50px] px-4 py-4 font-medium text-black dark:text-white md:block">
                Order Code
              </th>
              <th className="max-w-[70px] px-4 py-4 font-medium text-black dark:text-white">
                Product
              </th>
              <th className="max-w-[70px] px-4 py-4 font-medium text-black dark:text-white">
                Buyer
              </th>
              <th className="max-w-[70px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="max-w-[70px] px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order: any, key: number) => (
                <tr
                  key={key}
                  className="border-t border-stroke dark:border-strokedark"
                >
                  <td className="hidden px-4 py-5 md:block">
                    <p className="text-black dark:text-white">
                      {order.orderCode}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <h5 className="font-medium text-black dark:text-white">
                      {order.item.name}
                    </h5>
                    <p className="text-sm">
                      ₱{order.totalPrice.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-black dark:text-white">
                      {order.user.firstName} {order.user.lastName}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary-dark text-primary"
                        onClick={() => openModal(order)}
                        aria-label="View order details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="hover:text-danger-dark text-danger"
                        onClick={() => handleDelete(order.id)}
                        aria-label="Delete order"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onSave={handleSave}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrdersTable;
