"use client";

import { useParams, useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import Link from "next/link";

interface AnnouncementDetail {
  slug: string;
  title: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  content: {
    introduction?: string;
    sections: {
      emoji: string;
      title: string;
      items: {
        emoji: string;
        label: string;
        value: string;
      }[];
    }[];
    links?: {
      emoji: string;
      label: string;
      url: string;
    }[];
    footer?: {
      emoji: string;
      text: string;
      items?: string[];
    };
    contact?: {
      emoji: string;
      text: string;
    };
  };
}

export default function AnnouncementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Mock data - Replace with API call later
  const announcements: { [key: string]: AnnouncementDetail } = {
    "new-product-launch-2025": {
      slug: "new-product-launch-2025",
      title: "🚀 Pharma Test Launches Revolutionary Testing Equipment",
      author: "Pharma Test Communications",
      authorAvatar: "/pharma-logo.png",
      date: "2 giờ trước",
      category: "Product Launch",
      content: {
        introduction:
          "We are excited to announce the launch of our newest line of pharmaceutical testing instruments featuring advanced automation and precision technology. This represents a significant milestone in our commitment to advancing pharmaceutical quality control.",
        sections: [
          {
            emoji: "🔬",
            title: "Key Features and Specifications",
            items: [
              {
                emoji: "✓",
                label: "Automation Level:",
                value: "Fully automated with AI-powered analysis",
              },
              {
                emoji: "✓",
                label: "Precision:",
                value: "±0.01% accuracy for all measurements",
              },
              {
                emoji: "✓",
                label: "Compliance:",
                value: "USP, EP, and JP compliant",
              },
              {
                emoji: "✓",
                label: "Capacity:",
                value: "Up to 24 samples simultaneously",
              },
            ],
          },
          {
            emoji: "📅",
            title: "Product Launch Event Details",
            items: [
              {
                emoji: "🔶",
                label: "Date:",
                value: "December 15, 2025 at 2:00 PM",
              },
              {
                emoji: "🔶",
                label: "Location:",
                value: "Pharma Test Headquarters, Ho Chi Minh City",
              },
              {
                emoji: "🔶",
                label: "Registration:",
                value: "Limited to 100 participants",
              },
            ],
          },
        ],
        links: [
          {
            emoji: "📝",
            label: "Register for the event:",
            url: "https://pharma-test.com/events/product-launch-2025",
          },
          {
            emoji: "📄",
            label: "Download Product Brochure:",
            url: "https://pharma-test.com/downloads/new-equipment-brochure.pdf",
          },
        ],
        footer: {
          emoji: "⚠️",
          text: "Early bird discount available for orders placed before December 31, 2025. Limited quantities available.",
          items: [
            "Full technical specifications: https://pharma-test.com/products/specifications",
            "Warranty and support information included with purchase",
          ],
        },
        contact: {
          emoji: "📧",
          text: "For more information, contact our sales team: sales@pharma-test.com or call +84 123 456 789",
        },
      },
    },
    "workshop-registration-pharmaceutical-testing": {
      slug: "workshop-registration-pharmaceutical-testing",
      title: "📚 Workshop: Advanced Pharmaceutical Testing Techniques",
      author: "Pharma Test Education",
      authorAvatar: "/education-logo.png",
      date: "1 ngày trước",
      category: "Workshop & Training",
      content: {
        introduction:
          "Join us for a comprehensive 2-day workshop covering the latest pharmaceutical testing methodologies, equipment usage, and regulatory compliance. This hands-on training is designed for laboratory technicians, quality control specialists, and pharmaceutical professionals.",
        sections: [
          {
            emoji: "📖",
            title: "Workshop Curriculum",
            items: [
              {
                emoji: "•",
                label: "Day 1:",
                value:
                  "Introduction to USP/EP standards, dissolution testing fundamentals, and calibration procedures",
              },
              {
                emoji: "•",
                label: "Day 2:",
                value:
                  "Advanced techniques, troubleshooting, data analysis, and regulatory documentation",
              },
            ],
          },
          {
            emoji: "📅",
            title: "Workshop Schedule",
            items: [
              {
                emoji: "🔶",
                label: "Dates:",
                value: "January 20-21, 2026 (Monday-Tuesday)",
              },
              {
                emoji: "🔶",
                label: "Time:",
                value: "8:30 AM - 5:00 PM both days",
              },
              {
                emoji: "🔶",
                label: "Location:",
                value:
                  "Pharma Test Training Center, 227 Nguyen Van Cu Street, District 5, HCMC",
              },
              {
                emoji: "🔶",
                label: "Capacity:",
                value: "Maximum 30 participants",
              },
              {
                emoji: "🔶",
                label: "Fee:",
                value:
                  "10,000,000 VND per participant (includes materials, lunch, and certificate)",
              },
            ],
          },
        ],
        links: [
          {
            emoji: "✍️",
            label: "Registration Form:",
            url: "https://pharma-test.com/training/workshop-registration",
          },
        ],
        footer: {
          emoji: "⏰",
          text: "Registration deadline: January 10, 2026. Early bird discount (15% off) available until December 31, 2025.",
          items: [
            "Certificate of completion will be provided",
            "CPD credits applicable for pharmaceutical professionals",
          ],
        },
        contact: {
          emoji: "📞",
          text: "For inquiries: training@pharma-test.com or WhatsApp: +84 987 654 321",
        },
      },
    },
  };

  const announcement = announcements[slug];

  if (!announcement) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📭</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Announcement not found
            </h1>
            <p className="text-gray-600 mb-6">
              The announcement you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              onClick={() => router.push("/news/announcements")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Announcements
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header with Blue Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/news/announcements"
              className="inline-flex items-center text-white hover:text-blue-100 mb-4 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Announcements
            </Link>
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>›</span>
              <Link href="/news" className="hover:text-white">
                News
              </Link>
              <span>›</span>
              <Link href="/news/announcements" className="hover:text-white">
                Announcements
              </Link>
              <span>›</span>
              <span className="text-white">Detail</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Facebook Post Style */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Post Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {announcement.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-900 text-lg">
                      {announcement.author}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{announcement.date}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                        {announcement.category}
                      </span>
                      <span>•</span>
                      <span>🌐</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                  {announcement.title}
                </h1>

                {/* Introduction */}
                {announcement.content.introduction && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-5 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {announcement.content.introduction}
                    </p>
                  </div>
                )}

                {/* Sections */}
                <div className="space-y-6">
                  {announcement.content.sections.map((section, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-6 border border-gray-200 shadow-sm"
                    >
                      <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-start gap-2">
                        <span className="text-2xl">{section.emoji}</span>
                        <span className="flex-1">{section.title}</span>
                      </h3>
                      <div className="space-y-3 ml-8">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-3">
                            <span className="text-orange-500 flex-shrink-0 text-lg">
                              {item.emoji}
                            </span>
                            <p className="text-gray-700 flex-1">
                              <span className="font-semibold text-gray-900">
                                {item.label}
                              </span>{" "}
                              {item.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                {announcement.content.links &&
                  announcement.content.links.length > 0 && (
                    <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-600 shadow-sm">
                      <div className="space-y-3">
                        {announcement.content.links.map((link, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="text-xl">{link.emoji}</span>
                            <div className="flex-1">
                              <p className="text-gray-700 mb-1">
                                <span className="font-semibold text-gray-900">
                                  {link.label}
                                </span>
                              </p>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline break-all font-medium transition-colors"
                              >
                                {link.url}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Footer */}
                {announcement.content.footer && (
                  <div className="mt-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border-l-4 border-red-600 shadow-sm">
                    <p className="text-gray-800 font-semibold mb-3 flex items-start gap-2">
                      <span className="text-xl">
                        {announcement.content.footer.emoji}
                      </span>
                      <span className="flex-1">
                        {announcement.content.footer.text}
                      </span>
                    </p>
                    {announcement.content.footer.items &&
                      announcement.content.footer.items.map((item, index) => (
                        <p
                          key={index}
                          className="text-gray-600 text-sm mt-2 ml-7"
                        >
                          • {item}
                        </p>
                      ))}
                  </div>
                )}

                {/* Contact */}
                {announcement.content.contact && (
                  <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-600 shadow-sm">
                    <p className="text-gray-800 font-semibold flex items-start gap-2">
                      <span className="text-xl">
                        {announcement.content.contact.emoji}
                      </span>
                      <span className="flex-1">
                        {announcement.content.contact.text}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Post Actions (Like Facebook) */}
              <div className="border-t border-gray-200 bg-gray-50">
                <div className="flex items-center divide-x divide-gray-300">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
                    <span className="text-xl">👍</span>
                    <span className="font-medium">Like</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
                    <span className="text-xl">💬</span>
                    <span className="font-medium">Comment</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600">
                    <span className="text-xl">↗️</span>
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Related/Other Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/news/announcements"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <span>←</span>
                <span>View All Announcements</span>
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>📰</span>
                <span>Back to News</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
