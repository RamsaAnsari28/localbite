function VendorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Image skeleton */}
      <div className="h-60 animate-pulse bg-gray-200" />

      {/* Content skeleton */}
      <div className="space-y-4 p-5">

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-10 animate-pulse rounded-full bg-gray-200" />
        </div>

      </div>
    </div>
  );
}

export default VendorCardSkeleton;