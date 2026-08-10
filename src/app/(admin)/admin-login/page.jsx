'use client';

import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { adminLogin } from '@/actions/adminActions';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await adminLogin({ email: formData.email, password: formData.password })
        setLoading(false)
        if (result.success) {
            toast.success(result.message)
            router.push("/admin")
        } else {
            toast.error(result.message)
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
            <Toaster />
            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl mx-auto flex items-center justify-center shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-black text-neutral-900 tracking-tight">Admin Portal</h1>
                    <p className="text-xs text-neutral-500">Sign in to manage your dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

            </div>
        </div>
    );
}