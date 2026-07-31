import LoadingProducts from '@/components/home/Loading';
import ProductsGrid from '@/components/ProductsGrid';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Suspense } from 'react';

export default async function Collections() {
    try {
        const res = await fetch(`${process.env.BASE_URL}/api/products`)
        if (!res.ok) {
            return (
                <div className='min-h-screen w-full flex justify-center items-center'>
                    <h1 className='text-red-500 font-bold'>error while loading products</h1>
                </div>
            )
        }
        const result = await res.json()

        if (!result.success) {
            return (
                <div className='min-h-screen w-full flex justify-center items-center'>
                    <h1 className='text-red-500 font-bold'>error while loading products</h1>
                </div>
            )
        }

        return (
            <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">

                    {/* Controls Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <button className="flex lg:hidden items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm font-bold">
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>
                        <p className="hidden lg:block text-sm text-neutral-500 font-medium">Showing {result?.products.length} frames</p>

                        <div className="relative">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-bold hover:border-neutral-900 transition-colors">
                                Sort By: Featured <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Collections Content Area */}
                    <div className="lg:grid lg:grid-cols-4 gap-10 items-start">
                        {/* Sidebar Filters (Desktop Only) */}
                        <aside className="hidden lg:block space-y-8 sticky top-24">
                            {/* Filter Group: Category */}
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider mb-4 text-neutral-400">Category</h3>
                                <div className="space-y-3">
                                    {['All Frames', 'Optical', 'Sunglasses'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4.5 h-4.5 border-neutral-300 rounded focus:ring-0 accent-neutral-900" />
                                            <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-neutral-200" />

                            {/* Filter Group: Shape */}
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider mb-4 text-neutral-400">Frame Shape</h3>
                                <div className="space-y-3">
                                    {['Round', 'Square', 'Aviator', 'Cat-Eye'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4.5 h-4.5 border-neutral-300 rounded focus:ring-0 accent-neutral-900" />
                                            <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-neutral-200" />


                            <div>
                                <h3 className="text-sm font-black uppercase tracking-wider mb-4 text-neutral-400">Material</h3>
                                <div className="space-y-3">
                                    {['Mazzucchelli Acetate', 'Titanium', 'Stainless Steel'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4.5 h-4.5 border-neutral-300 rounded focus:ring-0 accent-neutral-900" />
                                            <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>
                        <Suspense fallback={<LoadingProducts />}>
                            <ProductsGrid products={result?.products} />
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className='min-h-screen w-full flex justify-center items-center'>
                <h1 className='text-red-500 font-bold'>error while loading products</h1>
            </div>
        )
    }

}