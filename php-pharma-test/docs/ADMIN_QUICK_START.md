# Admin Dashboard - Quick Start Guide

## 🚀 Bắt đầu

Truy cập: `http://localhost:3000/admin`

## 📊 Dashboard
**URL:** `/admin`

### Các thống kê
- **Danh mục**: Tổng số danh mục gốc
- **Tổng bài viết**: Tất cả blogs (published + draft)
- **Đã xuất bản**: Số bài viết published
- **Bản nháp**: Số bài viết draft

### Hành động nhanh
- ➕ Thêm bài viết mới
- ➕ Thêm danh mục mới

---

## 📁 Quản lý Danh mục (Categories)
**URL:** `/admin/information`

### Cách sử dụng

1. **Xem danh mục gốc (Cấp 1)**
   - Hiển thị toàn bộ danh mục gốc
   - Mỗi card hiển thị: Tên, mô tả, số danh mục con

2. **Xem danh mục con**
   - Click button "Xem con" → Nhập vào cấp con
   - Breadcrumb ở trên để quay lại

3. **Thêm danh mục**
   - Click "➕ Thêm mới"
   - Chọn "Danh mục cha" (để trống nếu là gốc)
   - Nhập: Tên, Slug, Mô tả
   - Upload hình ảnh (Optional)
   - Click "Tạo"

4. **Sửa danh mục**
   - Click "✏️ Sửa" trên card
   - Chỉnh sửa các trường
   - Có thể đổi hình ảnh hoặc thêm hình ảnh mới
   - Click "Cập nhật"

5. **Xóa danh mục**
   - Click "🗑️ Xóa" → hiển thị "⚠️ Xác nhận?"
   - Click lại "⚠️ Xác nhận?" để xóa
   - Nếu không click trong 3 giây, sẽ reset

### Form Thêm/Sửa

| Trường | Bắt buộc | Ghi chú |
|--------|----------|---------|
| Tên danh mục | ✓ | VD: "Thuốc kháng sinh" |
| Slug | ✓ | VD: "thuoc-khang-sinh" (auto-generate có thể) |
| Danh mục cha | - | Để trống = danh mục gốc |
| Mô tả | - | Optional |
| Hình ảnh | - | Upload file hoặc paste URL |

---

## 📰 Quản lý Bài Viết (Blog/News)
**URL:** `/admin/blogs`

### Lọc theo Trạng thái

| Button | Ý nghĩa |
|--------|---------|
| Tất cả | Hiển thị tất cả bài viết |
| Đã xuất bản | Chỉ published blogs |
| Bản nháp | Chỉ draft blogs |

### Lọc theo Danh mục (Phân cấp)

**Ví dụ:**
```
Cấp 1: [Thuốc] [Vitamin] [Dụng cụ y tế]
         ↓ (click "Thuốc")
Cấp 2: [Kháng sinh] [Giảm đau] [Ho]
          ↓ (click "Kháng sinh")
Cấp 3: [Amoxicillin] [Erythromycin]
          ↓ (click để filter)
Bài viết của Amoxicillin hiển thị
```

**Quy trình:**
1. Click danh mục cấp 1 (nếu cần)
2. Những danh mục con của nó sẽ hiển thị ở "Cấp 2"
3. Click danh mục cấp 2 → Hiển thị cấp 3 (nếu có)
4. Tiếp tục chọn cho đến cấp mong muốn
5. Click "Xóa bộ lọc" để reset

### Bảng Danh sách Bài viết

| Cột | Ý nghĩa |
|-----|---------|
| Tiêu đề | Tên bài viết + slug |
| Danh mục | Danh mục được assign |
| Trạng thái | ✓ Xuất bản / ✎ Bản nháp |
| Ngày tạo | Ngày tạo bài viết |
| Hành động | ✏️ Sửa / 🗑️ Xóa |

### Hành động

**Sửa bài viết:**
- Click "✏️ Sửa"
- Chỉnh sửa nội dung
- Save

**Xóa bài viết:**
- Click "🗑️ Xóa"
- Confirm bằng cách click lại "⚠️ Xác nhận?" (trong 3 giây)

**Thêm bài viết mới:**
- Click "➕ Thêm bài viết mới" ở header
- Hoặc từ Dashboard: Click "➕ Thêm bài viết mới"

---

## 🎨 Sidebar Navigation

| Icon | Menu | URL |
|------|------|-----|
| 📊 | Dashboard | `/admin` |
| 📁 | Categories | `/admin/information` |
| 📰 | Blog/News | `/admin/blogs` |

**Mở rộng/Thu gọn:** Click logo "Pharma" ở header

---

## ⌨️ Keyboard Tips

- `Tab` - Chuyển qua input fields trong form
- `Enter` - Submit form
- `Escape` - Có thể dùng để đóng modal (nếu implement)

---

## 🐛 Troubleshooting

### "Không tải được dữ liệu"
- Kiểm tra API connection
- Xem console (F12) có error gì
- Refresh trang (Ctrl+R)

### "Upload hình ảnh thất bại"
- Kiểm tra kích thước file (nên < 5MB)
- Kiểm tra định dạng (JPG, PNG, etc.)
- Kiểm tra internet connection

### "Xóa không thành công"
- Danh mục có danh mục con → phải xóa con trước
- Bài viết có references → kiểm tra constraint

---

## 📞 Support

- Backend API: `https://pharma-test-be-1.onrender.com/api`
- Check logs ở browser console (F12)
- Contact: admin@pharmatest.com

---

**Version:** 1.0  
**Last Updated:** November 26, 2025
