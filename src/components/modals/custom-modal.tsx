import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  primaryButton = { text: "Submit", onClick: () => {} },
  secondaryButton = { text: "Cancel", onClick: () => {} },
  description,
}) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
        onClick={handleModalClick}
      >
        {/* Content Container */}
        <div className="space-y-4 p-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
          </div>

          {/* Form Content */}
          <div className="space-y-4">{children}</div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={secondaryButton.onClick}
              disabled={secondaryButton.disabled}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {secondaryButton.text}
            </button>
            <button
              onClick={primaryButton.onClick}
              disabled={primaryButton.disabled}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {primaryButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
