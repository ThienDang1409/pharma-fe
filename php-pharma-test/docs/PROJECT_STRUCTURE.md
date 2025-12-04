# Pharma Test Frontend - Project Structure

## 📁 Cấu trúc thư mục tối ưu cho Next.js App Router

```
php-pharma-test/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── (public)/                 # Public routes group
│   │   ├── layout.tsx            # Layout cho public pages
│   │   ├── page.tsx              # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   ├── category/[slug]/
│   │   │   └── announcements/
│   │   └── events/
│   │       └── page.tsx
│   │
│   ├── admin/                    # Admin dashboard
│   │   ├── layout.tsx            # Admin layout (auth wrapper)
│   │   ├── page.tsx
│   │   ├── categories/
│   │   └── news/
│   │
│   ├── components/               # ❌ NÊN DI CHUYỂN
│   ├── layout.tsx                # Root layout
│   └── globals.css
│
├── components/                   # ✅ Shared components (NGOÀI app/)
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── features/                 # Feature-specific components
│   │   ├── blog/
│   │   │   ├── BlogSlider.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogList.tsx
│   │   ├── news/
│   │   │   └── LatestNews.tsx
│   │   ├── products/
│   │   │   ├── ProductCategories.tsx
│   │   │   └── ProductCard.tsx
│   │   └── company/
│   │       └── CompanyBanner.tsx
│   └── editor/
│       └── TiptapEditor.tsx
│
├── lib/                          # ✅ Utilities & core logic
│   ├── api/                      # API layer (organized by domain)
│   │   ├── client.ts             # Base HTTP client
│   │   ├── blog.ts
│   │   ├── news.ts
│   │   ├── events.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── images.ts
│   │   └── index.ts              # Export all APIs
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useI18n.ts
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useDebounce.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── format.ts             # Date, number formatting
│   │   ├── validation.ts         # Form validation
│   │   └── slug.ts               # URL slug generation
│   │
│   ├── constants/                # App constants
│   │   ├── routes.ts
│   │   ├── api-endpoints.ts
│   │   └── locales.ts
│   │
│   └── types/                    # TypeScript types (global)
│       ├── api.ts
│       ├── blog.ts
│       ├── news.ts
│       └── index.ts
│
├── config/                       # ✅ Configuration files
│   ├── colors.ts                 # Color palette
│   ├── tailwind-colors.js        # Tailwind colors
│   ├── site.ts                   # Site metadata
│   └── env.ts                    # Environment variables
│
├── locales/                      # ✅ i18n translations
│   ├── en.json
│   ├── vi.json
│   └── index.ts
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/                       # Global styles (nếu cần tách riêng)
│   └── tiptap.css
│
├── docs/                         # Documentation
│   └── website-erd.md
│
└── [config files]
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── package.json
    └── .env.local

```

## 🔄 Thay đổi cần thực hiện

### 1. Di chuyển components ra ngoài app/
**Hiện tại:** `app/components/` (❌ không theo convention Next.js)
**Nên là:** `components/` (✅ root level)

```bash
# Di chuyển:
app/components/ → components/layout/
  - Header.tsx
  - Footer.tsx
  - Layout.tsx

app/components/ → components/features/
  - BlogSlider.tsx → components/features/blog/
  - LatestNews.tsx → components/features/news/
  - ProductCategories.tsx → components/features/products/
  - CompanyBanner.tsx → components/features/company/

app/components/ → components/editor/
  - TiptapEditor.tsx
  - tiptap.css → styles/
```

### 2. Tổ chức lại lib/api
**Hiện tại:** `lib/api.ts` (1 file lớn)
**Nên là:** Tách thành nhiều file theo domain

```
lib/api/
├── client.ts          # HTTP client (từ http.ts)
├── blog.ts            # Blog APIs
├── news.ts            # News APIs  
├── categories.ts      # Category APIs
├── images.ts          # Image upload
└── index.ts           # Re-export all
```

### 3. Thêm lib/types cho TypeScript
**Tạo mới:** `lib/types/` để tách interface ra khỏi API logic

```typescript
// lib/types/blog.ts
export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  // ...
}

// lib/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}
```

### 4. Tạo lib/utils cho helper functions
```
lib/utils/
├── format.ts          # formatDate, formatCurrency
├── slug.ts            # generateSlug từ title
└── validation.ts      # Form validation helpers
```

## 📝 Route Organization Best Practices

### Option A: Route Groups (Recommended)
```
app/
├── (public)/          # Public routes
│   ├── layout.tsx     # Header + Footer
│   ├── page.tsx
│   ├── blog/
│   └── news/
│
├── (admin)/           # Admin routes
│   ├── layout.tsx     # Admin sidebar + auth
│   └── dashboard/
│
└── api/               # API routes (nếu cần)
```

### Option B: Flat structure (Current - OK cho small projects)
```
app/
├── page.tsx
├── blog/
├── news/
└── admin/
```

## 🎨 Styling Organization

### Current (✅ Good)
- Tailwind config với custom colors
- Global styles in `app/globals.css`
- Component-specific styles inline with Tailwind

### Improvements:
```
styles/
├── globals.css        # Global styles
├── tiptap.css         # Tiptap editor styles
└── themes/
    ├── light.css
    └── dark.css
```

## 🌍 i18n Setup

### Current (✅ Good foundation)
```
locales/
├── en.json
├── vi.json
└── lib/hooks/useI18n.ts
```

### Improvement: Context Provider
```typescript
// lib/contexts/LanguageContext.tsx
'use client';
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('vi');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

## 🔐 Environment Variables

Tạo `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://pharma-test-be-1.onrender.com/api
NEXT_PUBLIC_SITE_NAME=Pharma Test
NEXT_PUBLIC_SITE_URL=https://pharmatest.com
```

## 📦 Recommended Package Structure

```json
{
  "dependencies": {
    "next": "^16.0.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@tiptap/react": "^3.10.1",
    "axios": "^1.13.2",
    "swiper": "^12.0.3",
    "clsx": "^2.1.0",           // ✨ Utility for className
    "date-fns": "^3.0.0",       // ✨ Date formatting
    "react-hot-toast": "^2.4.1" // ✨ Toast notifications
  }
}
```

## 🚀 Quick Migration Guide

1. **Create new structure:**
   ```bash
   mkdir components/{layout,features,editor,ui}
   mkdir lib/{api,types,utils,contexts}
   mkdir styles
   ```

2. **Move files:**
   - Components: `app/components/*` → `components/`
   - API: Split `lib/api.ts` → `lib/api/*.ts`
   - Types: Extract interfaces → `lib/types/`

3. **Update imports:**
   ```typescript
   // Old
   import Header from '@/app/components/Header';
   
   // New
   import Header from '@/components/layout/Header';
   ```

4. **Update tailwind.config.ts content paths:**
   ```typescript
   content: [
     './app/**/*.{js,ts,jsx,tsx,mdx}',
     './components/**/*.{js,ts,jsx,tsx,mdx}', // ✨ Add this
   ]
   ```

## ✅ Benefits of New Structure

- ✅ Follows Next.js conventions
- ✅ Better code organization by feature
- ✅ Easier to find and maintain files
- ✅ Scales better for large teams
- ✅ Clear separation of concerns
- ✅ Reusable components across app
- ✅ Type safety with organized types
- ✅ Better tree-shaking and bundle size

## 📚 References

- [Next.js Project Organization](https://nextjs.org/docs/getting-started/project-structure)
- [React Project Structure Best Practices](https://www.robinwieruch.de/react-folder-structure/)
