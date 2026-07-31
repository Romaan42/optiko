export default function ProductTableSkeleton({ rows = 5 }) {
    return (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                            <th className="py-4 px-4 w-10"><div className="w-4 h-4 bg-neutral-200 rounded"></div></th>
                            <th className="py-4 px-4">Product Frame</th>
                            <th className="py-4 px-4">Category / Shape</th>
                            <th className="py-4 px-4">Price</th>
                            <th className="py-4 px-4">Stock</th>
                            <th className="py-4 px-4">Status</th>
                            <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-100">
                        {Array.from({ length: rows }).map((_, i) => (
                            <tr key={i} className="hover:bg-neutral-50/80">
                                {/* Checkbox */}
                                <td className="py-4 px-4">
                                    <div className="w-4 h-4 bg-neutral-200 rounded"></div>
                                </td>

                                {/* Product Info */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-200 shrink-0"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-40 bg-neutral-200 rounded"></div>
                                            <div className="h-2 w-24 bg-neutral-200 rounded"></div>
                                        </div>
                                    </div>
                                </td>

                                {/* Category & Shape */}
                                <td className="py-4 px-4">
                                    <div className="space-y-2">
                                        <div className="h-3 w-20 bg-neutral-200 rounded"></div>
                                        <div className="h-2 w-16 bg-neutral-200 rounded"></div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="py-4 px-4">
                                    <div className="h-3 w-16 bg-neutral-200 rounded"></div>
                                    <div className="h-2 w-12 bg-neutral-200 rounded mt-1"></div>
                                </td>

                                {/* Stock */}
                                <td className="py-4 px-4">
                                    <div className="h-3 w-12 bg-neutral-200 rounded"></div>
                                </td>

                                {/* Status */}
                                <td className="py-4 px-4">
                                    <div className="h-6 w-20 bg-neutral-200 rounded-full"></div>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Skeleton */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
                <div className="h-3 w-40 bg-neutral-200 rounded"></div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                    <div className="h-3 w-24 bg-neutral-200 rounded"></div>
                    <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    )
}