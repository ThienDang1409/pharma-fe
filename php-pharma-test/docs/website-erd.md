# Website E-Commerce Auto Parts - ERD

## Entity Relationship Diagram - Phase 1 (MVP)

```mermaid

```

## Phase 1 - Core Features

### ✅ Implemented Pages

1. **Homepage**

   - Featured categories grid
   - Featured products
   - Latest news section

2. **Product Catalog (View All Products)**

   - Product listing with pagination
   - Filter by category
   - Filter by brand
   - Search by keyword
   - Sort options

3. **Product Detail**

   - Product images gallery
   - Product information (price, stock, description)
   - Specifications table
   - Related products (same category)

4. **News/Blog**

   - News listing
   - Filter by category
   - News detail page

5. **User & Admin Management**
   - User registration & login
   - Admin dashboard
   - Manage products (CRUD)
   - Manage categories & sub-categories
   - Manage news posts
   - User profile management

### 🔄 Phase 2 - Coming Next

- Shopping cart & checkout
- Reviews & ratings
- Wishlist & compare
- Order management
- Payment integration
- Advanced admin analytics

### 📊 Database Tables (Phase 1)

**Core Tables:**

- `users` - User accounts (customers & admins)
- `categories` - Loại bộ phận chính (Level 1: Phanh, Động cơ, Truyền động...)
- `sub_categories` - Chi tiết loại bộ phận (Level 2: Phanh trước, Phanh sau, ABS, CBS...)
- `brands` - Product brands
- `products` - Main products table
- `product_images` - Product gallery
- `product_specifications` - Product specs
- `news_categories` - News categories
- `news_posts` - Blog posts (with author)
- `search_logs` - Search tracking

**Example Data Structure:**

```
Category: PHANH (id: 1)
  ├── Sub-category: Phanh trước (id: 1, category_id: 1)
  ├── Sub-category: Phanh sau (id: 2, category_id: 1)
  ├── Sub-category: Phanh đĩa (id: 3, category_id: 1)
  ├── Sub-category: Phanh tang trống (id: 4, category_id: 1)
  ├── Sub-category: Hệ thống CBS (id: 5, category_id: 1)
  └── Sub-category: Hệ thống ABS (id: 6, category_id: 1)

Category: ĐỘNG CƠ (id: 2)
  ├── Sub-category: Động cơ hoàn chỉnh (id: 7, category_id: 2)
  ├── Sub-category: Pittong & Xéc-măng (id: 8, category_id: 2)
  └── Sub-category: Trục khuỷu & Trục cam (id: 9, category_id: 2)
```

```

```
