export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      
      <div className="grid md:grid-cols-3 gap-6 animate-pulse">

        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            
            <div className="h-[200px] bg-gray-200 rounded-xl" />
            
            <div className="h-4 bg-gray-200 w-3/4 rounded" />
            <div className="h-3 bg-gray-200 w-1/2 rounded" />

          </div>
        ))}

      </div>

    </div>
  );
}