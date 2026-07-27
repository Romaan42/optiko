"use client"
import { userRemoveFromCart, userUpdateQty } from '@/actions/userActions';
import CartLoader from './CartLoader'
import { getCartItems, removeFromCart, setCartLoading, updateQty } from '@/store/cartSlice';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { setSidebar } from '@/store/cartSidebarSlice';

export default function CartSidebar() {
    const dispatch = useDispatch()
    const { loading, cartItems } = useSelector(state => state.cart)
    const isOpen = useSelector(state => state.cartSidebar)
    const user = useSelector(state => state.user)

    const updateQuantity = async (id, delta) => {
        if (loading) return;
        if (user.user) {
            dispatch(setCartLoading(true))
            const result = await userUpdateQty({ id, delta })
            if (result.success) {
                dispatch(getCartItems())
            } else {
                toast.error(result.message)
                dispatch(setCartLoading(false))
            }
        } else {
            dispatch(updateQty({ id, delta }))
        }
    };

    const removeItem = async (id) => {
        if (loading) return;
        if (user.user) {
            dispatch(setCartLoading(true))
            const result = await userRemoveFromCart({ id })
            if (result.success) {
                dispatch(getCartItems())
            } else {
                toast.error(result.message)
            }
        } else {
            dispatch(removeFromCart(id))
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
            />
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl border-l border-neutral-200">
                    <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <ShoppingBag className="w-5 h-5 text-neutral-900" />
                            <h2 className="text-lg font-bold tracking-tight">Your Selection</h2>
                            <span className="text-xs font-bold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full">
                                {cartItems.reduce((sum, item) => sum + item.qty, 0)}
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch(setSidebar(false))}
                            className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 rounded-xl transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                        {loading ? (
                            <CartLoader />
                        ) : cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
                                <ShoppingBag className="w-10 h-10 text-neutral-300 mb-4 stroke-[1.5]" />
                                <h3 className="text-base font-bold text-neutral-900 mb-1">Your cart is empty</h3>
                                <p className="text-sm text-neutral-400 max-w-xs">Explore our latest optical and sunglass silhouettes to find your perfect fit.</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item._id} className="flex gap-4 items-start pb-6 border-b border-neutral-100 last:border-0 last:pb-0">
                                    <div className="w-24 aspect-4/3 bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0 border border-neutral-100">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-bold text-neutral-900 truncate pr-2">{item.name}</h3>
                                            <span className="text-sm font-semibold text-neutral-950">${item.price * item.qty}</span>
                                        </div>
                                        <p className="text-xs text-neutral-400 font-medium mb-4 uppercase tracking-wider">
                                            {item.category} • {item.brand}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded-lg p-0.5">
                                                <button
                                                    onClick={() => updateQuantity(item._id, "decrease")}
                                                    className="p-1 text-neutral-500 hover:text-neutral-900 rounded transition-colors cursor-pointer"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="text-xs font-bold text-neutral-800 px-2.5 min-w-8 text-center">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, "increase")}
                                                    className="p-1 text-neutral-500 hover:text-neutral-900 rounded transition-colors cursor-pointer"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item._id)}
                                                className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors rounded-lg cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && !loading && (
                        <div className="border-t border-neutral-200 px-6 py-6 bg-neutral-50 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium text-neutral-500">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-900 font-semibold">${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-neutral-500">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-bold uppercase text-xs tracking-wider">Complimentary</span>
                                </div>
                            </div>

                            <hr className="border-neutral-200" />

                            <div className="flex justify-between text-base font-bold text-neutral-900">
                                <span>Estimated Total</span>
                                <span>${subtotal + shipping}</span>
                            </div>

                            <p className="text-[11px] text-neutral-400 text-center font-medium leading-normal">
                                Duties and taxes calculated at checkout. Free 30-day structural assurance guarantee included.
                            </p>

                            <Link href={"/checkout"} onClick={() => dispatch(setSidebar(false))} className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2">
                                Proceed to Checkout
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}