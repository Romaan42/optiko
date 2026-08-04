import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Banner() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Copy */}
                    <div className="lg:col-span-7">
                        <span className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3 block">Autumn / Winter '26</span>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
                            Vision Without <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-900">
                                Compromise.
                            </span>
                        </h1>
                        <p className="text-lg text-neutral-600 mb-8 max-w-lg">
                            Premium eyewear crafted from sustainable acetates and aerospace-grade titanium. Engineered for clarity, curated for character.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all focus:ring-4 focus:ring-neutral-200">
                                Shop the Collection
                            </Link>
                            <Link href="/virtual-try-on" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-neutral-900 bg-white border border-neutral-200 rounded-full hover:border-neutral-900 hover:bg-neutral-50 transition-all">
                                Virtual Try-On
                            </Link>
                        </div>
                    </div>

                    {/* Right Hero Image Frame */}
                    <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://res.cloudinary.com/druroxxha/image/upload/v1785841546/banner_xmmgcq.jpg"
                            fill
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                            alt="Optiko Brand Model wearing minimalist eyeglasses"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <button className="text-xs font-semibold tracking-wider uppercase opacity-75">Featured Frame</button>
                            <p className="text-lg font-bold">The Horizon — Gold & Amber</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
