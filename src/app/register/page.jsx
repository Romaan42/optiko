'use client'
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { registerUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter()
    // const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const [state, action, loading] = useActionState(registerUser)

    useEffect(() => {
        if (state?.success) {
            router.push("/login")
        } else {
            setError(state?.message)
        }
    }, [state])

    const handleSubmit = (formData) => {
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        action({ name, email, password })
    }

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                <div className="hidden lg:flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-2">
                        <Eye className="w-10 h-10 text-neutral-900" />
                        <span className="text-3xl font-black tracking-tighter uppercase">Optiko</span>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight leading-tight">
                        Join the Optiko Family
                    </h1>
                    <p className="text-base text-neutral-500 font-medium max-w-md">
                        Create an account to get free RX lenses, lifetime warranty, and early access to new collections.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="p-4 bg-white border-neutral-200 rounded-2xl shadow-sm">
                            <p className="text-sm font-bold">Free Shipping</p>
                            <p className="text-xs text-neutral-500">On all orders</p>
                        </div>
                        <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                            <p className="text-sm font-bold">30-Day Returns</p>
                            <p className="text-xs text-neutral-500">No questions asked</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Create Account</h2>
                    <p className="text-sm text-neutral-500 font-medium mb-8">
                        Already have an account?
                        <Link href="/login" className="text-neutral-900 font-bold hover:underline ml-1">Sign In</Link>
                    </p>

                    <form className="space-y-5" action={handleSubmit}>
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 gap-5">
                            {error && <p className="text-xs text-red-500">{error}</p>}
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                    <input
                                        type="text"
                                        required
                                        name="name"
                                        placeholder="Roman khan"
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                        </div>

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
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    name="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-11 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
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

                        {/* Terms */}
                        <div className="flex items-start gap-3 pt-2">
                            <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-neutral-300 accent-neutral-900" />
                            <label className="text-xs text-neutral-500 font-medium">
                                I agree to the <Link href="/terms" className="font-bold text-neutral-900 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-bold text-neutral-900 hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 ${loading ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-900"} text-white font-bold rounded-xl text-sm transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-md ${!loading ? "hover:bg-neutral-800" : ""}`}
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    {/* <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-3 text-neutral-500 font-medium">OR</span>
                        </div>
                    </div> */}

                    {/* Social Login */}
                    {/* <button className="w-full py-3.5 border border-neutral-200 bg-white text-neutral-900 font-bold rounded-xl text-sm hover:bg-neutral-50 transition-colors">
                        Login
                    </button>  <div className="relative my-6"> */}

                </div>

            </div>
        </div >
    );
}