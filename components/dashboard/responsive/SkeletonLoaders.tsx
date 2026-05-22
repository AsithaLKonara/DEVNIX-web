import React from 'react';

/**
 * Single Shimmer Element
 */
export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#2d2d4e]/30 rounded-lg ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/**
 * Metric Card Skeleton
 */
export function CardSkeleton() {
  return (
    <div className="bg-[#1a1a2e]/55 border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="h-8 w-8 rounded-full" />
      </div>
      <Shimmer className="h-8 w-16 mt-3" />
      <Shimmer className="h-3 w-36 mt-2" />
    </div>
  );
}

/**
 * Table Row/List Item Skeleton
 */
export function RowSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#2d2d4e]/40 last:border-b-0">
      <div className="flex items-center gap-3">
        <Shimmer className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-20" />
        </div>
      </div>
      <div className="flex gap-4">
        <Shimmer className="h-4 w-24 hidden sm:block" />
        <Shimmer className="h-4 w-16" />
      </div>
    </div>
  );
}

/**
 * Full Table Skeleton (Desktop) / Card Grid Skeleton (Mobile)
 */
export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center pb-3 border-b border-[#2d2d4e]">
        <Shimmer className="h-5 w-40" />
        <Shimmer className="h-8 w-24" />
      </div>
      
      {/* Rows */}
      <div className="space-y-1">
        {Array.from({ length: rows }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Chart Skeleton Loader
 */
export function ChartSkeleton() {
  return (
    <div className="bg-[#1a1a2e]/55 border border-[#2d2d4e] rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <Shimmer className="h-5 w-48" />
        <div className="flex gap-2">
          <Shimmer className="h-6 w-16" />
          <Shimmer className="h-6 w-16" />
        </div>
      </div>
      
      {/* Visual Bar Graph Simulation */}
      <div className="h-48 flex items-end gap-3 pt-6 border-b border-l border-[#2d2d4e]/50 pl-2 pb-2">
        <Shimmer className="w-full h-[30%] rounded-t-md" />
        <Shimmer className="w-full h-[60%] rounded-t-md" />
        <Shimmer className="w-full h-[45%] rounded-t-md" />
        <Shimmer className="w-full h-[80%] rounded-t-md" />
        <Shimmer className="w-full h-[55%] rounded-t-md" />
        <Shimmer className="w-full h-[70%] rounded-t-md" />
        <Shimmer className="w-full h-[90%] rounded-t-md" />
      </div>
      
      <div className="flex justify-between pt-1">
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
        <Shimmer className="h-3 w-8" />
      </div>
    </div>
  );
}

/**
 * Full Dashboard View Loading Skeleton
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <Shimmer className="h-10 w-28" />
          <Shimmer className="h-10 w-32" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Split Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content (Table/Chart) */}
        <div className="lg:col-span-2 space-y-6">
          <ChartSkeleton />
        </div>
        
        {/* Sidebar Widgets (List) */}
        <div className="bg-[#1a1a2e]/55 border border-[#2d2d4e] rounded-xl p-5 space-y-4">
          <Shimmer className="h-5 w-32" />
          <div className="divide-y divide-[#2d2d4e]/40 space-y-3 pt-2">
            <div className="space-y-2 pb-3">
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-3 w-32" />
            </div>
            <div className="space-y-2 py-3">
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-3 w-40" />
            </div>
            <div className="space-y-2 py-3">
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-3 w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
