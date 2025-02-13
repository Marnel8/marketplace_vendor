import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductDetails from "./product-details";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

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
