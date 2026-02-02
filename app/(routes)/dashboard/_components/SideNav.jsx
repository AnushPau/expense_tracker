"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import { PiggyBank } from 'lucide-react';
import { ReceiptText } from 'lucide-react';
import { BadgeQuestionMark } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
    const menuList=[
      {
        id:1,
        name:"Dashboard",
        icon: LayoutGrid,
        path:'/dashboard'
      },
      {
        id:2,
        name:"Budget",
        icon: PiggyBank,
        path:'/dashboard/budgets'
      },
      {
        id:3,
        name:"Expenses",
        icon: ReceiptText,
        path:'/dashboard/expenses'
      },
      {
        id:4,
        name:"FAQs",
        icon: BadgeQuestionMark,
        path:'/dashboard/faqs'
      }
    ]

    const path = usePathname();

    useEffect(() => {
      console.log(path);
    }, [path]);

  return (
    <div className='h-screen p-5 border shadow-md'>
      <Image
        src={'/logo.svg'}
        alt="Logo"
        width={100}
        height={100}
      />

      <div className='mt-5'>
        {menuList.map((menu) => (
          <Link href={menu.path}> 
            <h2
              key={menu.id}
              className={`flex gap-2 items-center text-gray-700 font-medium p-5 cursor-pointer rounded-md
              hover:text-primary hover:bg-blue-50
              ${path === menu.path ? 'text-primary bg-blue-100' : ''}`}
            >
              <menu.icon className="h-5 w-5"/>
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton/>
        Profile
      </div>
    </div>
  )
}

export default SideNav
