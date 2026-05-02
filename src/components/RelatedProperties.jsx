import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";

export default function RelatedProperties({ currentId }) {
  const related = properties
    .filter((p) => p.id !== currentId)
    .slice(0, 3);

  return (
    <div className="mt-20">
      <h3 className="text-xl font-semibold mb-6">
        Properti Terkait
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {related.map((item) => (
          <PropertyCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}