"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BlogSlider() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const allBlogs = await blogApi.getAll({ status: "published" });
        // Get 7 latest blogs
        const latestBlogs = allBlogs.slice(0, 7);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <div className="h-[500px] bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-100">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-900/70">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-40"
                  />
                )}
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl">
                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {blog.title}
                    </h2>

                    {/* Excerpt from first section */}
                    {blog.sections && blog.sections.length > 0 && (
                      <p className="text-white/90 text-lg mb-8 line-clamp-2">
                        {blog.sections[0].content
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 150)}
                        ...
                      </p>
                    )}

                    {/* Read More Button */}
                    <Link
                      href={`/news/${blog._id}`}
                      className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300 uppercase text-sm tracking-wider"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              </div>

              {/* Optional: Category badge */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold">
                  {blog.tags[0]}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #dc2626 !important;
          background: rgba(255, 255, 255, 0.95) !important;
          padding: 20px !important;
          border-radius: 50% !important;
          width: 55px !important;
          height: 55px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #dc2626 !important;
          color: white !important;
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
        }

        .swiper-button-disabled {
          opacity: 0.5 !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 12px !important;
          height: 12px !important;
        }

        .swiper-pagination-bullet-active {
          background: #dc2626 !important;
          opacity: 1;
        }

        .swiper-pagination {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
}
