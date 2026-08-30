"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Upload,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function CheckoutPage() {
  const router = useRouter();
  const [orderSummary, setOrderSummary] = useState();

  const [selectedPayment, setSelectedPayment] = useState("cod"); // 'card' | 'cod'

  useEffect(() => {
    const result = localStorage.getItem("customOrder");
    if (!result) {
      return router.push("/");
    }

    setOrderSummary(JSON.parse(result));
  }, []);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const { firstName, lastName, address, province, city } = e.target;
    const customerAddress = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      province: province.value,
      city: city.value,
    };

    const res = await fetch("/api/custom-order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        frame: orderSummary.frame,
        lens: orderSummary.lens,
        totalPrice: orderSummary.totalPrice,
        customerAddress,
      }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.removeItem("customOrder");
      router.push(`/order/${result.order._id}`);
    } else {
      alert(result.message);
    }
    // alert("Order placed successfully! Thank you for choosing us.");
  };

  if (!orderSummary) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#custom-order"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Custom Builder
          </Link>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit SSL Encryption
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          Checkout & Prescription
        </h1>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Form Details (8 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-semibold">
                  2
                </span>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-semibold">
                  3
                </span>
                Payment
              </h2>

              <div className="space-y-3 mb-6">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedPayment === "cod"
                      ? "border-neutral-900 ring-2 ring-neutral-900 bg-neutral-50"
                      : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === "cod"}
                      onChange={() => setSelectedPayment("cod")}
                    />
                    <span className="font-semibold text-sm">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <Truck className="w-5 h-5 text-neutral-500" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm sticky top-8 space-y-6">
              <h2 className="text-xl font-bold pb-4 border-b border-neutral-100">
                Order Summary
              </h2>

              {/* Product Card */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center p-2 shrink-0">
                  <Image
                    src={orderSummary.frame.image}
                    alt={orderSummary.frame.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">
                    {orderSummary.frame.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Finish: {orderSummary.frame.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Lens: {orderSummary.lens.name} * Price:{" "}
                    {orderSummary.lens.price}
                  </p>
                </div>
                <div className="font-bold text-sm">
                  Rs: {orderSummary.totalPrice}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-4 space-y-3 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Frame Subtotal</span>
                  <span>Rs: {orderSummary.frame?.price?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Lens Option</span>
                  <span>Rs: {orderSummary.lens?.price?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between font-bold text-lg text-neutral-900 pt-3 border-t border-neutral-100">
                  <span>Total</span>
                  <span>Rs: {orderSummary.totalPrice?.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> Place Order ($
                {orderSummary.totalPrice?.toFixed(2)})
              </button>

              {/* Guarantees */}
              <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    30-Day Money-Back Guarantee & Lifetime Frame Warranty
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Free Express Shipping with Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
