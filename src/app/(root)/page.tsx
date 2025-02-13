import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UnderConstructionPage from "@/components/UnderConstructionPage";

export const metadata: Metadata = {
  title: "BatStateU Marketplace",
  description: "This is BatStateU Marketplace Vendors Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <UnderConstructionPage />
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
