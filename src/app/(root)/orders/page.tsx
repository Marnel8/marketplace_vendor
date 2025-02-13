import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersTable from "@/components/Tables/TableThree";
import TableThree from "@/components/Tables/TableThree";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop Orders Page",
  description: "This is Orders Page for Spartans Marketplace Vendors",
};

const OrdersPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Orders" />
        <div>
          <OrdersTable />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrdersPage;
