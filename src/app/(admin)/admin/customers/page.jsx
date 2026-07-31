'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    SlidersHorizontal,
    Mail,
    Phone,
    Eye,
    ChevronLeft,
    ChevronRight,
    X,
    UserPlus,
    FileText,
    Award
} from 'lucide-react';

// Mock Customers Data for Optiko Eyewear
// const MOCK_CUSTOMERS = [
//     {
//         id: 'cust-101',
//         name: 'Sarah Jenkins',
//         email: 'sarah.j@example.com',
//         phone: '+1 (555) 234-5678',
//         avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
//         totalOrders: 4,
//         totalSpent: 620.00,
//         hasPrescriptionSaved: true,
//         tier: 'VIP Member',
//         status: 'active',
//         joinedDate: '2025-11-12'
//     },
//     {
//         id: 'cust-102',
//         name: 'Marcus Vance',
//         email: 'marcus.v@example.com',
//         phone: '+1 (555) 987-6543',
//         avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
//         totalOrders: 2,
//         totalSpent: 380.00,
//         hasPrescriptionSaved: false,
//         tier: 'Regular',
//         status: 'active',
//         joinedDate: '2026-01-05'
//     },
//     {
//         id: 'cust-103',
//         name: 'Elena Rostova',
//         email: 'elena.rostova@example.com',
//         phone: '+1 (555) 345-6789',
//         avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
//         totalOrders: 6,
//         totalSpent: 1150.00,
//         hasPrescriptionSaved: true,
//         tier: 'VIP Member',
//         status: 'active',
//         joinedDate: '2025-08-20'
//     },
//     {
//         id: 'cust-104',
//         name: 'David Chen',
//         email: 'd.chen@example.com',
//         phone: '+1 (555) 876-5432',
//         avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
//         totalOrders: 1,
//         totalSpent: 235.00,
//         hasPrescriptionSaved: true,
//         tier: 'New Buyer',
//         status: 'active',
//         joinedDate: '2026-07-29'
//     },
//     {
//         id: 'cust-105',
//         name: 'Chloe Bennett',
//         email: 'chloe.b@example.com',
//         phone: '+1 (555) 432-1098',
//         avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
//         totalOrders: 0,
//         totalSpent: 0.00,
//         hasPrescriptionSaved: false,
//         tier: 'Lead',
//         status: 'inactive',
//         joinedDate: '2026-06-14'
//     }
// ];

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [tierFilter, setTierFilter] = useState('all');
    const [rxFilter, setRxFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;



    // Filter Logic
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            const matchesSearch =
                customer.name.toLowerCase().includes(search.toLowerCase()) ||
                customer.email.toLowerCase().includes(search.toLowerCase()) ||
                customer.phone.includes(search);

            const matchesTier = tierFilter === 'all' || customer.tier === tierFilter;
            const matchesRx =
                rxFilter === 'all' ||
                (rxFilter === 'saved' && customer.hasPrescriptionSaved) ||
                (rxFilter === 'none' && !customer.hasPrescriptionSaved);

            return matchesSearch && matchesTier && matchesRx;
        });
    }, [customers, search, tierFilter, rxFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredCustomers.slice(start, start + itemsPerPage);
    }, [filteredCustomers, currentPage]);

    // Metrics Summary
    const metrics = useMemo(() => {
        const total = customers.length;
        const vip = customers.filter(c => c.tier === 'VIP Member').length;
        const totalLTV = customers.reduce((sum, c) => sum + c.totalSpent, 0);
        const avgSpent = total > 0 ? totalLTV / total : 0;

        return { total, vip, avgSpent };
    }, [customers]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900">Customer Directory</h1>
                    <p className="text-sm text-neutral-500 mt-0.5">
                        Manage Optiko customer accounts, purchase histories, and saved prescription records
                    </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 text-white font-bold text-sm rounded-xl hover:bg-neutral-800 transition-colors shadow-sm">
                    <UserPlus className="w-4 h-4" />
                    Add Customer
                </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-neutral-100 rounded-xl text-neutral-700">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Total Accounts</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.total}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">VIP Clients</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.vip}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Avg Lifetime Value</p>
                        <h3 className="text-2xl font-black text-neutral-900">${metrics.avgSpent.toFixed(2)}</h3>
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
                            placeholder="Search by customer name, email, or phone..."
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
                            value={tierFilter}
                            onChange={(e) => setTierFilter(e.target.value)}
                            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        >
                            <option value="all">All Tiers</option>
                            <option value="VIP Member">VIP Member</option>
                            <option value="Regular">Regular</option>
                            <option value="New Buyer">New Buyer</option>
                            <option value="Lead">Lead</option>
                        </select>

                        <select
                            value={rxFilter}
                            onChange={(e) => setRxFilter(e.target.value)}
                            className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        >
                            <option value="all">Prescription Record</option>
                            <option value="saved">Saved Rx</option>
                            <option value="none">No Rx</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                                <th className="py-4 px-4">Customer</th>
                                <th className="py-4 px-4">Contact Info</th>
                                <th className="py-4 px-4">Customer Tier</th>
                                <th className="py-4 px-4">Total Orders</th>
                                <th className="py-4 px-4">Total Spent</th>
                                <th className="py-4 px-4">Prescription</th>
                                <th className="py-4 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-100 text-sm">
                            {paginatedCustomers.length > 0 ? (
                                paginatedCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-neutral-50/80 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover border border-neutral-200" />
                                                <div>
                                                    <h4 className="font-bold text-neutral-900">{customer.name}</h4>
                                                    <span className="text-xs text-neutral-400">Joined {customer.joinedDate}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700">
                                                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                                                    {customer.email}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                                                    {customer.phone}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${customer.tier === 'VIP Member'
                                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                : customer.tier === 'Regular'
                                                    ? 'bg-neutral-100 text-neutral-700'
                                                    : 'bg-blue-50 text-blue-700'
                                                }`}>
                                                {customer.tier}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 font-bold text-neutral-900">
                                            {customer.totalOrders} orders
                                        </td>

                                        <td className="py-4 px-4 font-bold text-neutral-900">
                                            ${customer.totalSpent.toFixed(2)}
                                        </td>

                                        <td className="py-4 px-4">
                                            {customer.hasPrescriptionSaved ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                                                    <FileText className="w-3 h-3" /> Rx On File
                                                </span>
                                            ) : (
                                                <span className="text-xs text-neutral-400">No Rx</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-4 text-right">
                                            <Link
                                                href={`/admin/customers/${customer.id}`}
                                                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg inline-block transition-colors"
                                                title="View Customer Profile"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-neutral-400">
                                        <Users className="w-8 h-8 mx-auto mb-2 stroke-[1.5]" />
                                        <p className="text-sm font-bold text-neutral-700">No customers found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
                    <div>
                        Showing <span className="font-bold text-neutral-900">{filteredCustomers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
                        <span className="font-bold text-neutral-900">{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> of{' '}
                        <span className="font-bold text-neutral-900">{filteredCustomers.length}</span> entries
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