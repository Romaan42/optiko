export default function CheckoutSkeleton() {
    return (
        <div className="min-h-screen bg-white pt-28 pb-24 animate-pulse">
            <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">

                {/* Left: Form Skeleton */}
                <div className="space-y-4">
                    <div className="h-9 w-72 bg-neutral-200 rounded-lg"></div>

                    <div className="h-12 bg-neutral-200 rounded-lg"></div>
                    <div className="h-12 bg-neutral-200 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-12 bg-neutral-200 rounded-lg"></div>
                        <div className="h-12 bg-neutral-200 rounded-lg"></div>
                    </div>
                    <div className="h-14 bg-neutral-300 rounded-xl"></div>
                </div>

                {/* Right: Summary Skeleton */}
                <div className="bg-neutral-50 p-6 rounded-2xl h-fit">
                    <div className="h-8 w-48 bg-neutral-200 rounded-lg mb-4"></div>

                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex justify-between py-2">
                            <div className="h-4 w-40 bg-neutral-200 rounded"></div>
                            <div className="h-4 w-20 bg-neutral-200 rounded"></div>
                        </div>
                    ))}

                    <hr className="my-4" />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                            <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-6 w-28 bg-neutral-300 rounded"></div>
                            <div className="h-6 w-28 bg-neutral-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}