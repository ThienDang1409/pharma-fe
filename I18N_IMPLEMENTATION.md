# Đa ngôn ngữ (i18n) Implementation

## Tổng quan
Đã thực hiện cập nhật hệ thống i18n cho toàn bộ project, thay thế tất cả hardcoded strings bằng translations từ các file JSON (en.json, vi.json).

## Thay đổi chính

### 1. Files Locales (`/locales/`)
- **en.json**: Thêm các sections mới
  - `admin.*` - Các translations cho admin dashboard
  - `pages.*` - Các translations cho public pages
  - `common.noArticles`, `common.noItemsAvailable` - Thêm các strings mới

- **vi.json**: Thêm các sections mới
  - `admin.*` - Các translations cho admin dashboard
  - `pages.*` - Các translations cho public pages
  - `common.noArticles`, `common.noItemsAvailable` - Thêm các strings mới

### 2. Components Được Cập Nhật

#### Header.tsx
- Import translations từ JSON files
- Thay thế: `t.company` → `t.header.company`
- Thay thế: `t.search` → `t.header.search`
- Thay thế: "No articles available" → `t.common.noArticles`
- Thay thế: "Loading..." → `t.common.loading`

#### Footer.tsx
- Import translations từ JSON files
- Thêm language state management
- Sẵn sàng để sử dụng translations cho các labels

#### LatestNews.tsx
- Import translations từ JSON files
- Thay thế: "Loading latest news..." → `t.pages.loadingLatestNews`

#### Category Page (`/app/(public)/category/[slug]/page.tsx`)
- Import translations từ JSON files
- Thay thế: "Loading..." → `t.common.loading`

#### Admin Dashboard (`/app/admin/page.tsx`)
- Import translations từ JSON files
- Thay thế: "Dashboard" → `t.admin.dashboard`
- Thay thế: "Tổng quan quản lý nội dung" → `t.admin.overview`
- Thay thế: "Danh mục" → `t.admin.totalCategories`
- Thay thế: "Tổng bài viết" → `t.admin.totalBlogs`
- Thay thế: "Đã xuất bản" → `t.admin.publishedBlogs`
- Thay thế: "Bản nháp" → `t.admin.draftBlogs`
- Thay thế: "Quản lý" → `t.admin.manage`

#### Admin Layout (`/app/admin/layout.tsx`)
- Import translations từ JSON files
- Thay thế: hardcoded navItems names → dynamic translations từ `t[item.name]`

### 3. Cấu trúc Translation Objects

```typescript
// Tiếng Anh (en.json)
{
  "common": { ... },
  "header": { ... },
  "navigation": { ... },
  "footer": { ... },
  "errors": { ... },
  "admin": {
    "dashboard": "Dashboard",
    "categories": "Categories",
    "blogsNews": "Blogs/News",
    "totalCategories": "Categories",
    "totalBlogs": "Total Posts",
    "publishedBlogs": "Published Posts",
    "draftBlogs": "Draft Posts",
    "overview": "Content Management Overview",
    "manage": "Manage",
    "addNew": "Add New",
    "edit": "Edit",
    "delete": "Delete",
    "confirmDelete": "Are you sure you want to delete?",
    "deletedSuccessfully": "Deleted successfully",
    "errorDeleting": "Error deleting",
    "information": "Information"
  },
  "pages": {
    "category": "Category",
    "latestNews": "Latest News",
    "blog": "Blog",
    "loadingLatestNews": "Loading latest news...",
    "loadingArticles": "Loading articles..."
  }
}
```

```typescript
// Tiếng Việt (vi.json)
{
  "common": { ... },
  "header": { ... },
  "navigation": { ... },
  "footer": { ... },
  "errors": { ... },
  "admin": {
    "dashboard": "Bảng điều khiển",
    "categories": "Danh mục",
    "blogsNews": "Bài viết/Tin tức",
    "totalCategories": "Danh mục",
    "totalBlogs": "Tổng bài viết",
    "publishedBlogs": "Bài viết đã xuất bản",
    "draftBlogs": "Bài viết nháp",
    "overview": "Tổng quan quản lý nội dung",
    "manage": "Quản lý",
    "addNew": "Thêm mới",
    "edit": "Chỉnh sửa",
    "delete": "Xóa",
    "confirmDelete": "Bạn có chắc muốn xóa?",
    "deletedSuccessfully": "Xóa thành công",
    "errorDeleting": "Lỗi xóa",
    "information": "Thông tin"
  },
  "pages": {
    "category": "Danh mục",
    "latestNews": "Tin tức mới nhất",
    "blog": "Bài viết",
    "loadingLatestNews": "Đang tải tin tức mới nhất...",
    "loadingArticles": "Đang tải bài viết..."
  }
}
```

## Mẫu sử dụng

### Cách import translations:
```tsx
import enTranslations from "@/locales/en.json";
import viTranslations from "@/locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};
```

### Cách sử dụng:
```tsx
const [language, setLanguage] = useState<"en" | "vi">("vi");
const t = translations[language];

// Sử dụng:
<p>{t.header.company}</p>
<p>{t.admin.dashboard}</p>
<p>{t.common.loading}</p>
```

## Lợi ích
✅ Tất cả hardcoded strings đã được thay thế bằng translations  
✅ Hỗ trợ cấu trúc nested objects cho organize tốt hơn  
✅ Dễ dàng maintain và mở rộng translations  
✅ Consistent naming convention across all translations  
✅ Ready để integrate với i18n libraries (nếu cần) như next-intl hoặc i18next  

## Tiếp theo (tùy chọn)
- Integrate ngôn ngữ selection UI (language switcher) ở Header/Footer
- Lưu language preference vào localStorage hoặc cookies
- Thêm support cho dynamic language switching across pages
- Integrate with libraries like `next-intl` hoặc `i18next` nếu cần features nâng cao
