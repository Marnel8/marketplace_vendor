import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Save, ChevronDown } from "lucide-react";
import { getStatusColor, type Order, OrderStatus } from "@/utils/orderUtils";

interface StatusActionsProps {
  order: Order;
  currentStatus: OrderStatus;
  onStatusChange: (status: string) => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean | undefined;
}

export const StatusActions: React.FC<StatusActionsProps> = ({
  isSaving,
  order,
  currentStatus,
  onStatusChange,
  onSave,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between border-t pt-4 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Status:
        </span>
        <div className="relative" ref={selectRef}>
          <button
            type="button"
            className={`flex w-30 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium capitalize shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(currentStatus)}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {currentStatus}
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180 transform" : ""}`}
            />
          </button>
          {isOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="listbox"
            >
              {Object.values(OrderStatus).map((status) => (
                <li
                  key={status}
                  className={`relative cursor-pointer select-none py-2 pl-3 pr-9 capitalize hover:bg-blue-100 ${
                    currentStatus === status
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  }`}
                  onClick={() => {
                    onStatusChange(status);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={currentStatus === status}
                >
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="rounded-md  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-transparent dark:text-bodydark1"
        >
          Close
        </button>
        <button
          disabled={isSaving}
          onClick={onSave}
          className="flex items-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
