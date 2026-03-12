"use client"
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-white min-h-screen flex items-center">
      <div className="mx-auto max-w-[1600px] w-full px-8 py-20 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          <div>
            <h1 className="text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Take money into your own
              <strong className="text-indigo-600"> HANDS </strong>
            </h1>

            <p className="mt-6 text-lg text-gray-700 sm:text-xl lg:text-2xl max-w-2xl">
              Track expenses, understand spending patterns, and take control
              of your finances.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href={isSignedIn ? "/dashboard" : "/sign-in"}
                className="inline-block rounded-lg border border-indigo-600 bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Start Saving
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/moneyfumbl.jpg"
              alt="Expense tracking overview illustration"
              width={800}
              height={800}
              priority
              className="rounded-lg w-full max-w-[800px] h-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero