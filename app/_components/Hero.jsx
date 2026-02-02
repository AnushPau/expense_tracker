import React from 'react'
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-white lg:h-screen lg:grid lg:place-content-center">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* LEFT: TEXT */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Take money into your own
              <strong className="text-indigo-600"> HANDS </strong>
              
            </h1>

            <p className="mt-4 text-base text-gray-700 sm:text-lg">
              Track expenses, understand spending patterns, and take control
              of your finances.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="/sign-in"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
              >
                Start Saving
              </a>

              
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex justify-center">
            <Image
              src="/overviewimg.avif"
              alt="Expense tracking overview illustration"
              width={400}
              height={400}
              priority
              className="rounded-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}



export default Hero
