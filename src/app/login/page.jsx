'use client'
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
import { checkUserLogin } from "@/store/userSlice";

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const [state, action, loading] = useActionState(loginUser)

    const syncCartItems = async () => {
        const cartSync = cartItems.map((cart) => {
            return {
                productId: cart._id,
                qty: cart.qty,
                userId: state?.userId
            }
        });

        const res = await fetch("/api/sync-cartitems", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ items: cartSync }),
            credentials: "include"
        })
        await res.json()
    }

    useEffect(() => {
        if (state?.success && !loading) {
            if (!cartItems.length) {
                router.push("/")
                dispatch(checkUserLogin())
                return
            }
            syncCartItems().then(() => {
                dispatch(emptyCart())
                toast.success("cart sync successfully")
                router.push("/")
                dispatch(checkUserLogin())

            })

        } else {
            setError(state?.message)
        }
    }, [state])

    const handleSubmit = (formData) => {
        const email = formData.get("email")
        const password = formData.get("password")

        action({ email, password })
    }

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <Toaster />
                {/* Left Column: Branding */}
                <div className="hidden lg:flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-2">
                        <Eye className="w-10 h-10 text-neutral-900" />
                        <span className="text-3xl font-black tracking-tighter uppercase">Optiko</span>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight leading-tight">
                        Welcome Back
                    </h1>
                    <p className="text-base text-neutral-500 font-medium max-w-md">
                        Sign in to track orders, manage prescriptions, and get personalized frame recommendations.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                            <p className="text-sm font-bold">Lifetime Warranty</p>
                            <p className="text-xs text-neutral-500">On all frames</p>
                        </div>
                        <div className="p-4 bg-white border-neutral-200 rounded-2xl shadow-sm">
                            <p className="text-sm font-bold">Free RX Lenses</p>
                            <p className="text-xs text-neutral-500">With every order</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Login Form */}
                <div className="bg-white border-neutral-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Sign In</h2>
                    <p className="text-sm text-neutral-500 font-medium mb-8">
                        Don't have an account?
                        <Link href="/register" className="text-neutral-900 font-bold hover:underline ml-1">Create one</Link>
                    </p>

                    <form className="space-y-5" action={handleSubmit}>
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    placeholder="johndevon@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Password</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-neutral-900 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-11 pr-12 py-3 bg-neutral-50 border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-neutral-300 accent-neutral-900" />
                                <label htmlFor="remember" className="text-xs text-neutral-500 font-medium">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl text-sm transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-md hover:bg-neutral-800"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}