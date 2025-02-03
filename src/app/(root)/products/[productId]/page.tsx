import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductDetails from "./product-details";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

const sampleProduct = {
  id: "123",
  name: "iPhone 13 Pro Max",
  description:
    "The latest iPhone with pro camera system, A15 Bionic chip, and Super Retina XDR display with ProMotion.",
  variant: "256GB / Graphite",
  category: "ELECTRONICS",
  price: 89990,
  thumbnail: "/placeholder.svg?height=600&width=600",
  brand: "Apple",
  rating: 4.8,
  quantity: 15,
  images: [
    { id: "1", url: "/placeholder.svg?height=600&width=600" },
    { id: "2", url: "/placeholder.svg?height=600&width=600" },
    { id: "3", url: "/placeholder.svg?height=600&width=600" },
    { id: "4", url: "/placeholder.svg?height=600&width=600" },
    { id: "5", url: "/placeholder.svg?height=600&width=600" },
  ],
  vendor: {
    name: "Official Apple Store",
    rating: 4.9,
  },
};

export const metadata: Metadata = {
  title: "Product Details Page",
  description: "This is Product Details Page for Spartans Marketplace Vendors",
};

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Details" />
      <ProductDetails productId={productId} />
    </DefaultLayout>
  );
}
