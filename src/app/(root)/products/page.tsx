import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductsTable from "@/components/Tables/TableTwo";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop Products Page",
  description: "This is Products Page for Spartans Marketplace Vendors",
};

const ProductsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto ">
        <Breadcrumb pageName="Products" />
        <div>
          <ProductsTable />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductsPage;
