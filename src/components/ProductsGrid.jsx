import React from 'react'
import AddToCart from './AddToCart'
import Link from 'next/link'

export default function ProductsGrid({ products }) {
    return (
        <main className="lg:col-span-3" >

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product._id} className="group cursor-pointer">
                        <div className="relative aspect-4/3 bg-neutral-100 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-8">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="max-w-full max-h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Hover Overlay */}
                            <AddToCart product={product} />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-neutral-500 mb-1 font-medium tracking-wider uppercase">
                                    {product.category} • {product.shape}
                                </p>
                                <Link href={`/product/${product._id}`} className="text-base font-bold">{product.title}</Link>
                            </div>
                            <span className="font-semibold text-neutral-950">Rs: {product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main >
    )
}
