# Migration Script - Reorganize Project Structure

## Cấu trúc hiện tại giữ nguyên (OK cho dự án vừa và nhỏ)

Dự án hiện tại đã có cấu trúc tốt:

```
✅ GIỮ NGUYÊN:
├── app/components/           # Components trong App Router (OK)
├── lib/api.ts                # API trong 1 file (OK cho dự án nhỏ)
├── lib/http.ts               # HTTP client
├── config/                   # Colors, site config
├── locales/                  # i18n files
└── lib/constants/            # Constants

✨ MỚI THÊM:
├── lib/utils/                # Utility functions
│   ├── format.ts            # Date, number formatting
│   ├── slug.ts              # Vietnamese slug generation
│   └── index.ts
├── lib/hooks/useI18n.ts      # i18n hook (đã có)
└── config/site.ts            # Site configuration

```

## Tại sao KHÔNG cần migration ngay?

1. **App Router cho phép `app/components/`** - Không vi phạm convention
2. **Dự án vừa phải** - Không cần over-engineer
3. **Đã có phân chia rõ ràng** - lib/, config/, locales/
4. **Team nhỏ** - Dễ navigate hiện tại

## Khi nào NÊN migration?

- ✅ Khi team > 5 người
- ✅ Khi có > 50 components
- ✅ Khi cần reuse components ở nhiều nơi ngoài app/
- ✅ Khi cần tổ chức theo features rõ ràng hơn

## Quick Wins đã thực hiện:

### 1. Thêm Utilities
```typescript
// lib/utils/slug.ts
import { generateSlug } from '@/lib/utils';
const slug = generateSlug("Thuốc kháng sinh"); // "thuoc-khang-sinh"

// lib/utils/format.ts
import { formatDate, formatCurrency } from '@/lib/utils';
formatDate(new Date()); // "26/11/2024"
formatCurrency(100000); // "100.000 ₫"
```

### 2. Site Config
```typescript
// config/site.ts
import { siteConfig } from '@/config/site';
console.log(siteConfig.contact.email);
```

### 3. Improved Constants
```typescript
// lib/constants/index.ts
import { ROUTES, API_ENDPOINTS } from '@/lib/constants';
```

## Optional: Minimal Migration (nếu muốn)

Chỉ di chuyển components thường dùng:

```bash
# Tạo thư mục mới
mkdir components
mkdir components/layout

# Copy (không xóa cũ) một số components ra ngoài
cp app/components/Header.tsx components/layout/
cp app/components/Footer.tsx components/layout/
cp app/components/Layout.tsx components/layout/

# Update import trong files sử dụng
# Old: import Header from '@/app/components/Header'
# New: import Header from '@/components/layout/Header'
```

## Kết luận

**Cấu trúc hiện tại: 7/10** ✅
- Đủ tốt cho dự án hiện tại
- Dễ maintain
- Follow Next.js App Router conventions

**Không cần migration lớn ngay bây giờ!**

Đã thêm:
- ✨ `lib/utils/` - Utility functions
- ✨ `config/site.ts` - Site configuration  
- ✨ Documentation - PROJECT_STRUCTURE.md

**Recommendation:** Giữ nguyên cấu trúc, chỉ thêm utilities mới khi cần.
