"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  BadgeQuestionMark,
  CreditCard
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard"
    },
    {
      id: 2,
      name: "Budget",
      icon: PiggyBank,
      path: "/dashboard/budgets"
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses"
    },
    {
      id: 4,
      name: "Cards", //NEW TAB
      icon: CreditCard,
      path: "/dashboard/cards"
    },
    {
      id: 5,
      name: "FAQs",
      icon: BadgeQuestionMark,
      path: "/dashboard/faqs"
    }

  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-md flex flex-col justify-between">
      <div>
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={100}
          height={100}
        />

        <div className="mt-5">
          {menuList.map((menu) => (
            <Link key={menu.id} href={menu.path}>
              <div
                className={`flex gap-2 items-center text-gray-700 font-medium p-5 cursor-pointer rounded-md transition-all
                hover:text-primary hover:bg-blue-50
                ${path === menu.path ? "text-primary bg-blue-100" : ""}`}
              >
                <menu.icon className="h-5 w-5" />
                {menu.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 🔹 Profile section */}
      <div className="p-5 flex gap-2 items-center border-t">
        <UserButton />
        <span className="text-sm">Profile</span>
      </div>
    </div>
  );
}

export default SideNav;