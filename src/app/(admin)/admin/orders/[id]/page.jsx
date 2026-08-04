'use me';
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    DollarSign,
    FileText,
    ExternalLink,
    AlertCircle,
    Printer,
    Send
} from 'lucide-react';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isDelivered, setIsDelivered] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const getOrderDetail = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/admin/api/orders/${id}`);
            const result = await res.json();

            if (res.ok && result.order) {
                setOrder(result.order);
                setOrderStatus(result.order.orderStatus || 'pending');
                setPaymentStatus(result.order.paymentStatus || (result.order.isPaid ? 'paid' : 'pending'));
                setIsDelivered(result.order.isDelivered || false);
                setIsPaid(result.order.isPaid || false);
            }
        } catch (error) {
            console.error("Failed to fetch order details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getOrderDetail();
        }
    }, [id]);

    const handleUpdateOrder = async () => {
        try {
            setUpdating(true);
            const res = await fetch(`/admin/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderStatus,
                    paymentStatus,
                    isDelivered: orderStatus === 'delivered' ? true : isDelivered,
                    isPaid: paymentStatus === 'paid' ? true : isPaid,
                }),
            });

            if (res.ok) {
                await getOrderDetail();
            }
        } catch (error) {
            console.error("Failed to update order:", error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto py-24 text-center">
                <div className="w-8 h-8 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-bold text-neutral-600">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-7xl mx-auto py-24 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
                <h2 className="text-xl font-black text-neutral-900">Order Not Found</h2>
                <p className="text-sm text-neutral-500">The order with ID #{id} could not be retrieved.</p>
                <Link
                    href="/admin/orders"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white font-bold text-sm rounded-xl"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Orders
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16">

            {/* Header Navigation & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
                <div className="space-y-1">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Orders
                    </Link>
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-black text-neutral-900 font-mono">Order #{order._id}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.orderStatus === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                order.orderStatus === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    order.orderStatus === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        order.orderStatus === 'cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}>
                            {order.orderStatus ? order.orderStatus.toUpperCase() : 'PENDING'}
                        </span>
                    </div>
                    <p className="text-xs text-neutral-400">Placed on {formattedDate}</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm rounded-xl transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Print Invoice
                    </button>
                    <button
                        onClick={handleUpdateOrder}
                        disabled={updating}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left 2 Columns: Line Items & Prescriptions */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items List */}
                    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
                            <h2 className="text-sm font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                                <Package className="w-4 h-4 text-neutral-500" />
                                Purchased Items ({order.orderItems?.length || 0})
                            </h2>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {order.orderItems?.map((item, idx) => (
                                <div key={idx} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-16 h-16 rounded-xl object-cover border border-neutral-200 bg-neutral-50"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-400">
                                                <Package className="w-6 h-6" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-neutral-900 text-base">{item.title}</h3>
                                            {item.frameColor && (
                                                <p className="text-xs text-neutral-500 mt-0.5">Color: {item.frameColor}</p>
                                            )}
                                            {item.lensType && (
                                                <p className="text-xs text-neutral-500">Lens: {item.lensType}</p>
                                            )}
                                            <p className="text-xs font-semibold text-neutral-400 mt-1">
                                                ${(item.price || 0).toFixed(2)} × {item.qty}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right self-end sm:self-center">
                                        <p className="font-black text-neutral-900 text-base">
                                            ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Financial Summary */}
                        <div className="p-6 bg-neutral-50/50 border-t border-neutral-200 space-y-2 text-sm">
                            <div className="flex justify-between text-neutral-500">
                                <span>Subtotal</span>
                                <span className="font-bold text-neutral-800">${(order.itemsPrice || order.totalPrice || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-neutral-500">
                                <span>Shipping Fee</span>
                                <span className="font-bold text-neutral-800">${(order.shippingPrice || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-neutral-500">
                                <span>Tax</span>
                                <span className="font-bold text-neutral-800">${(order.taxPrice || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-black text-neutral-900 border-t border-neutral-200 pt-3 mt-2">
                                <span>Total Paid</span>
                                <span>${(order.totalPrice || order.totalAmount || 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Details Card (Optical Ecommerce Specific) */}
                    {order.prescription && (
                        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                                <h2 className="text-sm font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-neutral-500" />
                                    Optical Prescription Details
                                </h2>
                                {order.prescription.fileUrl && (
                                    <a
                                        href={order.prescription.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                                    >
                                        View Attachment <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-center text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50 text-neutral-400 font-black uppercase border-b border-neutral-200">
                                            <th className="py-2.5 px-3 text-left">Eye</th>
                                            <th className="py-2.5 px-3">SPH (Sphere)</th>
                                            <th className="py-2.5 px-3">CYL (Cylinder)</th>
                                            <th className="py-2.5 px-3">Axis</th>
                                            <th className="py-2.5 px-3">ADD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 font-mono font-bold text-neutral-800">
                                        <tr>
                                            <td className="py-3 px-3 text-left font-sans font-bold text-neutral-500">OD (Right)</td>
                                            <td className="py-3 px-3">{order.prescription.odSph || '0.00'}</td>
                                            <td className="py-3 px-3">{order.prescription.odCyl || '0.00'}</td>
                                            <td className="py-3 px-3">{order.prescription.odAxis || '-'}</td>
                                            <td className="py-3 px-3">{order.prescription.odAdd || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-3 text-left font-sans font-bold text-neutral-500">OS (Left)</td>
                                            <td className="py-3 px-3">{order.prescription.osSph || '0.00'}</td>
                                            <td className="py-3 px-3">{order.prescription.osCyl || '0.00'}</td>
                                            <td className="py-3 px-3">{order.prescription.osAxis || '-'}</td>
                                            <td className="py-3 px-3">{order.prescription.osAdd || '-'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {order.prescription.pd && (
                                <div className="pt-2 border-t border-neutral-100 text-xs font-semibold text-neutral-600 flex justify-between">
                                    <span>Pupillary Distance (PD):</span>
                                    <span className="font-mono font-bold text-neutral-900">{order.prescription.pd} mm</span>
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* Right Column: Order Controls & Customer Info */}
                <div className="space-y-6">

                    {/* Status Management Panel */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                            Order Status Controls
                        </h2>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                                    Fulfillment Status
                                </label>
                                <select
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                                    Payment Status
                                </label>
                                <select
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="refunded">Refunded</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="text-sm font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                            <User className="w-4 h-4 text-neutral-500" />
                            Customer Account
                        </h2>

                        <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                            {order.user?.image ? (
                                <img src={order.user.image} alt={order.user.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-600">
                                    {order.user?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-neutral-900 text-sm">{order.user?.name || 'Guest User'}</p>
                                <p className="text-xs text-neutral-400">{order.user?.email || 'No email provided'}</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs font-medium text-neutral-600">
                            {order.user?.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                                    <span>{order.user.phone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                                <span>{order.user?.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm space-y-3">
                        <h2 className="text-sm font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-neutral-500" />
                            Shipping Destination
                        </h2>

                        {order.shippingAddress ? (
                            <div className="text-xs font-medium text-neutral-600 leading-relaxed">
                                <p className="font-bold text-neutral-900">{order.shippingAddress.fullName || order.user?.name}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        ) : (
                            <p className="text-xs text-neutral-400">No shipping address recorded for this order.</p>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}