"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { informationApi } from "@/lib/api";
import type { Information } from "@/lib/api";

export default function ProductCategories() {
  const [categories, setCategories] = useState<Information[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const allCategories = await informationApi.getAll();

        // Find PRODUCTS root category
        const productsRoot = allCategories.find(
          (cat) => cat.slug === "products" && !cat.parentId
        );

        if (productsRoot) {
          // Get level 2 categories (children of PRODUCTS)
          const level2Categories = allCategories.filter(
            (cat) => cat.parentId === productsRoot._id
          );
          setCategories(level2Categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const displayedCategories = showAll ? categories : categories.slice(0, 2);

  const getCategoryIcon = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("galenic")) return "💊";
    if (nameLower.includes("dissolution")) return "🧪";
    if (nameLower.includes("tablet")) return "💉";
    if (nameLower.includes("coating")) return "🎨";
    if (nameLower.includes("friability")) return "🔬";
    if (nameLower.includes("disintegration")) return "⚗️";
    return "🔬";
  };

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {displayedCategories.map((category) => (
            <div
              key={category._id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-96">
                {/* Background image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  {category.image && category.image !== "/default-image.jpg" ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <span className="text-9xl">
                        {getCategoryIcon(category.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                  <h3 className="text-3xl font-bold mb-6 text-center px-4">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-white/90 mb-6 text-center px-8 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <Link
                    href={`/products/${category.slug}`}
                    className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors font-semibold"
                  >
                    VIEW ALL
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {categories.length > 2 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-red-600 text-white px-10 py-3 rounded-md hover:bg-red-700 transition-colors font-semibold uppercase tracking-wider"
            >
              {showAll ? "SHOW LESS" : "READ MORE"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
