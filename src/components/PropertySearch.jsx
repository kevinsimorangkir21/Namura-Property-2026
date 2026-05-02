import { MapPin, Home, DollarSign, Search } from "lucide-react";

export default function PropertySearch() {
  return (
    <div className="container -mt-14 relative z-10">
      <div className="bg-white rounded-full shadow-xl border border-gray-100 px-4 py-3 flex flex-col md:flex-row items-center gap-3">
        
        <div className="flex items-center gap-2 flex-1 px-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <input placeholder="Location" className="w-full outline-none text-sm" />
        </div>

        <div className="flex items-center gap-2 flex-1 px-3">
          <Home className="w-4 h-4 text-gray-400" />
          <input placeholder="Property type" className="w-full outline-none text-sm" />
        </div>

        <div className="flex items-center gap-2 flex-1 px-3">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <input placeholder="Price Range" className="w-full outline-none text-sm" />
        </div>

        <div className="hidden md:block w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-2 flex-[2] px-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="Search for properties" className="w-full outline-none text-sm" />
        </div>

        <button className="btn-primary text-sm px-6 py-2">
          Search
        </button>
      </div>
    </div>
  );
}