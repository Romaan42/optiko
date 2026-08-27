import Link from 'next/link';

export default function RecentOrdersTable({ orders = [] }) {

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'text-green-600 bg-green-50';
            case 'shipped': return 'text-purple-600 bg-purple-50';
            case 'processing': return 'text-blue-600 bg-blue-50';
            case 'cancelled': return 'text-red-600 bg-red-50';
            default: return 'text-yellow-600 bg-yellow-50'; // pending
        }
    }

    return (
        <div className="bg-white border-neutral-200 rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900">Recent Orders</h3>
                <Link href="/admin/orders" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">View All</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 text-neutral-500 font-semibold uppercase tracking-wider text-xs border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Products</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Delivery</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {orders.length > 0 ? orders.map((order) => (
                            <tr key={order._id} className="hover:bg-neutral-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-neutral-900">
                                    #{order._id.toString().slice(-6).toUpperCase()}
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-neutral-900">{order.shippingAddress.fullName}</p>
                                        <p className="text-xs text-neutral-500">{order.shippingAddress.phone}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-neutral-600">
                                    <div className="flex items-center gap-2">
                                        <img src={order.orderItems[0].image} alt="" className="w-8 h-8 rounded-md object-cover" />
                                        <span>
                                            {order.orderItems[0].title}
                                            {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} more`}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-neutral-500">
                                    {new Date(order.createdAt).toLocaleDateString('en-PK', {
                                        month: 'short', day: 'numeric', year: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-4 font-bold text-neutral-900">
                                    PKR {order.totalPrice.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium">
                                        {order.paymentMethod} - {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold capitalize ${getStatusColor(order.deliveryStatus)}`}>
                                        {order.deliveryStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/orders/${order._id}`}
                                        className="text-sm font-medium text-neutral-900 hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="text-center py-10">
                                    <p className="text-neutral-500">No orders found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}