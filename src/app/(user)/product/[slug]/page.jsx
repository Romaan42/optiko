import Link from "next/link";
import { Star, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { notFound } from "next/navigation";
import ProductsGrid from '@/components/ProductsGrid';
import ProductGallery from "@/components/ProductsGallery";
import AddToCart from "@/components/DetailAddToCart";
import ProductReviews from "@/components/ReviewsSection";

// Server-side fetch functions
async function getProduct(slug) {
    const res = await fetch(`${process.env.BASE_URL}/api/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

async function getReviews(id) {
    const res = await fetch(`${process.env.BASE_URL}/api/reviews/${id}`)
    const result = await res.json()

    return result.success ? result.reviews : []
}

async function getSuggestedProducts(excludeId) {
    const res = await fetch(
        `${process.env.BASE_URL}/api/products`,
        { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const products = data.products.filter((val) => val._id !== excludeId);
    return products || [];
}

export default async function ProductDetail({ params }) {
    const { slug } = await params;

    const productData = await getProduct(slug);

    if (!productData || !productData.success) {
        notFound();
    }

    const product = productData.product;
    const suggested = await getSuggestedProducts(product._id);

    // Initial mock reviews (mapped with properties expected by the reviews component)
    const reviews = await getReviews()

    const avgRating = reviews.length > 0 ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;

    return (
        <div className="min-h-screen bg-white pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="text-sm text-neutral-500 mb-8">
                    <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link> <span>/</span>
                    <Link href="/collections" className="hover:text-neutral-900 transition-colors"> Collections</Link> <span>/</span>
                    <span className="text-neutral-900 font-medium">{product.title}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid lg:grid-cols-2 gap-12 mb-20">

                    {/* Left: Interactive Client Gallery */}
                    <ProductGallery images={product.images} title={product.title} />

                    {/* Right: Info - Sticky */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">{product.category}</p>
                        <h1 className="text-4xl font-black tracking-tight mb-4">{product.title}</h1>

                        {/* Top Rating Summary Link */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"}
                                    />
                                ))}
                            </div>
                            <Link href="#reviews" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline transition-colors">
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

                        {/* Trust Badges */}
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-neutral-600">
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <Truck size={20} className="text-neutral-900" /> Free Shipping
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <Shield size={20} className="text-neutral-900" /> 1 Year Warranty
                            </div>
                            <div className="flex flex-col items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <RotateCcw size={20} className="text-neutral-900" /> Easy Returns
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-neutral-200 mb-20" />

                {/* Comprehensive Reviews & Submission Section (Interactive Client Component) */}
                <div className="mb-20">
                    <ProductReviews
                        productId={product._id}
                        initialReviews={reviews}
                        avgRating={avgRating}
                    />
                </div>

                <hr className="border-neutral-200 mb-20" />

                {/* Suggested Products */}
                {suggested.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-black mb-8">You Might Also Like</h2>
                        <ProductsGrid products={suggested} />
                    </div>
                )}

            </div>
        </div>
    );
}