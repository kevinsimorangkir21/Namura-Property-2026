"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

export default function RelatedProperties({ currentId }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/properties`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Sort newest first, exclude current, take 3
        const sorted = (data || [])
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .filter((item) => item.id !== currentId)
          .slice(0, 3);
        setProperties(sorted);
      } catch (err) {
        // Silently fail — related properties are non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [currentId]);

  if (loading) {
    return (
      <div className="mt-20">
        <h3 className="text-xl font-semibold mb-6">Properti Terkait</h3>
        <p className="text-gray-400">Memuat properti...</p>
      </div>
    );
  }

  if (properties.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-xl font-semibold mb-6">
        Properti Terkait
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((item) => (
          <PropertyCard
            key={item.id}
            id={item.id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
}
