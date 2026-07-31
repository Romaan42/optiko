import Link from "next/link";
import { Star, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { notFound } from "next/navigation";
import ProductsGrid from '@/components/ProductsGrid';
import ProductGallery from "@/components/ProductsGallery";
import AddToCart from "@/components/DetailAddToCart";


// Server-side fetch functions
async function getProduct(id) {
    const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getSuggestedProducts(category, excludeId) {
    const res = await fetch(
        `${process.env.BASE_URL}/api/products`,
        { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
}

// Next.js 15 Server Component
export default async function ProductDetail({ params }) {
    // In Next.js 15 Server Components, params is a Promise that must be awaited
    const { id } = await params;

    // Fetch data directly on the server (no useEffect needed)
    const productData = await getProduct(id);

    // Automatically trigger Next.js 404 page if not found
    if (!productData || !productData.success) {
        notFound();
    }

    const product = productData.product;
    const suggested = await getSuggestedProducts(product.category, product._id);

    // Static reviews for now
    const reviews = [
        { name: "Ahmad", rating: 5, comment: "Quality is amazing. Fit is perfect!", date: "2 days ago" },
        { name: "Sara", rating: 4, comment: "Looks exactly like in picture. Fast delivery.", date: "1 week ago" },
    ];
    const avgRating = reviews.length > 0 ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;

    return (
        <div className="min-h-screen bg-white pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="text-sm text-neutral-500 mb-8">
                    <Link href="/" className="hover:text-neutral-900">Home</Link> <span>/</span>
                    <Link href="/collections" className="hover:text-neutral-900"> Collections</Link> <span>/</span>
                    <span className="text-neutral-900 font-medium">{product.title}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">

                    {/* Left: Interactive Client Gallery */}
                    <ProductGallery images={product.images} title={product.title} />

                    {/* Right: Info - Sticky */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-4xl font-black tracking-tight mb-3">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} className={i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"} />
                                ))}
                            </div>
                            <Link href="#reviews" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
                                {avgRating.toFixed(1)} ({reviews.length} reviews)
                            </Link>
                        </div>

                        <p className="text-4xl font-black mb-6">Rs. {product.price.toLocaleString()}</p>

                        {/* Stock Badge */}
                        <div className="flex items-center gap-2 mb-6 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                            <Check size={16} /> In Stock - Ready to Ship
                        </div>

                        <p className="text-neutral-600 leading-relaxed mb-8">{product.description}</p>

                        {/* Client Component injected here safely */}
                        <AddToCart product={product} />

                        {/* Trust Badges - Fixed missing 'grid' class */}
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-neutral-600">
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl">
                                <Truck size={20} className="text-neutral-900" /> Free Shipping
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl">
                                <Shield size={20} className="text-neutral-900" /> 1 Year Warranty
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl">
                                <RotateCcw size={20} className="text-neutral-900" /> Easy Returns
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-neutral-200 mb-20" />

                {/* Reviews Section */}
                <div id="reviews" className="mb-20">
                    <h2 className="text-3xl font-black mb-8">Customer Reviews</h2>
                    <div className="space-y-6">
                        {reviews.map((rev, i) => (
                            <div key={i} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-bold text-lg">{rev.name}</p>
                                    <p className="text-xs text-neutral-500">{rev.date}</p>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"} />
                                    ))}
                                </div>
                                <p className="text-neutral-700">{rev.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suggested Products */}
                {/* {suggested.length > 0 && ( */}
                <div>
                    <h2 className="text-3xl font-black mb-8">You Might Also Like</h2>
                    <ProductsGrid products={suggested} />
                </div>
                {/* )} */}

            </div>
        </div>
    );
}