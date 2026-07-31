'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Upload,
    X,
    Image as ImageIcon,
    Check
} from 'lucide-react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        comparePrice: '',
        color: '',
        stock: '',
        category: 'Optical',
        shape: 'Round',
        sizes: '',
        brand: "",
        status: 'active'
    });


    // Image Upload State
    const [images, setImages] = useState([]);

    const removeImage = (index) => {
        const remianImages = images.filter((_, i) => i !== index)
        setImages(remianImages)
    }

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/admin/api/add-product", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...formData, images })
        })
        const result = await res.json()
        if (result.success) {
            toast.success(result.message)
            router.push("/admin/products")
        } else {
            toast.error(result.message)
        }

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8 pb-16">

            {/* Top Navigation & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-neutral-900">Add New Product</h1>
                        <p className="text-sm text-neutral-500 mt-0.5">Create a new frame in your store catalog</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/products"
                        className="px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" /> Save Product
                    </button>
                </div>
            </div>

            {/* Main Form Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (2 Cols wide) - Main Details & Media */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Basic Info Card */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-base font-bold text-neutral-900">General Information</h2>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                Product Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Classic Round Acetate Frame"
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the frame design, fit, and craftsmanship..."
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Media Upload Card */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-neutral-900">Product Images</h2>
                            <span className="text-xs text-neutral-500 font-medium">{images.length} images added</span>
                        </div>

                        {/* Drag & Drop Zone */}
                        <CldUploadWidget
                            uploadPreset="optiko"
                            options={{ multiple: true, folder: "optiko_products", maxFileSize: 5000000 }}
                            onSuccess={(result) => {
                                const newUrl = result.info.secure_url;
                                console.log(newUrl)
                                setImages(prev => [...prev, newUrl])

                            }}
                        >
                            {({ open, isUploading }) => {
                                return <div
                                    onClick={() => open()} // click pe widget open hoga
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer border-neutral-300 hover:border-neutral-400 bg-neutral-50/50`}
                                >
                                    <div className="cursor-pointer flex flex-col items-center">
                                        <div className="p-3 bg-white rounded-full border-neutral-200 shadow-sm mb-3">
                                            <Upload className="w-6 h-6 text-neutral-600" />
                                        </div>
                                        <p className="text-sm font-bold text-neutral-900">
                                            {isUploading ? "Uploading..." : "Click to upload"} <span className="font-normal text-neutral-500">or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-neutral-400 mt-1">PNG, JPG, or WEBP (Max 5MB each)</p>
                                    </div>
                                </div>
                            }}
                        </CldUploadWidget>

                        {images.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
                                        <CldImage
                                            width="100"
                                            height={"100"}
                                            src={img}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Cover Image Tag */}
                                        {index === 0 && (
                                            <span className="absolute bottom-2 left-2 bg-neutral-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                                                Main
                                            </span>
                                        )}

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-neutral-900/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    {/* Pricing & Stock Card */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-base font-bold text-neutral-900">Pricing & Inventory</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="149.00"
                                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                    Compare-at Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="comparePrice"
                                    step="0.01"
                                    value={formData.comparePrice}
                                    onChange={handleChange}
                                    placeholder="180.00"
                                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <hr className="border-neutral-100" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                    Colors
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    placeholder="color"
                                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    required
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="25"
                                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column (1 Col wide) - Organization & Options */}
                <div className="space-y-8">

                    {/* Status Card */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
                        <h2 className="text-base font-bold text-neutral-900">Product Status</h2>
                        <div>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            >
                                <option value="active">Active (Visible in store)</option>
                                <option value="draft">Draft (Hidden)</option>
                            </select>
                        </div>
                    </div>

                    {/* Categorization & Attributes Card */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-base font-bold text-neutral-900">Frame Attributes</h2>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            >
                                <option value="Glasses">Glasses</option>
                                <option value="Perfume">Perfume</option>
                                <option value="Watches">Watches </option>
                            </select>
                        </div>

                        <hr className="border-neutral-100" />

                        {/* Frame Shape */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                                Brand
                            </label>
                            <input
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder='enter the brand'
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            />
                            {/* <option value="Round">Round</option>
                                <option value="Square">Square</option>
                                <option value="Aviator">Aviator</option>
                                <option value="Cat-Eye">Cat-Eye</option> */}
                            {/* </select> */}
                        </div>

                        <hr className="border-neutral-100" />

                        {/* Material */}
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                                Sizes
                            </label>
                            <input
                                name="sizes"
                                value={formData.sizes}
                                onChange={handleChange}
                                placeholder='sizes'
                                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </form>
    );
}