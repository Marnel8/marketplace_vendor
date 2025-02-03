"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useAddImages, useCreateProduct } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import MiniSpinner from "../spinner/mini-spinner";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const { mutateAsync: addProduct, isPending: isAddProductPending } =
    useCreateProduct();
  const { mutateAsync: addImages, isPending: isAddImagesPending } =
    useAddImages();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setThumbnail(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleAdditionalImageDrag = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleAdditionalImageDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newImages = [...additionalImages];
      newImages[index] = e.dataTransfer.files[0];
      setAdditionalImages(newImages);
    }
  };

  const handleAdditionalImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newImages = [...additionalImages];
      newImages[index] = e.target.files[0];
      setAdditionalImages(newImages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      category,
      stock,
      price,
      thumbnail,
    };

    try {
      const response = await addProduct(productData);

      toast.success("Item added successfully!");

      if (response) {
        const imageFiles = Array.from(additionalImages);
        await addImages({ images: imageFiles, itemId: response.data?.id });
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
        setThumbnail(null);
        setAdditionalImages([]);
      }
    } catch (error: any) {
      toast.error("Error adding item:", error.message);
      return;
    }
  };

  const resetFields = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory("");
    setThumbnail(null);
    setAdditionalImages([]);
  };

  const categories = [
    "food",
    "beverage",
    "electronics",
    "fashion",
    "home and garden",
    "beauty",
    "toys",
    "books",
    "sports",
    "other",
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex flex-col gap-5.5 p-6.5 md:w-[50%]">
          <div>
            <label className="field-label">Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Product Name"
              className="input-field"
            />
          </div>
          <div>
            <label className="field-label">Select Category</label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                className={`select-field capitalize`}
                onChange={(e) => setCategory(e.target.value)}
                // value={category}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select Category
                </option>
                {categories.map((cat, i) => (
                  <option
                    key={i}
                    value={cat}
                    className="capitalize text-body dark:text-bodydark"
                  >
                    {cat}
                  </option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="field-label">Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              rows={6}
              placeholder="Description"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-secondary active:border-secondary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-secondary"
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="w-full">
              <label className="field-label">Price</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder="Price"
                className="input-field"
              />
            </div>
            <div className="w-full">
              <label className="field-label">Quantity</label>
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                type="number"
                placeholder="Quantity"
                className="input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5 md:w-[50%]">
          <div>
            <label className="field-label">Product Image</label>
            <div
              className={`relative flex min-h-[200px] items-center justify-center rounded-lg border-[1.5px] border-dashed border-stroke bg-transparent transition ${
                dragActive ? "border-secondary" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-3 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7FD]">
                  <Upload className="h-5 w-5 text-secondary" />
                </span>
                <p className="text-sm text-gray-500">
                  <span className="text-secondary">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  {setThumbnail
                    ? setThumbnail.name
                    : "SVG, PNG, JPG or GIF (max. 800x400px)"}
                </p>
              </div>
              <input
                type="file"
                className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>
          <div>
            <label className="field-label">Additional Images</label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative flex h-32 items-center justify-center rounded-lg border-[1.5px] border-dashed border-stroke bg-transparent transition hover:border-secondary"
                  onDragEnter={(e) => handleAdditionalImageDrag(e, index)}
                  onDragLeave={(e) => handleAdditionalImageDrag(e, index)}
                  onDragOver={(e) => handleAdditionalImageDrag(e, index)}
                  onDrop={(e) => handleAdditionalImageDrop(e, index)}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F7FD]">
                      <Upload className="h-4 w-4 text-secondary" />
                    </span>
                    <p className="text-xs text-gray-500">
                      {additionalImages[index]
                        ? additionalImages[index]?.name
                        : "Upload image"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                    onChange={(e) => handleAdditionalImageChange(e, index)}
                    accept="image/*"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end border p-2 dark:border-none">
        <div className="flex gap-3 p-4">
          <button
            type="button"
            onClick={resetFields}
            className="min-w-[150px] flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isAddProductPending || isAddImagesPending}
            className="min-w-[150px] flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAddProductPending || isAddImagesPending ? (
              <MiniSpinner />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
