"use client";
import { useState, FormEvent } from "react";
import Modal from "./custom-modal";

interface FormData {
  name: string;
  email: string;
}

export default function AddProductModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Handle form submission
      //   await submitForm(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        Add New Product
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Product Form"
        description="Please fill out the form below to add new prodcuct"
        primaryButton={{
          text: isSubmitting ? "Adding..." : "Add Product",
          onClick: handleSubmit,
          disabled: isSubmitting,
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: () => setIsModalOpen(false),
          disabled: isSubmitting,
        }}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
