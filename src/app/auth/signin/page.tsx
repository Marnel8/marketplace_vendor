import React from "react";

import { Metadata } from "next";
import SignInForm from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Marketplace Vendor Signin Page",
  description:
    "This is Marketplace Signin Page for Marketplace Vendors Dashboard",
};

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SignInForm />
    </div>
  );
};

export default SignIn;
