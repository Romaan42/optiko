import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductsGrid from '../ProductsGrid';

export default async function FeaturedProducts() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/products`)
        if (!res.ok) {
            return (
                <div className='flex justify-center items-center py-10'>
                    <h1 className='text-red-500 font-bold'>error while loading products</h1>
                </div>
            )
        }
        const result = await res.json()



        return (
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
                            <p className="text-neutral-500">Handcrafted frames designed to turn heads.</p>
                        </div>
                        <Link href="/shop" className="hidden sm:flex items-center text-sm font-bold hover:underline">
                            View All <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                    <ProductsGrid products={result.products || []} />
                </div>
            </section>
        )
    } catch (error) {
        return (
            <div className='flex justify-center items-center py-10'>
                <h1 className='text-red-500 font-bold'>error while loading products</h1>
            </div>
        )
    }

}
