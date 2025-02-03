import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddProductForm from "@/components/Forms/add-product";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Products Page",
  description: "This is Products Page for Spartans Marketplace Vendors",
};

const AddProductPage = () => {
  return (
    <DefaultLayout>
      {" "}
      <div className="mx-auto ">
        <Breadcrumb pageName="Add Product" />
        <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <AddProductForm />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddProductPage;
