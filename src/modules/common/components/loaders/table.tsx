import { Skeleton } from "@/components/ui/skeleton";

export function TableLoading() {
  return (
    <div className="p-4">
      {/* Page Header */}
      <div className="mb-4">
        <Skeleton className="h-8 w-1/3 bg-gray-300" />
      </div>

      {/* Table Header Skeleton */}
      <div className="mb-2 grid grid-cols-1 gap-4">
        <Skeleton className="h-6 w-full bg-gray-300" />
      </div>

      {/* Table Rows Skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 gap-4">
            <Skeleton className="h-6 w-full bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
