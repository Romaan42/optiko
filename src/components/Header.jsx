"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import CartSidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLogin } from "@/store/userSlice";
import {
  getCartItems,
  getGuestCartData,
  setCartLoading,
} from "@/store/cartSlice";
import { logoutUser } from "@/actions/userActions";
import DropdownLogin from "./LoginDropdown";
import { setSidebar } from "@/store/cartSidebarSlice";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Orders", href: "/orders" },
    { name: "Blogs", href: "/blogs" },
  ];

  const getData = () => {
    if (user) {
      dispatch(getCartItems());
      return;
    }
    dispatch(getGuestCartData());
    dispatch(setCartLoading(false));
  };

  useEffect(() => {
    dispatch(checkUserLogin());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [user]);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(checkUserLogin());
    getData();
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-4 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 z-50">
        <Toaster />

        <div className="mx-auto max-w-6xl">
          {/* Main Floating Header */}
          <div className="relative flex h-16 items-center justify-between rounded-full border border-white/40 bg-white/60 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-neutral-900 to-neutral-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-neutral-400/50">
                <Eye className="h-5 w-5" />
              </div>
              <span className="text-lg font-black uppercase tracking-[0.25em] text-neutral-900 transition-colors duration-300 group-hover:text-neutral-600 sm:text-xl">
                Optiko
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm font-semibold uppercase tracking-widest text-neutral-500 transition-colors duration-300 hover:text-neutral-900"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neutral-900 transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {!loading ? (
                user ? (
                  <div className="hidden items-center gap-3 sm:flex border-r border-neutral-300/50 pr-4 mr-1">
                    <span className="text-sm font-semibold tracking-wide text-neutral-700">
                      {user?.name}
                    </span>
                    <button
                      className="group flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100/80 text-neutral-500 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:shadow-md"
                      onClick={handleLogout}
                      aria-label="Logout"
                      title="Logout"
                    >
                      <LogOut
                        size={16}
                        className="transition-transform group-hover:scale-110"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="hidden sm:block border-r border-neutral-300/50 pr-4 mr-1">
                    <DropdownLogin />
                  </div>
                )
              ) : (
                <div className="hidden items-center gap-3 sm:flex border-r border-neutral-300/50 pr-4 mr-1">
                  <div className="h-8 w-20 animate-pulse rounded-full bg-neutral-200/80"></div>
                  <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200/80"></div>
                </div>
              )}

              {/* Cart Button */}
              <button
                className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100/50 text-neutral-800 transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:shadow-neutral-900/20"
                onClick={() => dispatch(setSidebar(true))}
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {cart.cartItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-neutral-900 px-[4px] text-[10px] font-bold text-white shadow-sm transition-colors duration-300 group-hover:bg-white group-hover:text-neutral-900">
                    {cart.cartItems.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100/50 text-neutral-800 transition-all duration-300 hover:bg-neutral-200 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown (Floating Card) */}
          <div
            className={`absolute left-4 right-4 top-20 overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-in-out md:hidden ${
              menuOpen
                ? "max-h-[400px] opacity-100"
                : "max-h-0 opacity-0 border-transparent shadow-none"
            }`}
          >
            <div className="flex flex-col space-y-2 p-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-600 transition-all hover:bg-neutral-900 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="my-2 h-px w-full bg-neutral-200/60"></div>

              {!loading && !user && (
                <div className="flex justify-center py-2">
                  <DropdownLogin />
                </div>
              )}

              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50/80 px-4 py-3 text-sm font-bold tracking-wide text-red-600 transition-all hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={18} />
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar />
    </>
  );
}
