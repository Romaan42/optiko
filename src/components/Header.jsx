"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import CartSidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLogin } from "@/store/userSlice";
import { getCartItems, getGuestCartData, saveCartLocalStorage, setCartLoading } from "@/store/cartSlice";
import { logoutUser } from "@/actions/userActions";
import DropdownLogin from "./LoginDropdown";
import { setSidebar } from "@/store/cartSidebarSlice";

export default function Navbar() {
    const dispatch = useDispatch()
    const { loading, user } = useSelector(state => state.user)
    const isOpen = useSelector(state => state.cartSidebar)
    // cart
    const [menuOpen, setMenuOpen] = useState(false); // mobile menu
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const getData = () => {
        if (user) {
            dispatch(getCartItems())
            return
        }

        dispatch(getGuestCartData())
        dispatch(setCartLoading(false))
    }

    useEffect(() => {
        dispatch(checkUserLogin())
    }, [])

    useEffect(() => {
        getData()
    }, [user])

    const handleLogout = async () => {
        await logoutUser()
        dispatch(checkUserLogin())
        getData()
    }

    return (
        <>
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Eye className="w-8 h-8 text-neutral-900" />
                        <span className="text-2xl font-black tracking-tighter uppercase">Optiko</span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium hover:text-neutral-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-2">

                        {/* Login Icon */}
                        <div>
                            {loading ? (
                                // 1. LOADING SKELETON
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-24 bg-neutral-200 rounded-full animate-pulse"></div>
                                    <div className="h-10 w-10 bg-neutral-200 rounded-full animate-pulse"></div>
                                </div>
                            ) : user ? (
                                // 2. LOGGED IN STATE
                                <div className="flex items-center gap-3">
                                    <button className="p-2 px-5 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 transition-all duration-200 font-medium">
                                        {user?.name}
                                    </button>

                                    <button
                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200"
                                        onClick={handleLogout}
                                        aria-label="Logout"
                                        title="Logout"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                // 3. LOGGED OUT STATE
                                <DropdownLogin />
                            )}
                        </div>


                        {/* Cart Icon */}
                        <button
                            className="p-2 hover:bg-neutral-100 cursor-pointer rounded-full transition-colors relative"
                            onClick={() => dispatch(setSidebar(true))}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-neutral-900 rounded-full"></span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 hover:bg-neutral-100 rounded-full"
                            onClick={() => dispatch(setSidebar(!isOpen))}
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-neutral-200">
                        <div className="px-4 py-3 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block py-2 text-sm font-medium hover:text-neutral-600"
                                    onClick={() => setMenuOpen(false)} // click pe band ho jaye
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Cart Sidebar */}
            <CartSidebar />
        </>
    )
}