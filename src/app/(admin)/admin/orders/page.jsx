'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    ShoppingBag,
    Search,
    SlidersHorizontal,
    Eye,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    ChevronLeft,
    ChevronRight,
    X,
    Download,
    DollarSign,
    PackageCheck
} from 'lucide-react';

// Mock Orders Data for Optiko Eyewear
const MOCK_ORDERS = [
    {
        id: 'OPT-84920',
        customer: {
            name: 'Sarah Jenkins',
            email: 'sarah.j@example.com',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        },
        items: [
            { name: 'Aura Round Acetate', quantity: 1, prescription: 'Single Vision' }
        ],
        totalAmount: 149.00,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        createdAt: '2026-07-28',
        shippingMethod: 'Express Shipping'
    },
    {
        id: 'OPT-84919',
        customer: {
            name: 'Marcus Vance',
            email: 'marcus.v@example.com',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        },
        items: [
            { name: 'Solstice Aviator Sun', quantity: 1, prescription: 'Non-Prescription' },
            { name: 'Lens Cleaning Kit', quantity: 2 }
        ],
        totalAmount: 215.00,
        paymentStatus: 'paid',
        orderStatus: 'shipped',
        createdAt: '2026-07-27',
        shippingMethod: 'Standard Courier'
    },
    {
        id: 'OPT-84918',
        customer: {
            name: 'Elena Rostova',
            email: 'elena.rostova@example.com',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        items: [
            { name: 'Kuro Square Titanium', quantity: 1, prescription: 'Progressive' }
        ],
        totalAmount: 340.00,
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        createdAt: '2026-07-25',
        shippingMethod: 'Express Shipping'
    },
    {
        id: 'OPT-84917',
        customer: {
            name: 'David Chen',
            email: 'd.chen@example.com',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
        },
        items: [
            { name: 'Zenith Minimal Rimless', quantity: 1, prescription: 'Reading (+1.50)' }
        ],
        totalAmount: 235.00,
        paymentStatus: 'pending',
        orderStatus: 'pending',
        createdAt: '2026-07-29',
        shippingMethod: 'Standard Courier'
    },
    {
        id: 'OPT-84916',
        customer: {
            name: 'Chloe Bennett',
            email: 'chloe.b@example.com',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
        },
        items: [
            { name: 'Vesper Cat-Eye Acetate', quantity: 1, prescription: 'Non-Prescription' }
        ],
        totalAmount: 165.00,
        paymentStatus: 'refunded',
        orderStatus: 'cancelled',
        createdAt: '2026-07-24',
        shippingMethod: 'Standard Courier'
    }
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter Logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(search.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
            const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;

            return matchesSearch && matchesStatus && matchesPayment;
        });
    }, [orders, search, statusFilter, paymentFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(start, start + itemsPerPage);
    }, [filteredOrders, currentPage]);

    // Metrics Summary
    const metrics = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;
        const totalRevenue = orders
            .filter(o => o.paymentStatus === 'paid')
            .reduce((sum, o) => sum + o.totalAmount, 0);

        return { total, pending, totalRevenue };
    }, [orders]);

    // Checkbox selection
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedOrderIds(paginatedOrders.map(o => o.id));
        } else {
            setSelectedOrderIds([]);
        }
    };

    const handleSelectOne = (id) => {
        setSelectedOrderIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const isAllSelected = paginatedOrders.length > 0 && paginatedOrders.every(o => selectedOrderIds.includes(o.id));

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900">Orders Management</h1>
                    <p className="text-sm text-neutral-500 mt-0.5">
                        Track customer orders, optical prescriptions, and fulfillment statuses
                    </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-neutral-100 rounded-xl text-neutral-700">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Total Orders</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.total}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Requires Processing</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.pending}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Total Revenue</p>
                        <h3 className="text-2xl font-black text-neutral-900">${metrics.totalRevenue.toFixed(2)}</h3>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Order ID, customer name, or email..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <SlidersHorizontal className="w-4 h-4 text-neutral-400 hidden sm:block" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        >
                            <option value="all">Fulfillment Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        >
                            <option value="all">Payment Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                                <th className="py-4 px-4 w-10">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                    />
                                </th>
                                <th className="py-4 px-4">Order ID</th>
                                <th className="py-4 px-4">Customer</th>
                                <th className="py-4 px-4">Purchased Item(s)</th>
                                <th className="py-4 px-4">Total</th>
                                <th className="py-4 px-4">Payment</th>
                                <th className="py-4 px-4">Fulfillment</th>
                                <th className="py-4 px-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-100 text-sm">
                            {paginatedOrders.length > 0 ? (
                                paginatedOrders.map((order) => {
                                    const isSelected = selectedOrderIds.includes(order.id);

                                    return (
                                        <tr key={order.id} className={`hover:bg-neutral-50/80 transition-colors ${isSelected ? 'bg-neutral-50' : ''}`}>
                                            <td className="py-4 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleSelectOne(order.id)}
                                                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                                />
                                            </td>

                                            <td className="py-4 px-4">
                                                <span className="font-mono font-bold text-neutral-900">{order.id}</span>
                                                <p className="text-xs text-neutral-400">{order.createdAt}</p>
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={order.customer.avatar} alt={order.customer.name} className="w-8 h-8 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-bold text-neutral-900">{order.customer.name}</p>
                                                        <p className="text-xs text-neutral-400">{order.customer.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4">
                                                <div className="space-y-0.5">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="text-xs font-semibold text-neutral-800">
                                                            {item.name} <span className="text-neutral-400">×{item.quantity}</span>
                                                            {item.prescription && (
                                                                <span className="ml-1 text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 font-normal">
                                                                    {item.prescription}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="py-4 px-4 font-bold text-neutral-900">
                                                ${order.totalAmount.toFixed(2)}
                                            </td>

                                            <td className="py-4 px-4">
                                                {order.paymentStatus === 'paid' && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        Paid
                                                    </span>
                                                )}
                                                {order.paymentStatus === 'pending' && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                        Pending
                                                    </span>
                                                )}
                                                {order.paymentStatus === 'refunded' && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                        Refunded
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-4">
                                                {order.orderStatus === 'delivered' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Delivered
                                                    </span>
                                                )}
                                                {order.orderStatus === 'shipped' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                                        <Truck className="w-3.5 h-3.5" />
                                                        Shipped
                                                    </span>
                                                )}
                                                {order.orderStatus === 'processing' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                        <PackageCheck className="w-3.5 h-3.5" />
                                                        Processing
                                                    </span>
                                                )}
                                                {order.orderStatus === 'pending' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        Pending
                                                    </span>
                                                )}
                                                {order.orderStatus === 'cancelled' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        Cancelled
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-4 px-4 text-right">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg inline-block transition-colors"
                                                    title="View Order Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-neutral-400">
                                        <ShoppingBag className="w-8 h-8 mx-auto mb-2 stroke-[1.5]" />
                                        <p className="text-sm font-bold text-neutral-700">No orders found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
                    <div>
                        Showing <span className="font-bold text-neutral-900">{filteredOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
                        <span className="font-bold text-neutral-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of{' '}
                        <span className="font-bold text-neutral-900">{filteredOrders.length}</span> entries
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 disabled:opacity-40 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-bold text-neutral-900">Page {currentPage} of {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 disabled:opacity-40 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}