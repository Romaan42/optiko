'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    SlidersHorizontal,
    Edit3,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    Package,
    AlertTriangle,
    CheckCircle2,
    Layers,
    X,
    ArrowUpDown
} from 'lucide-react';
import ProductTableSkeleton from '@/components/admin/TableLoading';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedShape, setSelectedShape] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const itemsPerPage = 5;

    const fetchProducts = () => {
        setLoading(true)
        fetch("/api/products").then((res) => res.json()).then((result) => {
            setProducts(result.products);
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.title.toLowerCase().includes(search.toLowerCase())

            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesShape = selectedShape === 'all' || product.shape === selectedShape;
            const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;

            return matchesSearch && matchesCategory && matchesShape && matchesStatus;
        });
    }, [products, search, selectedCategory, selectedShape, selectedStatus]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Metrics Overview
    const metrics = useMemo(() => {
        const total = products.length;
        const active = products.filter(p => p.status === 'active').length;
        const outOfStock = products.filter(p => p.stock === 0 || p.status === 'out_of_stock').length;
        const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

        return { total, active, outOfStock, totalInventoryValue };
    }, [products]);

    // Select All Checkbox Handler
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProductIds(paginatedProducts.map(p => p.id));
        } else {
            setSelectedProductIds([]);
        }
    };

    // Single Select Checkbox Handler
    const handleSelectOne = (id) => {
        setSelectedProductIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Delete Single Product
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            const res = await fetch(`/admin/api/product/${id}`, {
                method: "DELETE",
            })

            const result = await res.json()
            if (result.success) {
                toast.success(result.message)
                fetchProducts()
            }

        }
    };

    // Bulk Delete
    const handleBulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedProductIds.length} selected products?`)) {
            setProducts(prev => prev.filter(p => !selectedProductIds.includes(p.id)));
            setSelectedProductIds([]);
        }
    };

    // Reset Filters
    const handleResetFilters = () => {
        setSearch('');
        setSelectedCategory('all');
        setSelectedShape('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    const isAllSelected = paginatedProducts.length > 0 && paginatedProducts.every(p => selectedProductIds.includes(p.id));

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-16">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-neutral-900">Products Catalog</h1>
                    <p className="text-sm text-neutral-500 mt-0.5">
                        Manage Optiko frames, stock levels, prices, and visibility
                    </p>
                </div>

                <Link
                    href="/admin/add-product"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 text-white font-bold text-sm rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add New Product
                </Link>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-neutral-100 rounded-xl text-neutral-700">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Total Products</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.total}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Active Items</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.active}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Out of Stock</p>
                        <h3 className="text-2xl font-black text-neutral-900">{metrics.outOfStock}</h3>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center gap-4">
                    <div className="p-3 bg-neutral-100 rounded-xl text-neutral-700">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-400 uppercase tracking-wider">Stock Valuation</p>
                        <h3 className="text-2xl font-black text-neutral-900">${metrics.totalInventoryValue.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            {/* Filter & Control Bar */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">

                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by product title, SKU, or material..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Filter Selects */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-neutral-400 hidden sm:block" />
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            >
                                <option value="all">All Categories</option>
                                <option value="Glasses">Glasses</option>
                                <option value="watches">Watches</option>
                            </select>

                            {/* Frame Shape Filter */}
                            <select
                                value={selectedShape}
                                onChange={(e) => { setSelectedShape(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            >
                                <option value="all">All Shapes</option>
                                <option value="Round">Round</option>
                                <option value="Square">Square</option>
                                <option value="Aviator">Aviator</option>
                                <option value="Cat-Eye">Cat-Eye</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            >
                                <option value="all">All Statuses</option>
                                <option value="active">Active</option>
                                <option value="draft">Draft</option>
                                <option value="out_of_stock">Out of Stock</option>
                            </select>
                        </div>

                        {(search || selectedCategory !== 'all' || selectedShape !== 'all' || selectedStatus !== 'all') && (
                            <button
                                onClick={handleResetFilters}
                                className="px-3 py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 underline transition-colors"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Bulk Action Notification Bar */}
                {selectedProductIds.length > 0 && !loading && (
                    <div className="flex items-center justify-between p-3 bg-neutral-900 text-white rounded-xl text-xs font-medium">
                        <div className="flex items-center gap-2 pl-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{selectedProductIds.length} item(s) selected</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete Selected
                            </button>
                            <button
                                onClick={() => setSelectedProductIds([])}
                                className="text-neutral-400 hover:text-white px-2 py-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Table Container */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    {loading && <ProductTableSkeleton />}
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
                                <th className="py-4 px-4">Product Frame</th>
                                <th className="py-4 px-4">Category / Shape</th>
                                <th className="py-4 px-4">Price</th>
                                <th className="py-4 px-4">Stock</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-100 text-sm">

                            {paginatedProducts.length > 0 ? (
                                paginatedProducts.map((product) => {
                                    const isSelected = selectedProductIds.includes(product._id);

                                    return (
                                        <tr
                                            key={product._id}
                                            className={`hover:bg-neutral-50/80 transition-colors ${isSelected ? 'bg-neutral-50' : ''}`}
                                        >
                                            {/* Checkbox */}
                                            <td className="py-4 px-4">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleSelectOne(product._id)}
                                                    className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                                                />
                                            </td>

                                            {/* Product Info & Thumbnail */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-neutral-900 hover:text-neutral-700 cursor-pointer">
                                                            {product.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-xs font-mono text-neutral-400">{product.sku}</span>
                                                            <span className="text-neutral-300">•</span>
                                                            <span className="text-xs text-neutral-400">{product.material}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category & Shape */}
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="text-xs font-bold text-neutral-900">
                                                        {product.category}
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
                                                        {product.shape}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="py-4 px-4">
                                                <div className="font-bold text-neutral-900">
                                                    ${product.price.toFixed(2)}
                                                </div>
                                                {product.comparePrice && (
                                                    <div className="text-xs text-neutral-400 line-through">
                                                        ${product.comparePrice.toFixed(2)}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Stock */}
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`font-bold ${product.stock === 0
                                                            ? 'text-rose-600'
                                                            : product.stock < 10
                                                                ? 'text-amber-600'
                                                                : 'text-neutral-900'
                                                            }`}
                                                    >
                                                        {product.stock} pcs
                                                    </span>
                                                    {product.stock > 0 && product.stock < 10 && (
                                                        <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                                            Low
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-4">
                                                {product.status === 'active' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        Active
                                                    </span>
                                                )}
                                                {product.status === 'draft' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                                                        Draft
                                                    </span>
                                                )}
                                                {product.status === 'out_of_stock' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        title="Quick Preview"
                                                        className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <Link
                                                        href={`/admin/products/edit/${product._id}`}
                                                        title="Edit Product"
                                                        className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        title="Delete Product"
                                                        className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) :
                                !loading && products.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-neutral-400">
                                            <Package className="w-8 h-8 mx-auto mb-2 stroke-[1.5]" />
                                            <p className="text-sm font-bold text-neutral-700">No products found</p>
                                            <p className="text-xs text-neutral-400 mt-0.5">Try adjusting your search terms or filters</p>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer & Pagination */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
                    <div>
                        Showing <span className="font-bold text-neutral-900">{filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
                        <span className="font-bold text-neutral-900">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of{' '}
                        <span className="font-bold text-neutral-900">{filteredProducts.length}</span> entries
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 disabled:opacity-40 disabled:hover:text-neutral-600 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span className="px-3 py-1 font-bold text-neutral-900">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="p-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:text-neutral-900 disabled:opacity-40 disabled:hover:text-neutral-600 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}