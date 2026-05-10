# TASK BOARD

TaskBoard - ứng dụng quản lý công việc nội bộ

## Tech stack
- React 18 
- TypeScript 5 
- Ant Design 5 
- Redux Toolkit 2 
- Tailwind CSS 3

## Các tính năng đã hoàn thiện

### Dashboard
- Hiển thị 4 thẻ thống kê: Tổng task, Todo, In Progress, Done
- Biểu đồ / Thanh Progress thể hiện tỷ lệ trạng thái
- Hiển thị danh sách 5 task tạo gần nhất bằng Tailwind grid

### Quản lý danh sách Task (CRUD)
- Ant Design Table, phân trang 10 items/trang
- Sắp xếp dữ liệu theo Tiêu đề, Hạn chót, Độ ưu tiên
- Form Thêm mới / Chỉnh sửa (Modal) với đầy đủ validation rules
- Tự động điền dữ liệu (Initial values) khi Edit
- Xóa task có Confirm modal và Xóa hàng loạt (Row selection)
- Cập nhật trạng thái nhanh bằng Inline Select ngay trên bảng

### Bộ lọc & Tìm kiếm (Redux Selectors)
- Tìm kiếm theo tiêu đề (Debounce 300ms)
- Lọc nhiều trạng thái cùng lúc (Multi-select)
- Lọc theo độ ưu tiên và khoảng thời hạn (RangePicker)
- Nút Reset bộ lọc
- Toàn bộ logic lọc được thực hiện thông qua `createSelector` trong Redux

### Khác 
-  Persist filter vào URL query params

## Screenshot

> ![Dashboard](./assets/dashboard.png)
> ![Task List](./assets/task-list.png)
> ![Filter Task List](./assets/filter-task-list.png)
> ![Modal Create/Edit](./assets/modal.png)

## Cài đặt
```bash
git clone https://github.com/nvp88nd/fe-test-Nguyen-Van-Phuc.git
```

```bash
npm install
```

## Chạy local
```bash
npm run dev
```
