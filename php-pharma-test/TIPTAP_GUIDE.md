# Hướng dẫn sử dụng TiptapEditor

## 1. Căn lề văn bản (Text Alignment)

Bạn có thể căn lề text bằng các nút trên toolbar:

- **⬅** - Căn trái (Left align)
- **↔** - Căn giữa (Center align)  
- **➡** - Căn phải (Right align)
- **⬌** - Căn đều (Justify)

**Cách sử dụng:**
1. Bôi đen văn bản cần căn lề
2. Click vào nút căn lề tương ứng
3. Văn bản sẽ được căn lề theo ý muốn

**Áp dụng cho:**
- Văn bản thường (paragraphs)
- Heading (H1, H2, H3)
- Text trong bảng (table cells)

---

## 2. Thêm Link (Hyperlink)

Bạn có thể biến text thành link có thể click:

### Cách 1: Link text đã có sẵn
1. Bôi đen text muốn thêm link
2. Click nút **🔗** trên toolbar
3. Nhập URL vào ô "URL"
4. Click "Set Link"

### Cách 2: Thêm text và link mới
1. Đặt con trỏ vào vị trí muốn thêm link
2. Click nút **🔗** 
3. Nhập text hiển thị vào ô "Link Text"
4. Nhập URL vào ô "URL"
5. Click "Set Link"

**Lưu ý:**
- Nếu URL không có `http://` hoặc `https://`, hệ thống tự thêm `https://`
- Để xóa link: Bôi đen text có link → Click nút **⛔** (xuất hiện khi text đã có link)

**Ví dụ:**
- Link Text: "Xem thêm tại đây"
- URL: "https://example.com"
- Kết quả: [Xem thêm tại đây](https://example.com)

---

## 3. Chú thích hình ảnh (Image Caption)

Hiện tại editor hỗ trợ thêm hình ảnh nhưng **chưa có tính năng caption tích hợp sẵn**.

### Giải pháp hiện tại:

#### **Phương án 1: Dùng paragraph bên dưới ảnh**
```html
1. Thêm ảnh
2. Nhấn Enter để xuống dòng
3. Gõ chú thích (có thể in nghiêng bằng nút I)
4. Căn giữa chú thích bằng nút ↔
```

Kết quả:
```
[Hình ảnh]
   Hình 1: Mô tả hình ảnh (italic, center)
```

#### **Phương án 2: Dùng Table 1x2**
```html
1. Tạo bảng 1 cột x 2 hàng
2. Dòng 1: Thêm ảnh
3. Dòng 2: Gõ chú thích
4. Xóa border bảng (Right click → Remove Borders)
```

Kết quả:
```
┌────────────────┐
│   [Hình ảnh]   │
├────────────────┤
│  Chú thích ảnh │
└────────────────┘
(không có viền)
```

#### **Phương án 3: HTML Manual** (Nâng cao)
Trong editor, bạn có thể chèn HTML trực tiếp:
```html
<figure style="text-align: center; margin: 20px 0;">
  <img src="image-url.jpg" alt="Mô tả" style="max-width: 100%; border-radius: 8px;">
  <figcaption style="margin-top: 8px; font-style: italic; color: #666; font-size: 14px;">
    Hình 1: Chú thích hình ảnh
  </figcaption>
</figure>
```

---

## 4. Các tính năng khác

### Formatting cơ bản:
- **B** - Bold (in đậm)
- **I** - Italic (in nghiêng)
- **S** - Strikethrough (gạch ngang)

### Headings:
- **H1** - Heading 1 (tiêu đề lớn nhất)
- **H2** - Heading 2 (tiêu đề phụ)
- **H3** - Heading 3 (tiêu đề nhỏ)

### Lists:
- **• List** - Bullet list (danh sách gạch đầu dòng)
- **1. List** - Ordered list (danh sách đánh số)

### Colors:
- **A** với thanh màu - Đổi màu chữ
- **☰** với thanh màu - Đổi màu nền text

### Tables:
- **📊 Table** - Tạo bảng 3x3
- **Right-click trên cell** - Menu bảng (thêm/xóa dòng, cột, đổi màu, border)

---

## Tips & Tricks

### Mẹo 1: Tạo caption đẹp
```
1. Thêm ảnh
2. Enter → gõ "Hình 1: ..." 
3. Bôi đen → Click I (italic)
4. Giữ nguyên bôi đen → Click ↔ (center)
5. Giữ nguyên bôi đen → Click màu xám từ color picker
```

### Mẹo 2: Table styling
- Sau khi tạo table, right-click vào cell bất kỳ
- Chọn "Remove Borders" để bỏ viền
- Chọn màu nền từ color palette cho header row

### Mẹo 3: Nested lists
```
1. Tạo bullet list
2. Tab → tạo sub-bullet (lùi vào)
3. Shift+Tab → quay lại level trên
```

---

## Keyboard Shortcuts

- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+Shift+X` - Strikethrough
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+K` - Mở link dialog (coming soon)

---

## Yêu cầu thêm tính năng

Nếu cần tính năng Image Caption tích hợp sẵn:
1. Cần extend Image extension của Tiptap
2. Thêm attribute `caption` vào Image node
3. Render caption như `<figcaption>` bên dưới ảnh
4. Thêm input field trong toolbar để edit caption

Hiện tại đang sử dụng phương án thủ công (paragraph + italic + center) là đơn giản và hiệu quả nhất.
