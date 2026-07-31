'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings
} from 'lucide-react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200">
                    <span className="text-lg font-black uppercase tracking-wider">Admin Panel</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive
                                        ? 'bg-neutral-900 text-white font-bold'
                                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 font-medium'
                                    }`}
                            >
                                <Icon className="w-4.5 h-4.5" />
                                {link.name}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-neutral-900/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <aside
                        className="w-64 bg-white h-full relative z-40 p-6 flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="font-black uppercase tracking-wider text-lg mb-8">Admin Panel</div>
                        <nav className="space-y-2 flex-1">
                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive
                                                ? 'bg-neutral-900 text-white font-bold'
                                                : 'text-neutral-600 hover:bg-neutral-100 font-medium'
                                            }`}
                                    >
                                        <Icon className="w-4.5 h-4.5" />
                                        {link.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}