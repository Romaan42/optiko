'use client'

import { userAddToCart } from "@/actions/userActions"
import { setSidebar } from "@/store/cartSidebarSlice"
import { addToCart, getCartItems } from "@/store/cartSlice"
import { useActionState, useEffect, useTransition } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

export default function AddToCart({ product }) {
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.user)
    const [state, action, cartLoading] = useActionState(userAddToCart)
    const [isPendingTransition, setTransition] = useTransition()


    useEffect(() => {
        if (state?.success && !cartLoading) {
            toast.success(state?.message ?? "added to cart")
            dispatch(getCartItems())
            dispatch(setSidebar(true))
            return
        }

        if (state && !state?.success && !cartLoading) {
            toast.error(state?.message)
        }
    }, [state])

    const handleAddToCart = () => {
        if (loading) {
            return
        }

        if (!user) {
            dispatch(addToCart(product))
            toast.success("Product added To cart")
        } else {
            setTransition(() => {
                action({ id: product._id })
            })
        }
    }
    return (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end p-4">
            <Toaster />
            <button
                className="w-full py-3 bg-white text-neutral-900 font-bold rounded-xl 
                    opacity-100 
                    lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 
                    transition-all duration-300 shadow-md hover:bg-neutral-50 cursor-pointer"
                onClick={handleAddToCart}
                disabled={cartLoading}
            >
                {cartLoading ? "adding..." : "Quick Add"}
            </button>
        </div>
    )
}
