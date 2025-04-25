'use client';

interface ShimmerLoaderProps {
    dark: boolean;
}

export default function ShimmerLoader({ dark }: ShimmerLoaderProps) {
  return (
    <div className={`w-full rounded-xl overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="p-8">
        <div className="space-y-8">
          {/* Welcome Card Shimmer */}
          <div className={`h-40 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
          
          {/* Progress Section Shimmer */}
          <div className="space-y-4">
            <div className={`h-6 w-1/4 rounded ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-32 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
              ))}
            </div>
          </div>
          
          {/* Other shimmer placeholders */}
          <div className={`h-64 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
          <div className={`h-64 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
          <div className={`h-64 rounded-lg ${dark ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
        </div>
      </div>
    </div>
  );
}