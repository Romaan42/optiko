const CartLoader = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-4 items-start pb-6 border-b border-neutral-100 last:border-0 last:pb-0"
                >
                    <div className="w-24 aspect-4/3 bg-neutral-200 rounded-xl overflow-hidden flex items-center justify-center p-2 shrink-0">
                        <div className="w-full h-full bg-neutral-300 rounded-xl" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex justify-between items-start mb-1">
                            <div className="h-4 w-2/3 bg-neutral-200 rounded-full" />
                            <div className="h-4 w-14 bg-neutral-200 rounded-full" />
                        </div>
                        <div className="h-3 w-1/2 bg-neutral-200 rounded-full" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center border border-neutral-200 bg-neutral-100 rounded-lg p-0.5 gap-2">
                                <div className="w-7 h-7 bg-neutral-200 rounded" />
                                <div className="w-8 h-5 bg-neutral-200 rounded" />
                                <div className="w-7 h-7 bg-neutral-200 rounded" />
                            </div>
                            <div className="w-8 h-8 bg-neutral-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartLoader;