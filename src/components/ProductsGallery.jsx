"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, title }) {
    const [selectedImg, setSelectedImg] = useState(0);

    // Fallback if no images are provided
    if (!images || images.length === 0) return null;

    return (
        <div>
            <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200">
                <Image
                    src={images[selectedImg]}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedImg(i)}
                        className={`relative aspect-square bg-neutral-50 rounded-lg border-2 transition-all overflow-hidden ${selectedImg === i ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'
                            }`}
                        aria-label={`View image ${i + 1}`}
                    >
                        <Image
                            src={img}
                            alt={`${title} thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}