'use client'

import { userAddToCart } from "@/actions/userActions"
import { addToCart, getCartItems } from "@/store/cartSlice"
import { useActionState, useEffect, useTransition } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { ShoppingBag } from "lucide-react"

export default function AddToCart({ product }) {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.user)
    const [state, action, cartLoading] = useActionState(userAddToCart, null)
    const [isPendingTransition, setTransition] = useTransition()

    useEffect(() => {
        if (state?.success && !cartLoading) {
            toast.success(state?.message ?? "Added to cart")
            dispatch(getCartItems())
            return
        }
        if (state && !state?.success && !cartLoading) {
            toast.error(state?.message)
        }
    }, [state, cartLoading, dispatch])

    const handleAddToCart = () => {
        if (loading) return
        if (!user) {
            dispatch(addToCart(product))
            toast.success("Product added To cart")
        } else {
            setTransition(() => {
                action({ id: product._id, quantity: 1 })
            })
        }
    }

    return (
        <div className="w-full">
            <Toaster position="bottom-center" />
            <button
                className="w-full flex items-center justify-center gap-3 py-4 bg-neutral-900 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-200 disabled:bg-neutral-400"
                onClick={handleAddToCart}
                disabled={cartLoading || isPendingTransition}
            >
                <ShoppingBag size={20} />
                {cartLoading || isPendingTransition ? "Adding to Cart..." : "Add to Cart"}
            </button>
        </div>
    )
}