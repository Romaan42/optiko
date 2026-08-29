"use client";
import RecentOrdersTable from "@/components/admin/OrderTable";
import OrderTable from "@/components/admin/OrderTable";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // API se data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Apni API ka URL yahan lagao
      const res = await fetch("/admin/api/dashboard");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
        setRevenue(data.revenue);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard", error);
    }
    setLoading(false);
  };

  // CSV Report Download
  const downloadReport = () => {
    const headers = ["Order ID", "Customer", "Date", "Amount", "Status"];
    const rows = orders.map((o) => [o.id, o.name, o.date, o.amount, o.status]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <div className="p-2 bg-neutral-50 rounded-lg">
          <Icon className="w-4 h-4 text-neutral-700" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-black text-neutral-900">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-neutral-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <button
          onClick={downloadReport}
          className="hidden sm:block px-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors"
        >
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${revenue || 0}`}
          icon={DollarSign}
          changeType="up"
        />
        <StatCard
          title="Orders"
          value={orders.length || 0}
          icon={ShoppingCart}
          changeType="down"
        />

        <Link
          href={"/admin/add-product"}
          className="bg-white border border-neutral-200 rounded-xl p-6 flex-col justify-center items-center text-center border-dashed hover:border-neutral-400 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-neutral-200 transition-colors">
            <span className="text-neutral-600 font-black text-lg">+</span>
          </div>
          <h3 className="text-sm font-bold text-neutral-900">
            Add New Product
          </h3>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <RecentOrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
