
function LoadingProducts() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-neutral-200 h-80 rounded-lg mb-4"></div>
                            <div className="bg-neutral-200 h-4 rounded w-3/4 mb-2"></div>
                            <div className="bg-neutral-200 h-4 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default LoadingProducts;