import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => {
          const isActive =
            pathname === item.route || pathname?.startsWith(`${item.route}/`);

          return (
            <li
              key={index}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-primary ${
                isActive ? "text-primary" : ""
              }`}
            >
              <Link href={item.route}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SidebarDropdown;
