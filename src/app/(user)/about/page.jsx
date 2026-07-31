import React from 'react';
import { Sparkles, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Our Philosophy</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
                    Intelligent design. Exceptional clarity.
                </h1>
                <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto font-medium leading-relaxed">
                    We believe eyewear is the most intimate expression of personal style. Our frames are meticulously engineered for those who view the world through a lens of refined minimalism.
                </p>
            </div>

            {/* Split Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] bg-neutral-200 rounded-3xl overflow-hidden shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=1200"
                            alt="Artisan designing eyewear blueprints"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The Evolution of Form & Function</h2>
                        <p className="text-neutral-600 leading-relaxed font-medium">
                            Founded with a rebellious spirit and a lofty objective: to offer designer eyewear at a revolutionary price, while leading the way for socially conscious business practices.
                        </p>
                        <p className="text-neutral-600 leading-relaxed font-medium">
                            Every silhouette we create passes through an extensive development phase, balancing architectural lines with ergonomic engineering. We don’t mass produce; we craft small, intentional batches built to outlast seasonal trends.
                        </p>
                        <div className="pt-4">
                            <a href="/collections" className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                                Explore the Frames <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Material Spotlight Grid */}
            <div className="bg-white border-y border-neutral-200 my-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16">
                        <h3 className="text-sm font-black uppercase tracking-wider text-neutral-400 mb-2">Uncompromising Materiality</h3>
                        <p className="text-2xl font-bold tracking-tight">Sourced Globally. Refined Locally.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Material 1 */}
                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-neutral-200 mb-6 shadow-sm">
                                <Layers className="w-5 h-5 text-neutral-700" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Mazzucchelli Acetate</h4>
                            <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                                Our bio-acetate is custom formulated by the heritage Italian house of Mazzucchelli. Derived from cotton fibers, it yields vibrant depth of color and unmatched structural flexibility.
                            </p>
                        </div>

                        {/* Material 2 */}
                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-neutral-200 mb-6 shadow-sm">
                                <Sparkles className="w-5 h-5 text-neutral-700" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Japanese Titanium</h4>
                            <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                                Used primarily in our minimalist optical lines, ultra-lightweight titanium offers the highest strength-to-weight ratio of any metal, finished with hypoallergenic plating.
                            </p>
                        </div>

                        {/* Material 3 */}
                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-neutral-200 mb-6 shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-neutral-700" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">Precision Optics</h4>
                            <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                                Our sunglasses feature scratch-resistant CR-39 lenses with 100% UVA/UVB protection and backside anti-reflective coatings for absolute sensory comfort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-neutral-900 text-white rounded-3xl px-6 py-16 md:py-24 max-w-5xl mx-auto relative overflow-hidden shadow-xl">
                    <div className="relative z-10 max-w-xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Find Your Perspective</h2>
                        <p className="text-neutral-400 font-medium mb-8 text-sm sm:text-base">
                            Discover the frame profiles designed to perfectly complement your facial architecture. Free continental shipping and effortless 30-day returns.
                        </p>
                        <button className="px-6 py-3.5 bg-white text-neutral-900 font-bold rounded-xl text-sm transition-transform hover:scale-[1.02] shadow-md">
                            Browse the Collection
                        </button>
                    </div>
                    {/* Subtle design accent background graphics */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-800 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>
                </div>
            </div>
        </div>
    );
}