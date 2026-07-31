'use client'
import { useState } from "react";
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import { Upload, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function UploadTestPage() {
    const [images, setImages] = useState([]);

    const removeImage = (url) => {
        setImages(prev => prev.filter(u => u !== url));
    }

    return (
        <div className="min-h-screen bg-neutral-50 p-8">
            <Toaster />

            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-black text-neutral-900 mb-2">Cloudinary Upload Test</h1>
                <p className="text-neutral-500 mb-8">Simple upload with next-cloudinary</p>

                {/* Upload Button with Drag Drop */}
                <CldUploadWidget
                    uploadPreset="optiko"
                    options={{
                        multiple: true,
                        folder: "test_uploads",
                        maxFileSize: 5000000 // 5MB
                    }}
                    onSuccess={(result) => {
                        console.log(result)
                        toast.success("Image Uploaded!");
                    }}
                    onError={() => toast.error("Upload Failed")}
                >
                    {({ open, isUploading }) => (
                        <div
                            onClick={() => open()}
                            className="border-2 border-dashed border-neutral-300 hover:border-neutral-900 rounded-2xl p-12 text-center cursor-pointer transition-all bg-white"
                        >
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-neutral-100 rounded-full mb-4">
                                    <Upload className="w-8 h-8 text-neutral-700" />
                                </div>
                                <p className="text-lg font-bold text-neutral-900">
                                    {isUploading ? "Uploading..." : "Click or Drag to Upload"}
                                </p>
                                <p className="text-sm text-neutral-400 mt-1">PNG, JPG, WEBP</p>
                            </div>
                        </div>
                    )}
                </CldUploadWidget>


            </div>
        </div>
    )
}