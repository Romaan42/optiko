import { ChevronLeft, Link } from 'lucide-react';
import React from 'react'

export default function EmptyCartCheckout() {
    return (

        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center pt-28 pb-24 px-4">
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-md w-full border border-neutral-100">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🛒</span>
                </div>
                <h2 className="text-2xl font-black mb-3">Your cart is empty</h2>
                <p className="text-neutral-500 mb-8 text-sm">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    href="/collections"
                    className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                    <ChevronLeft size={20} /> Continue Shopping
                </Link>
            </div>
        </div>
    );

}
