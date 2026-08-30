"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Glasses,
  User,
  FileText,
  Download,
  Save,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";

export default function EditCustomOrderPage({ params }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState(null);

  // Editable States
  const [deliveryStatus, setDeliveryStatus] = useState("processing");
  const [labStatus, setLabStatus] = useState("frame_selection");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/admin/api/custom-orders/${orderId}`);
        const data = await res.json();
        if (!data.success) {
          setOrder(null);
          toast.error(data.message);
          return;
        }
        setOrder(data.order);
        setDeliveryStatus(data.order.deliveryStatus || "processing");
        setLabStatus(data.order.frame.name || "frame_selection");
        setPaymentStatus(data.order.paymentStatus || "pending");
        setTrackingNumber(data.order.trx || "");
        setAdminNotes(data.order.adminNotes || "");
      } catch (error) {
        console.error("Failed to load custom order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`/admin/api/custom-orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryStatus,
          labStatus,
          paymentStatus,
          trx: trackingNumber,
          adminNotes,
        }),
      });

      if (res.ok) {
        alert("Custom Order updated successfully!");
        router.refresh();
      } else {
        alert("Failed to update order status.");
      }
    } catch (err) {
      console.error("Error updating custom order:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-900 border-t-transparent"></div>
        <p className="text-sm font-bold text-neutral-600 mt-4">
          Loading Order Specs...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center">
        <AlertCircle className="w-10 h-10 mx-auto text-rose-500 mb-2" />
        <h2 className="text-lg font-bold text-neutral-900">
          Custom Order Not Found
        </h2>
        <Link
          href="/admin/custom-orders"
          className="text-xs font-bold text-neutral-600 underline mt-2 block"
        >
          Return to Custom Orders
        </Link>
      </div>
    );
  }

  const { frame = {}, lens = {}, customer = {} } = order;

  return (
    <form onSubmit={handleSave} className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/custom-orders"
            className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-neutral-900">
                Custom Order #{order._id}
              </h1>
              <span className="text-xs px-2.5 py-0.5 font-bold bg-neutral-100 rounded-full text-neutral-700 border">
                Custom Ainak
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Placed on{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Update Order"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns (Item Details + Prescription) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Frame & Lens Items Breakdown */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Glasses className="w-4 h-4 text-neutral-900" /> Configured
              Eyewear Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Frame Details */}
              <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                <div className="relative w-20 h-20 bg-white rounded-lg border border-neutral-200 shrink-0 overflow-hidden flex items-center justify-center">
                  {frame.image ? (
                    <Image
                      src={frame.image}
                      alt={frame.name || "Frame"}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <Glasses className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">
                    Frame Selection
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {frame.name || "N/A"}
                  </h3>
                  <p className="text-xs font-bold text-neutral-600 mt-1">
                    ${frame.price}
                  </p>
                </div>
              </div>

              {/* Lens Details */}
              <div className="flex items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                <div className="relative w-20 h-20 bg-white rounded-lg border border-neutral-200 shrink-0 overflow-hidden flex items-center justify-center">
                  {lens.image ? (
                    <Image
                      src={lens.image}
                      alt={lens.name || "Lens"}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <Glasses className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-neutral-400">
                    Lens Coating
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">
                    {lens.name || "Standard"}
                  </h3>
                  <p className="text-[11px] text-neutral-500">{lens.desc}</p>
                  <p className="text-xs font-bold text-neutral-600 mt-1">
                    +${lens.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Attachment */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-900" /> Optical
              Prescription (RX)
            </h2>

            {order.prescriptionUrl ? (
              <div className="flex items-center justify-between p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">
                      Prescription Attached
                    </p>
                    <p className="text-xs text-neutral-400">
                      Uploaded during checkout
                    </p>
                  </div>
                </div>

                <a
                  href={order.prescriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 hover:border-neutral-900 text-xs font-bold text-neutral-800 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> View Prescription
                </a>
              </div>
            ) : (
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl text-amber-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Prescription Pending</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Customer chose to send optical prescription details later
                    via WhatsApp or Email.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Customer & Delivery Address Details */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-neutral-900" /> Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <span className="text-neutral-400 font-semibold block">
                  Full Name
                </span>
                <span className="text-sm font-bold text-neutral-900 mt-0.5 block">
                  {customer?.firstName} {customer?.lastName}
                </span>
              </div>

              <div>
                <span className="text-neutral-400 font-semibold block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-500" /> Shipping
                  Destination
                </span>
                <span className="text-neutral-800 font-bold block mt-0.5">
                  {customer?.address}
                </span>
                <span className="text-neutral-500 block uppercase font-bold text-[10px] mt-0.5">
                  {customer?.city}, {customer?.province}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Fulfillment Controls & Order Summary) */}
        <div className="space-y-6">
          {/* Status Management Panel */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900">
              Fulfillment Controls
            </h2>

            {/* Lab Manufacturing Stage */}
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">
                Optical Lab Pipeline Status
              </label>
              <select
                value={labStatus}
                onChange={(e) => setLabStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 outline-none focus:border-neutral-900"
              >
                <option value="frame_selection">1. Frame Preparation</option>
                <option value="lens_cutting">2. Lens Cutting & Edging</option>
                <option value="quality_check">
                  3. Prescription Quality Check
                </option>
                <option value="ready_for_dispatch">
                  4. Ready for Dispatch
                </option>
              </select>
            </div>

            {/* General Delivery Status */}
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">
                Shipping / Delivery Status
              </label>
              <select
                value={deliveryStatus}
                onChange={(e) => setDeliveryStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 outline-none focus:border-neutral-900"
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full py-2.5 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 outline-none focus:border-neutral-900"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Courier Tracking Number */}
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">
                Tracking Code
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. TCS-98230192"
                className="w-full py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* Internal Admin Notes */}
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">
                Internal Lab Notes
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes for lab technician..."
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {/* Price Breakdown Summary */}
          <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Payment Summary
            </div>

            <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
              <div className="flex justify-between">
                <span>Frame ({frame.name})</span>
                <span className="font-bold">${frame.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Lens ({lens.name})</span>
                <span className="font-bold">${lens.price}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-3 border-t border-neutral-800">
              <span className="text-xs font-bold text-neutral-400">
                Total Price
              </span>
              <span className="text-2xl font-black">${order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
