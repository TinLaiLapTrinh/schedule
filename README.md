# Lập Lịch Học Tự Động - React.js

## Giới thiệu dự án

Ứng dụng web này giúp người dùng **tính toán và lập lịch học tự động** cho một khóa học.  
Người dùng nhập các thông tin cơ bản, hệ thống sẽ tự động:

- Tạo danh sách **ngày học hợp lệ**.  
- Bỏ qua các ngày lễ cố định và kỳ nghỉ dài hạn.  
- Xác định **ngày bế giảng** cuối cùng.  

**Các thông tin cần nhập:**

- Ngày bắt đầu khóa học.  
- Tổng số buổi học.  
- Ngày học trong tuần (0 = Thứ 2 … 6 = Chủ nhật).  
- Kỳ nghỉ dài hạn (tùy chọn).  
- Các ngày lễ cố định được áp dụng tự động (ví dụ: 1/1, 2/3, 30/4, 1/5, 2/9).

---

## Giao diện (UI)

Giao diện được thiết kế **thân thiện, dễ sử dụng**:

### Form nhập dữ liệu
- **Ngày bắt đầu:** Input date.  
- **Tổng số buổi học:** Input number.  
- **Ngày học trong tuần:** Input text, nhập các số cách nhau bằng khoảng trắng (ví dụ: `1 3`).  
- **Kỳ nghỉ dài hạn:** Input date cho ngày bắt đầu và ngày kết thúc (tùy chọn).  
- **Button “Tính lịch học”** để chạy thuật toán.

### Kết quả hiển thị
- **Ngày bế giảng** cuối cùng.  
- **Danh sách các ngày học hợp lệ**.  
- **Danh sách các ngày trùng nghỉ** (nếu có), hiển thị màu đỏ.

### Thiết kế UI
- Input có placeholder hướng dẫn người dùng.  
- Khoảng cách hợp lý giữa các trường.  
- Button nổi bật, dễ thao tác.  
- Font chữ dễ đọc, tổng thể gọn gàng, dễ theo dõi.

---

## Cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone <URL_REPO_CUA_BAN>
cd react-schedule
```
### 2. Chạy dự án
```bash
npm install
npm start
```
