"use client";

import Layout from "@/app/components/Layout";
import Link from "next/link";
import { useState } from "react";

interface Announcement {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  icon: string;
}

export default function AnnouncementsPage() {
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      slug: "new-product-launch-2025",
      title: "🚀 Pharma Test Launches Revolutionary Testing Equipment",
      excerpt:
        "We are excited to announce the launch of our newest line of pharmaceutical testing instruments featuring advanced automation and precision...",
      date: "2 giờ trước",
      author: "Pharma Test Communications",
      category: "Product Launch",
      icon: "🔬",
    },
    {
      id: 2,
      slug: "workshop-registration-pharmaceutical-testing",
      title: "📚 Workshop: Advanced Pharmaceutical Testing Techniques",
      excerpt:
        "Join us for a comprehensive workshop on the latest pharmaceutical testing methodologies and equipment usage...",
      date: "1 ngày trước",
      author: "Pharma Test Education",
      category: "Workshop & Training",
      icon: "📚",
    },
  ]);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📢</div>
            <h1 className="text-5xl font-bold text-white">Announcements</h1>
            <p className="text-blue-100 mt-2 text-lg">
              Stay updated with latest news and important notices
            </p>
          </div>
        </div>
      </div>

      {/* Yellow Separator */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500"></div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/news" className="hover:text-blue-600">
              News
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Announcements</span>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {announcements.map((announcement) => (
              <Link
                key={announcement.id}
                href={`/news/announcements/${announcement.slug}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-4xl flex-shrink-0">
                      {announcement.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                          {announcement.category}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {announcement.date}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {announcement.title}
                      </h2>

                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {announcement.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Đăng bởi:{" "}
                          <span className="font-medium">
                            {announcement.author}
                          </span>
                        </span>
                        <span className="text-blue-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                          Xem chi tiết{" "}
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Empty State */}
            {announcements.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-20">📢</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Announcements Yet
                </h3>
                <p className="text-gray-600">
                  Check back later for important updates and notices.
                </p>
              </div>
            )}
          </div>

          {/* Pagination (if needed) */}
          {announcements.length > 10 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  ← Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
