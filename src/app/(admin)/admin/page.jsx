import { DollarSign, ArrowUpRight, ArrowDownRight, Package, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900">Dashboard Overview</h1>
                    <p className="text-sm text-neutral-500 mt-1">Here's what's happening with your store today.</p>
                </div>
                <button className="hidden sm:block px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors">
                    Download Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-neutral-500">Total Revenue</h3>
                        <div className="p-2 bg-neutral-50 rounded-lg">
                            <DollarSign className="w-4 h-4 text-neutral-700" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-neutral-900">$24,563.00</p>
                        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.5%
                        </span>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-neutral-500">Orders</h3>
                        <div className="p-2 bg-neutral-50 rounded-lg">
                            <ShoppingCart className="w-4 h-4 text-neutral-700" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-neutral-900">342</p>
                        <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md">
                            <ArrowDownRight className="w-3 h-3 mr-0.5" /> -2.4%
                        </span>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-neutral-500">Total Products</h3>
                        <div className="p-2 bg-neutral-50 rounded-lg">
                            <Package className="w-4 h-4 text-neutral-700" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-black text-neutral-900">1,240</p>
                        <span className="text-xs font-medium text-neutral-500">
                            Across 8 categories
                        </span>
                    </div>
                </div>

                {/* Stat Card 4 */}
                <Link href={"/admin/add-product"} className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-center items-center text-center border-dashed hover:border-neutral-400 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-neutral-200 transition-colors">
                        <span className="text-neutral-600 font-black text-lg">+</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">Add New Product</h3>
                </Link>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
                    <h3 className="text-base font-bold text-neutral-900">Recent Orders</h3>
                    <button className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-neutral-50 text-neutral-500 font-black uppercase tracking-wider text-xs border-b border-neutral-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                            {[
                                { id: '#ORD-001', name: 'John Doe', date: 'Today, 2:45 PM', amount: '$129.00', status: 'Completed', color: 'text-green-600 bg-green-50' },
                                { id: '#ORD-002', name: 'Sarah Smith', date: 'Today, 11:20 AM', amount: '$89.50', status: 'Processing', color: 'text-blue-600 bg-blue-50' },
                                { id: '#ORD-003', name: 'Michael Brown', date: 'Yesterday', amount: '$240.00', status: 'Completed', color: 'text-green-600 bg-green-50' },
                                { id: '#ORD-004', name: 'Emily Davis', date: 'Yesterday', amount: '$45.00', status: 'Cancelled', color: 'text-red-600 bg-red-50' },
                            ].map((order, i) => (
                                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-neutral-900">{order.id}</td>
                                    <td className="px-6 py-4 font-medium text-neutral-600">{order.name}</td>
                                    <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                                    <td className="px-6 py-4 font-medium text-neutral-900">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${order.color}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}