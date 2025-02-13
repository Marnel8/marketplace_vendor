"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Eye, Pencil, Trash2, Share2 } from "lucide-react";
import {
  useDeleteProduct,
  useGetProductByID,
  useUpdateProduct,
} from "@/hooks/useProducts";
import MiniSpinner from "@/components/spinner/mini-spinner";
import { getImageUrl } from "@/utils/imageUtils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    variant: string;
    category: string;
    price: number;
    thumbnail: string;
    brand: string;
    rating: number;
    quantity: number;
    images: { id: string; url: string }[];
    vendor: {
      name: string;
      rating: number;
    };
  };
  onEdit?: () => void;
}

export default function ProductDetails({ productId }: { productId: string }) {
  const { data: product, isFetching: isProductDetailsFetching } =
    useGetProductByID(productId);

  const [selectedImage, setSelectedImage] = useState(getImageUrl(null));

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail);
      setQuantity(product.quantity.toString());
    }
  }, [product]);

  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct();

  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

  const router = useRouter();

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);

      toast.success("Product Deleted.");
      router.back();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  if (isProductDetailsFetching) return <MiniSpinner />;

  const handleEditProduct = async () => {
    try {
      const productData = {
        id: product.id,
        stock: Number(quantity),
      };

      await updateProduct(productData);

      toast.success("Product Updated.");
    } catch (error) {
      toast.error("Failed to edit product");
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto ">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Image Gallery */}
          <div className="w-full space-y-4 lg:w-3/5">
            <div className="bg-muted relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={
                  getImageUrl(selectedImage) || "/images/best-value-banner.png"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              <button
                onClick={() => setSelectedImage(product.thumbnail)}
                className={`relative aspect-square overflow-hidden rounded-lg border ${
                  selectedImage === product.thumbnail
                    ? "border-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <Image
                  src={
                    getImageUrl(product.thumbnail) ||
                    "/images/best-value-banner.png"
                  }
                  alt={`Product view ${product.name}`}
                  fill
                  className="object-cover"
                />
              </button>
              {product &&
                product.images.map((image: { id: string; url: string }) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`relative aspect-square overflow-hidden rounded-lg border ${
                      selectedImage === image.url
                        ? "border-primary"
                        : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <Image
                      src={
                        getImageUrl(image.url) ||
                        "/images/best-value-banner.png"
                      }
                      alt={`Product view ${image.id}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full space-y-6 lg:w-2/5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gray-200 px-2.5 py-1.5 text-xs font-medium capitalize text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">
                By {product.vendor.businessName}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">
                {product.rating} out of 5
              </span>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  ₱{product.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      product.quantity > 10
                        ? "rounded-full bg-green-100 px-4 py-1 text-green-800 dark:border-form-strokedark dark:bg-form-input dark:text-bodydark1"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    Stock: {product.quantity}
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="variant" className="text-sm font-medium">
                    Current Variant
                  </label>
                  <select
                    id="variant"
                    defaultValue={product.variant}
                    className="select-field"
                  >
                    <option value={product.variant}>{product.variant}</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Current Stock
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="select-field"
                  >
                    {[...Array(300)].map((_, i) => (
                      <option key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEditProduct}
                  disabled={isUpdating}
                  className="border-spartans-red text-spartans-red hover:bg-spartans-red/10 inline-flex flex-1 items-center justify-center rounded-md border px-4 py-2"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  {isUpdating ? "Updating item..." : "Edit Product"}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50"
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? "Deleting item..." : "Delete"}
                </button>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

            <div className="space-y-2 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Product Statistics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Last updated:{" "}
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="hover:text-spartans-red p-2 text-gray-600">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
