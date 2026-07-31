'use client'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Lock, ChevronLeft, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import CheckoutSkeleton from "@/components/CheckoutSkelton";
import EmptyCartCheckout from "@/components/EmptyCartCheckout";
import { getCartItems } from "@/store/cartSlice";


export default function CheckoutPage() {
    const { cartItems, loading } = useSelector(state => state.cart);
    const [form, setForm] = useState({ fullName: '', address: '', city: '', phone: '' });
    const [submitLoading, setSubmitLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 5000 ? 0 : 250;
    const totalPrice = itemsPrice + shippingPrice;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item._id,
                title: item.title,
                qty: item.qty,
                price: item.price,
                image: item.images[0],
            })),
            shippingAddress: form,
            paymentMethod: "COD",
            itemsPrice,
            shippingPrice,
            totalPrice,
        };

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Order Placed Successfully!");
                dispatch(getCartItems());
                router.push(`/order/${data.order._id}`);
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    }

    if (loading) return <CheckoutSkeleton />

    if (cartItems.length === 0 && !loading) return <EmptyCartCheckout />

    return (
        <div className="min-h-screen bg-neutral-50 pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                    <Link href="/cart" className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ChevronLeft size={16} /> Back to Cart
                    </Link>
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        <Lock size={14} /> Secure Checkout
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
                    <Toaster position="bottom-right" />

                    {/* Left: Shipping Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-neutral-100">
                            <h2 className="text-2xl font-black mb-6">Shipping Information</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">Full Name</label>
                                    <input
                                        required
                                        placeholder="John Doe"
                                        value={form.fullName}
                                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                                        className="w-full border border-neutral-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">Complete Address</label>
                                    <input
                                        required
                                        placeholder="House #, Street, Area"
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                        className="w-full border border-neutral-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 focus:bg-white"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">City</label>
                                        <input
                                            required
                                            placeholder="Karachi"
                                            value={form.city}
                                            onChange={e => setForm({ ...form, city: e.target.value })}
                                            className="w-full border border-neutral-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="0300 1234567"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full border border-neutral-300 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all bg-neutral-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Payment Method Readonly */}
                                <div className="pt-4">
                                    <h3 className="text-lg font-bold mb-3">Payment Method</h3>
                                    <div className="flex items-center justify-between border-2 border-neutral-900 bg-neutral-50 rounded-xl p-4 cursor-default">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="text-neutral-900" size={24} />
                                            <span className="font-semibold text-neutral-900">Cash on Delivery (COD)</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-4 border-neutral-900 bg-white"></div>
                                    </div>
                                </div>

                                <button
                                    disabled={submitLoading}
                                    className="w-full mt-6 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {submitLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" /> Processing...
                                        </>
                                    ) : "Place Order Now"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right: Order Summary - Sticky */}
                    <div className="lg:col-span-5 relative">
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-neutral-100 lg:sticky lg:top-28">
                            <h2 className="text-2xl font-black mb-6">Order Summary</h2>

                            {/* Product List */}
                            <div className="space-y-4 max-h-87.5 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex items-center gap-4 py-2">
                                        <div className="relative w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200 shrink-0">
                                            {item.images && item.images[0] ? (
                                                <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-200" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-neutral-900 text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-neutral-500 mt-1">Qty: {item.qty}</p>
                                        </div>
                                        <p className="font-semibold text-neutral-900 whitespace-nowrap">
                                            Rs. {(item.price * item.qty).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <hr className="my-6 border-neutral-200" />

                            {/* Calculation */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-neutral-600">
                                    <p>Subtotal</p>
                                    <p className="font-medium text-neutral-900">Rs. {itemsPrice.toLocaleString()}</p>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <p>Shipping</p>
                                    {shippingPrice === 0 ? (
                                        <p className="font-bold text-green-600">Free</p>
                                    ) : (
                                        <p className="font-medium text-neutral-900">Rs. {shippingPrice.toLocaleString()}</p>
                                    )}
                                </div>
                                {shippingPrice > 0 && itemsPrice < 5000 && (
                                    <p className="text-xs text-neutral-500 bg-neutral-50 p-2 rounded-lg mt-1">
                                        Add Rs. {(5000 - itemsPrice).toLocaleString()} more for free shipping!
                                    </p>
                                )}

                                <hr className="my-4 border-neutral-200" />

                                <div className="flex justify-between items-center text-xl">
                                    <p className="font-black text-neutral-900">Total</p>
                                    <p className="font-black text-neutral-900">Rs. {totalPrice.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 bg-neutral-50 p-4 rounded-xl flex items-center justify-center gap-2 text-sm text-neutral-600 border border-neutral-100">
                                <ShieldCheck size={18} className="text-green-600" />
                                <span>100% Secure Checkout & Buyer Protection</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}