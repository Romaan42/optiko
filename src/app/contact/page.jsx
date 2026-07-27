'use client'
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
                <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Concierge</p>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-xl leading-tight">
                    How can we help you?
                </h1>
                <p className="mt-4 text-base text-neutral-500 max-w-xl font-medium">
                    Whether you need assistance finding the perfect frame frame size, tracking an order, or arranging a private fitting, our concierge team is at your disposal.
                </p>
            </div>

            {/* Main Content Split Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Direct Contact Info */}
                    <div className="lg:col-span-5 space-y-10">
                        {/* Support Cards Group */}
                        <div className="space-y-6">
                            <div className="flex gap-4 p-5 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shrink-0 h-fit">
                                    <Mail className="w-5 h-5 text-neutral-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">Email Us</h3>
                                    <a href="mailto:support@domain.com" className="text-base font-bold text-neutral-900 hover:text-neutral-600 transition-colors block mb-1">
                                        concierge@eyewear.com
                                    </a>
                                    <p className="text-xs text-neutral-500 font-medium">We respond within 12 business hours.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shrink-0 h-fit">
                                    <Phone className="w-5 h-5 text-neutral-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">Call Concierge</h3>
                                    <a href="tel:+18005550199" className="text-base font-bold text-neutral-900 hover:text-neutral-600 transition-colors block mb-1">
                                        +1 (800) 555-0199
                                    </a>
                                    <p className="text-xs text-neutral-500 font-medium">Mon—Fri, 9:00 AM to 6:00 PM EST</p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shrink-0 h-fit">
                                    <MapPin className="w-5 h-5 text-neutral-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-1">Flagship Studio</h3>
                                    <p className="text-base font-bold text-neutral-900 mb-1">
                                        742 Mercer Street, Soho
                                    </p>
                                    <p className="text-xs text-neutral-500 font-medium">New York, NY 10012</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-neutral-200" />

                        {/* Secondary Quick Links */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">Self-Service Portals</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <a href="#returns" className="flex items-center justify-between p-3.5 bg-white border border-neutral-200 rounded-xl text-xs font-bold hover:border-neutral-900 transition-colors">
                                    Returns & Exchanges <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                                </a>
                                <a href="#tracking" className="flex items-center justify-between p-3.5 bg-white border border-neutral-200 rounded-xl text-xs font-bold hover:border-neutral-900 transition-colors">
                                    Track Your Order <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
                        <h2 className="text-xl font-bold tracking-tight mb-2">Send an Inquiry</h2>
                        <p className="text-sm text-neutral-500 font-medium mb-8">
                            Fill out the details below and a client advisor will connect with you shortly.
                        </p>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                        placeholder="Devon"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                                    placeholder="johndevon@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Inquiry Type</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all appearance-none cursor-pointer"
                                        defaultValue="general"
                                    >
                                        <option value="general">General Client Support</option>
                                        <option value="styling">Virtual Frame Styling Advice</option>
                                        <option value="wholesale">Wholesale & Optical Partnerships</option>
                                        <option value="press">Press & Media</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400">
                                        {/* Styled dropdown indicator arrow downward */}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Your Message</label>
                                <textarea
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
                                    placeholder="Please describe how we can assist you with our collections..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-neutral-900 text-white font-bold rounded-xl text-sm transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-md hover:bg-neutral-800"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}