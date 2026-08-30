"use client";

import { useState } from "react";
import {
  Check,
  ShoppingBag,
  Sparkles,
  Layers,
  Palette,
  Eye,
} from "lucide-react";
import ClImage from "../ClImage";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const frames = [
  {
    id: "classic-round",
    name: "Classic Round",
    price: 120,
    image:
      "https://res.cloudinary.com/druroxxha/image/upload/v1788074419/ralph-9038-black-3_ttv7wy.webp",
  },
  {
    id: "bold-square",
    name: "Bold Square",
    price: 140,
    image:
      "https://res.cloudinary.com/druroxxha/image/upload/v1787754913/optiko_products/hxkxubsea9zv1ebat8tf.webp",
  },
  {
    id: "sleek-aviator",
    name: "Sleek Aviator",
    price: 160,
    image:
      "https://res.cloudinary.com/druroxxha/image/upload/v1788074596/LR23-2_jvqbum.webp",
  },
];

const colors = [
  { id: "black", name: "Jet Black", hex: "#171717" },
  { id: "tortoiseshell", name: "Tortoiseshell", hex: "#854d0e" },
  { id: "crystal", name: "Crystal Clear", hex: "#e5e7eb" },
];

const lenses = [
  {
    id: "standard",
    name: "Standard RX (Single Vision)",
    price: 0,
    desc: "Free with every frame",
    image:
      "https://res.cloudinary.com/druroxxha/image/upload/v1788074690/images_1_bicqpi.jpg",
    tintClass: "bg-blue-500/5",
  },
  {
    id: "blue-light",
    name: "Blue Light Blocking",
    price: 40,
    desc: "Protects eyes from screens",
    image:
      "https://res.cloudinary.com/druroxxha/image/upload/v1788074689/images_gcrank.jpg",
    tintClass: "bg-blue-500/20",
  },
];

export default function CustomOrderBuilder() {
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.user);
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedLens, setSelectedLens] = useState(lenses[0]);
  const [activeTab, setActiveTab] = useState("frame");

  const totalPrice = selectedFrame.price + selectedLens.price;

  const handleAddToCart = () => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    const customOrder = {
      frame: selectedFrame,
      color: selectedColor,
      lens: selectedLens,
      totalPrice,
    };
    localStorage.setItem("customOrder", JSON.stringify(customOrder));
    router.push("/custom-order");
  };

  return (
    <section
      className="py-12 md:py-24 bg-slate-50/50 text-slate-900 pb-32 lg:pb-24"
      id="custom-order"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-900 text-white mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive
            Studio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Design Your Custom Ainak
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            Handcraft your dream eyeglasses. Pick your frame architecture, color
            palette, and high-performance lenses.
          </p>
        </div>

        {/* Mobile Step Navigator Tabs */}
        <div className="flex lg:hidden justify-around bg-white p-1.5 rounded-2xl border border-neutral-200/80 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab("frame")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "frame"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 1. Frame
          </button>
          <button
            onClick={() => setActiveTab("color")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "color"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600"
            }`}
          >
            <Palette className="w-3.5 h-3.5" /> 2. Color
          </button>
          <button
            onClick={() => setActiveTab("lens")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "lens"
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> 3. Lens
          </button>
        </div>

        {/* Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Canvas Sticky Preview (5/12 Columns) */}
          <div className="lg:col-span-6 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 sticky top-6 shadow-xl shadow-neutral-100/50 z-50">
            {/* Visual Workspace Canvas */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl bg-gradient-to-b from-neutral-100 to-neutral-200/60 border border-neutral-200/60 flex items-center justify-center p-6 overflow-hidden ">
              {/* Dynamic Aura Glow */}
              <div
                className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl opacity-30 transition-all duration-700"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Tint Overlay */}
              <div
                className={`absolute inset-4 rounded-xl transition-colors duration-500 pointer-events-none ${selectedLens.tintClass}`}
              />

              {/* Main Glasses Image Layer */}
              <div className="relative w-full h-full flex items-center justify-center">
                <ClImage
                  src={selectedFrame.image}
                  alt={`${selectedFrame.name} - ${selectedColor.name}`}
                  fill
                  removeBackground
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-2xl transition-all duration-500 transform hover:scale-105"
                  priority
                />
              </div>

              {/* Selected Attributes Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200 text-xs font-bold shadow-sm">
                <span
                  className="w-3 h-3 rounded-full border border-neutral-300"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span>{selectedColor.name}</span>
              </div>
            </div>

            {/* Price & Primary CTA Desktop View */}
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {selectedFrame.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Finish:{" "}
                    <span className="font-semibold text-neutral-700">
                      {selectedColor.name}
                    </span>{" "}
                    • Lens:{" "}
                    <span className="font-semibold text-neutral-700">
                      {selectedLens.name}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">
                    Total Price
                  </span>
                  <span className="text-2xl font-black text-neutral-900">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="hidden lg:flex mt-6 w-full bg-neutral-900 text-white py-4 px-6 rounded-2xl font-bold items-center justify-center gap-3 hover:bg-neutral-800 transition-all shadow-lg active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" /> Order Custom Ainak
              </button>
            </div>
          </div>

          {/* Right Column: Controls & Configuration Panel (7/12 Columns) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            {/* Step 1: Select Frame Style */}
            <div
              className={`${activeTab === "frame" ? "block" : "hidden"} lg:block bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Choose Frame Silhouette
                </h3>
                <span className="text-xs text-neutral-400">
                  {frames.length} Styles Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {frames.map((frame) => {
                  const isSelected = selectedFrame.id === frame.id;
                  return (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={`relative p-4 rounded-2xl border text-left transition-all flex flex-col items-center justify-between text-center ${
                        isSelected
                          ? "border-neutral-900 ring-2 ring-neutral-900 bg-neutral-900/5 shadow-sm"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <div className="relative w-full h-20 sm:h-24 my-2">
                        <ClImage
                          src={frame.image}
                          alt={frame.name}
                          fill
                          removeBackground
                          sizes="150px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-neutral-900">
                          {frame.name}
                        </div>
                        <div className="text-xs font-semibold text-neutral-500 mt-0.5">
                          ${frame.price}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-neutral-900 text-white p-1 rounded-full">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Color Finish */}
            <div
              className={`${activeTab === "color" ? "block" : "hidden"} lg:block bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Select Color Finish
                </h3>
                <span className="text-xs text-neutral-400">
                  {colors.length} Finishes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {colors.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? "border-neutral-900 ring-2 ring-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 hover:border-neutral-300 bg-white text-neutral-800"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-neutral-300 shrink-0 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Select Lens Coating */}
            <div
              className={`${activeTab === "lens" ? "block" : "hidden"} lg:block bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Choose Prescription Lens
                </h3>
                <span className="text-xs text-neutral-400">UV Protected</span>
              </div>

              <div className="space-y-3">
                {lenses.map((lens) => {
                  const isSelected = selectedLens.id === lens.id;
                  return (
                    <button
                      key={lens.id}
                      onClick={() => setSelectedLens(lens)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-neutral-900 ring-2 ring-neutral-900 bg-neutral-900/5 shadow-sm"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          <ClImage
                            src={lens.image}
                            alt={lens.name}
                            fill
                            removeBackground
                            sizes="60px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-neutral-900">
                            {lens.name}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {lens.desc}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs sm:text-sm font-black ml-4 shrink-0 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200">
                        {lens.price === 0 ? "Free" : `+$${lens.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 lg:hidden z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-500">Total Price</div>
            <div className="text-xl font-black text-neutral-900">
              ${totalPrice}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 max-w-xs bg-neutral-900 text-white py-3.5 px-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 text-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Checkout now
          </button>
        </div>
      </div>
    </section>
  );
}
