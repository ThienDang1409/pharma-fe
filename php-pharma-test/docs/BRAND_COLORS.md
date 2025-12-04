# 🎨 Brand Color Guidelines - Pharma Admin

## Bộ màu thương hiệu

### Primary - Burgundy Red (#881a44)
**Sử dụng cho:**
- ✅ Buttons chính (CTA)
- ✅ Active states (selected items)
- ✅ Headers/Titles quan trọng
- ✅ Links chính
- ✅ Borders quan trọng

**Ví dụ:**
```tsx
// Button chính
className="bg-primary-900 hover:bg-primary-800 text-white"

// Active state
className="bg-primary-600 text-white"

// Border
className="border-primary-600"
```

---

### Secondary - Pink (#B03C68)
**Sử dụng cho:**
- ✅ Hover effects
- ✅ Accents (nhấn mạnh phụ)
- ✅ Secondary buttons
- ✅ Links phụ
- ✅ Highlights

**Ví dụ:**
```tsx
// Secondary button
className="bg-secondary-100 text-secondary-800 hover:bg-secondary-200"

// Link/Badge
className="bg-secondary-100 text-secondary-700"
```

---

### Third - Golden Yellow (#f0b940)
**Sử dụng cho:**
- ✅ Backgrounds nhẹ
- ✅ Info boxes
- ✅ Status indicators (success)
- ✅ Highlights đặc biệt
- ✅ Warm accents

**Ví dụ:**
```tsx
// Info box
className="bg-third-50 border-third-200"

// Badge
className="bg-third-100 text-third-800"

// Dot indicator
className="bg-third-500"
```

---

## Contrast Guidelines

### ✅ An toàn (WCAG AA+)

| Background | Text Color | Ratio | Status |
|-----------|-----------|-------|--------|
| primary-900 | white | 12.7:1 | ✅ Tốt |
| primary-600 | white | 5.8:1 | ✅ OK |
| secondary-800 | white | 6.2:1 | ✅ Tốt |
| third-500 | black | 8.1:1 | ✅ Tốt |

### ⚠️ Cẩn thận

| Background | Text Color | Ratio | Status |
|-----------|-----------|-------|--------|
| primary-100 | primary-900 | 4.5:1 | ⚠️ Pass nhưng nhạt |
| secondary-100 | secondary-900 | 4.3:1 | ⚠️ Gần limit |
| third-100 | third-900 | 5.1:1 | ✅ OK |

### ❌ Tránh

| Background | Text Color | Note |
|-----------|-----------|------|
| primary-200 | primary-400 | ❌ Quá nhạt |
| secondary-300 | white | ❌ Không đủ contrast |
| third-200 | white | ❌ Chữ chìm |

---

## Quy tắc áp dụng

### 1. Sidebar & Navigation
```tsx
// Sidebar background
bg-linear-to-b from-primary-900 to-primary-950

// Active nav item  
bg-secondary-500 text-white

// Hover nav item
hover:bg-primary-800
```

### 2. Buttons

**Primary Action:**
```tsx
bg-primary-600 hover:bg-primary-700 text-white
```

**Secondary Action:**
```tsx
bg-secondary-100 text-secondary-800 hover:bg-secondary-200
```

**Tertiary/Info:**
```tsx
bg-third-100 text-third-800 hover:bg-third-200
```

**Danger (giữ nguyên red):**
```tsx
bg-red-100 text-red-700 hover:bg-red-200
```

### 3. Cards & Boxes

**Primary Card:**
```tsx
border-primary-200 bg-white
```

**Info Box:**
```tsx
bg-third-50 border-l-4 border-third-500
```

**Status Box:**
```tsx
bg-secondary-50 border-secondary-200
```

### 4. Badges

**Level/Category:**
```tsx
bg-secondary-100 text-secondary-700
```

**Count:**
```tsx
bg-third-100 text-third-700
```

**Status:**
```tsx
// Published
bg-third-100 text-third-800

// Draft
bg-secondary-100 text-secondary-800
```

### 5. Forms

**Input focus:**
```tsx
focus:ring-2 focus:ring-primary-600
```

**File upload:**
```tsx
file:bg-secondary-50 file:text-secondary-700 hover:file:bg-secondary-100
```

---

## Migration Checklist

### Admin Layout ✅
- [x] Sidebar: primary-900 gradient
- [x] Active nav: secondary-500
- [x] Logo: secondary-400

### Dashboard Page ⏳
- [ ] "Chi tiết" button: blue → secondary
- [ ] "Thêm bài viết" button: blue → primary
- [ ] Status indicators: green → third

### Information Page ⏳
- [ ] "Tạo con" button: green → third
- [ ] Info boxes: blue/green → third/secondary

### Blogs Page ⏳
- [ ] Filter buttons: các màu → primary/secondary
- [ ] Status badges: green/yellow → third/secondary
- [ ] Edit button: blue → secondary

---

## Testing Checklist

### Visual Testing
- [ ] Check tất cả buttons có đúng màu không
- [ ] Kiểm tra hover states
- [ ] Xem active states (selected items)
- [ ] Test dark text on light backgrounds
- [ ] Test white text on dark backgrounds

### Accessibility
- [ ] Run contrast checker tool
- [ ] Test với screen reader
- [ ] Kiểm tra colorblind mode
- [ ] Verify focus states rõ ràng

### Browser Testing
- [ ] Chrome
- [ ] Firefox  
- [ ] Safari
- [ ] Edge

---

## Notes

- **Đừng dùng pure black/white** nếu có thể → dùng primary-950/third-50
- **Giữ nguyên green cho success**, red cho danger
- **Không mix quá nhiều màu** trong 1 component
- **Luôn test contrast** trước khi deploy

---

**Version:** 1.0  
**Last Updated:** November 29, 2025
