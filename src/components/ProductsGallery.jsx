"use client";

import { useState } from "react";
import ClImage from "./ClImage";

export default function ProductGallery({ images, title }) {
    const [selectedImg, setSelectedImg] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div>
            <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200">
                <ClImage
                    src={images[selectedImg]}
                    alt={title}
                    fill
                    removeBackground
                    className="object-contain"
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
                        <ClImage
                            src={img}
                            alt={`${title} thumbnail ${i + 1}`}
                            fill
                            removeBackground
                            className="object-contain"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}