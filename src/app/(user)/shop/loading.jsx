const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Top Header & Sort Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-4 w-32 bg-neutral-200 rounded-md"></div>
        <div className="h-10 w-44 bg-neutral-200 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Skeleton (Filters) */}
        <div className="hidden lg:block space-y-8 pr-6 border-r border-neutral-100">
          {/* Category Filter */}
          <div className="space-y-3">
            <div className="h-3 w-20 bg-neutral-200 rounded mb-4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 w-24 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>

          <hr className="border-neutral-100" />

          {/* Frame Shape Filter */}
          <div className="space-y-3">
            <div className="h-3 w-24 bg-neutral-200 rounded mb-4"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 w-20 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>

          <hr className="border-neutral-100" />

          {/* Material Filter */}
          <div className="space-y-3">
            <div className="h-3 w-20 bg-neutral-200 rounded mb-4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-4 h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 w-28 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Products Grid Skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="space-y-3">
                {/* Product Image Card */}
                <div className="w-full h-64 bg-neutral-200 rounded-2xl"></div>

                {/* Category & Price Row */}
                <div className="flex items-center justify-between pt-1">
                  <div className="h-3 w-16 bg-neutral-200 rounded"></div>
                  <div className="h-4 w-14 bg-neutral-200 rounded"></div>
                </div>

                {/* Title */}
                <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
