"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import ClImage from "@/components/ClImage";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function UserOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Default to true to prevent initial layout flashing
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.loading && !user.user) {
      return router.push("/login");
    }

    if (user.user) {
      setLoading(true);
      fetch("/api/orders", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setOrders(result.orders || []);
          } else {
            toast.error(result.message);
          }
        })
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case "In Transit":
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5" /> In Transit
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
    }
  };

  return (
    <main className="bg-neutral-50/50 min-h-screen pt-28 sm:pt-36 pb-16">
      <Toaster />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Check the status of recent orders and manage your purchases.
            </p>
          </div>
          {!loading && (
            <span className="self-start sm:self-auto text-xs font-medium text-neutral-600 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-xl shadow-xs">
              Total Orders: {orders?.length}
            </span>
          )}
        </div>

        {/* Skeleton Loading State */}
        {loading || user.loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 animate-pulse"
              >
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div className="h-4 w-32 bg-neutral-200 rounded"></div>
                  <div className="h-6 w-24 bg-neutral-200 rounded-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 bg-neutral-200 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/3 bg-neutral-200 rounded"></div>
                    <div className="h-3 w-1/4 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : orders?.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
            <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              No orders yet
            </h3>
            <p className="text-neutral-500 text-sm mb-6">
              When you purchase frames or lenses, your order history will appear
              here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white font-medium text-sm rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden hover:border-neutral-300 transition-colors"
              >
                {/* Order Header */}
                <div className="bg-neutral-50/60 px-6 py-4 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                    <div>
                      <span className="text-neutral-500 block text-xs">
                        Order ID
                      </span>
                      <span className="font-bold text-neutral-900">
                        #{order._id}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-xs">
                        Date Placed
                      </span>
                      <span className="font-medium text-neutral-700">
                        {new Date(order.createdAt).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-xs">
                        Total Amount
                      </span>
                      <span className="font-bold text-neutral-950">
                        Rs: {order.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>{getStatusBadge(order.deliveryStatus)}</div>
                </div>

                {/* Items List */}
                <div className="p-6 divide-y divide-neutral-100">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-16 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-neutral-100">
                          <ClImage
                            src={item.image}
                            alt={item.title}
                            fill
                            quality={50}
                            className="object-contain p-2 mix-blend-multiply"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                            {item.product.category}{" "}
                            {item.shape ? `• ${item.shape}` : ""}
                          </p>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-bold text-neutral-900 hover:text-blue-600 transition-colors text-sm sm:text-base line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-semibold text-neutral-900 text-sm sm:text-base">
                          Rs: {item.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div className="bg-neutral-50/30 px-6 py-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-neutral-400" /> Standard
                    Delivery
                  </span>
                  <Link
                    href={`/orders/${order._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-blue-600 transition-colors"
                  >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
