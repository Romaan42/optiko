import Link from "next/link";
import { CheckCircle2, Package, ShoppingBag, ArrowRight, Copy } from "lucide-react";

export default async function OrderSuccessPage({ params }) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-28 pb-24 px-4">
            <div className="max-w-2xl w-full">

                {/* Success Card */}
                <div className="bg-white p-8 sm:p-12 rounded-4xl shadow-sm border border-neutral-100 text-center relative overflow-hidden">

                    {/* Background decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-linear-to-b from-green-50 to-transparent"></div>

                    <div className="relative">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
                            <CheckCircle2 size={48} strokeWidth={2.5} />
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 mb-4">
                            Thank You For Your Order!
                        </h1>
                        <p className="text-neutral-500 text-lg mb-8 max-w-md mx-auto">
                            Your order has been successfully placed. We've received your request and will begin processing it shortly.
                        </p>
                    </div>

                    {/* Order Details Box */}
                    <div className="bg-neutral-50 rounded-2xl p-6 mb-8 border border-neutral-100 text-left">
                        <div className="flex items-center gap-3 mb-4 text-neutral-800 font-bold border-b border-neutral-200 pb-4">
                            <Package size={24} />
                            <h2>Order Information</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Order ID</p>
                                <div className="flex items-center gap-2 font-semibold text-neutral-900">
                                    #{id.slice(-8).toUpperCase()}
                                    {/* Copy icon for better UX */}
                                    <button className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Payment Method</p>
                                <p className="font-semibold text-neutral-900">Cash on Delivery</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Status</p>
                                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                    Processing
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">Estimated Delivery</p>
                                <p className="font-semibold text-neutral-900">3 - 5 Business Days</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/shop"
                            className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <ShoppingBag size={20} /> Continue Shopping
                        </Link>

                        {/* Optional: Agar user dashboard hai toh wahan bhej sakte hain */}
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-50 transition-all duration-200 flex items-center justify-center gap-2 border-2 border-neutral-200"
                        >
                            Back to Home <ArrowRight size={20} />
                        </Link>
                    </div>

                </div>

                {/* Support Note */}
                <p className="text-center text-sm text-neutral-500 mt-8">
                    Need help with your order? <Link href="/contact" className="text-neutral-900 font-semibold underline">Contact Support</Link>
                </p>
            </div>
        </div>
    );
}