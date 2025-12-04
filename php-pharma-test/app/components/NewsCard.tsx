import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { Blog } from "@/lib/api";
import enTranslations from "@/locales/en.json";
import viTranslations from "@/locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

interface NewsCardProps {
  article: Blog;
  formatDate: (dateString?: string) => string;
}

export default function NewsCard({ article, formatDate }: NewsCardProps) {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-gray-700 text-sm mb-2">{formatDate(article.createdAt)}</p>
        <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-secondary-900 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <Link
          href={`/blog/${article.slug}`}
          className="text-primary-900 hover:text-primary-800 font-semibold flex items-center gap-2"
        >
          <span>→ {t.pages.readMore}</span>
        </Link>
      </div>
    </div>
  );
}
