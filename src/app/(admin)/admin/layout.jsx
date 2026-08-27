'use client';
import "../../globals.css"
import { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, LogOut, User } from 'lucide-react';
import Sidebar from "@/components/admin/SideBar";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";
import { adminLogout } from "@/actions/adminActions";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const result = await adminLogout()
        if (result) {
            toast.success(result.message)
            setProfileOpen(false);
            router.push('/admin-login'); // login page pe bhej do
        }
    }

    return (
        <html>
            <body>
                <Toaster />
                <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex">

                    {/* Sidebar Component */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Main Content Area */}
                    <main className="flex-1 lg:ml-64 flex-col min-h-screen">

                        {/* Top Header */}
                        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                {/* Mobile Hamburger Menu */}
                                <button
                                    className="lg:hidden p-2 -ml-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                {/* Search Bar */}
                                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-neutral-100 border border-transparent focus-within:border-neutral-300 focus-within:bg-white rounded-xl transition-all w-64">
                                    <Search className="w-4 h-4 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent border-none outline-none text-sm w-full text-neutral-900 placeholder:text-neutral-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                                </button>

                                {/* Profile Avatar with Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <div
                                        className="w-8 h-8 rounded-full bg-neutral-200 border-neutral-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-neutral-400 transition-colors"
                                        onClick={() => setProfileOpen(!profileOpen)}
                                    >
                                        <span className="text-xs font-bold text-neutral-600">A</span>
                                    </div>

                                    {/* Dropdown Menu */}
                                    {profileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-30">
                                            <div className="px-4 py-2 border-b border-neutral-100">
                                                <p className="text-sm font-semibold">Roman Khan</p>
                                                <p className="text-xs text-neutral-500">Romaan4244@gmail.com</p>
                                            </div>
                                            <button
                                                onClick={() => router.push('/admin/profile')}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>

                        {/* Page Content */}
                        <div className="flex-1 p-4 sm:p-6 lg:p-8">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}