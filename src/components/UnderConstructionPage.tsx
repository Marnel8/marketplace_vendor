import { AlertTriangle } from "lucide-react";
import React from "react";

const UnderConstructionPage = () => {
  return (
    <div className="mb-10 bg-primary px-4 py-6 shadow-lg dark:bg-boxdark ">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-3 ">
        <AlertTriangle className="h-6 w-6 animate-pulse text-white dark:text-primary" />
        <p className="text-center font-medium text-white dark:text-primary">
          We're working hard to improve this page. Check back soon for exciting
          updates!
        </p>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
