export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-125 bg-neutral-800 flex items-center justify-center">
        <div className="space-y-4 text-center px-4">
          <div className="h-10 w-3/4 max-w-md bg-neutral-700 mx-auto rounded-lg"></div>
          <div className="h-4 w-1/2 max-w-sm bg-neutral-700 mx-auto rounded"></div>
          <div className="h-12 w-36 bg-neutral-700 mx-auto rounded-full mt-6"></div>
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-neutral-200 rounded"></div>
          <div className="h-6 w-24 bg-neutral-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <div className="w-full h-64 bg-neutral-200 rounded-xl"></div>
              <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              <div className="h-4 w-1/2 bg-neutral-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section Skeleton (Static structural match) */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 mb-4 bg-neutral-800 rounded-full"></div>
                <div className="h-6 w-36 bg-neutral-800 rounded mb-2"></div>
                <div className="h-4 w-64 bg-neutral-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
