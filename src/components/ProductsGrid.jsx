import React from "react";
import AddToCart from "./AddToCart";
import Link from "next/link";
import ClImage from "./ClImage";

export default function ProductsGrid({ products }) {
  return (
    <main className="lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          // Outer div ab normal div hai, isse nesting conflict khatam ho jayega
          <div key={product._id} className="group cursor-pointer flex flex-col">
            {/* Image Container (Iske andar Link aur AddToCart alag hain) */}
            <div className="relative aspect-4/3 bg-neutral-100 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-8">
              {/* Sirf Image par click karne se product page khulega */}
              <Link
                href={`/product/${product.slug}`}
                className="absolute inset-0 z-0"
              >
                <ClImage
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  quality={50}
                  removeBackground
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="max-w-full max-h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* AddToCart button ab link ke upar (z-10) hai taaki click karne par alag se chale */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-end p-4">
                <div className="w-full pointer-events-auto">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>

            {/* Title aur Price Section */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wider uppercase">
                  {product.category} • {product.shape}
                </p>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-base font-bold text-neutral-900 hover:text-blue-600 transition-colors"
                >
                  {product.title}
                </Link>
              </div>
              <span className="font-semibold text-neutral-950">
                Rs: {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
