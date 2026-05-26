# QuanLyKhachSan (Hotel Reservation)

Hệ thống quản lý đặt phòng khách sạn gồm **Backend Spring Boot (REST API)** và **Frontend HTML/CSS/JS**.

> Repo này phục vụ mục đích học tập/demo. Khi triển khai thực tế, bạn **không nên commit** thông tin nhạy cảm như mật khẩu DB, JWT secret, file dump dữ liệu thật.

## ✨ Tính năng chính

- Xác thực/đăng nhập, phân quyền theo vai trò (JWT)
- Quản lý người dùng/nhân viên/khách hàng
- Quản lý phòng, loại phòng, dịch vụ
- Đặt phòng (reservation), chi tiết phòng/khách, lịch sử trạng thái
- Hóa đơn (bill) và các báo cáo doanh thu/hiệu suất
- Frontend chạy tĩnh (HTML/JS) kết nối API

## 🧱 Công nghệ

- Java + Spring Boot
- Spring Security + JWT
- Spring Data JPA / Hibernate
- MySQL
- Frontend: HTML/CSS/Vanilla JS
- Maven Wrapper (`mvnw`, `mvnw.cmd`)

## 📁 Cấu trúc thư mục

- `src/main/java/...`: mã nguồn backend
- `src/main/resources/application.yaml`: cấu hình ứng dụng
- `frontend/`: giao diện (static files)
- `*.postman_collection.json`: Postman collections để test API

## ✅ Yêu cầu

- Java (khuyến nghị 17+ nếu project đang dùng Spring Boot 3.x; nếu Spring Boot 2.x thì Java 8/11/17 đều ổn)
- MySQL

## ⚙️ Cấu hình (Quan trọng)

Hiện tại `src/main/resources/application.yaml` có chứa thông tin cấu hình DB và `jwt.secret`.

**Khuyến nghị cho môi trường thật:**

1. Tạo file `src/main/resources/application-local.yaml` (file này đã được `.gitignore` để tránh push secrets)
2. Chạy bằng profile local, hoặc override bằng biến môi trường.

Ví dụ cấu hình local (gợi ý):

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/hotel_reservation_premium
    username: root
    password: <YOUR_PASSWORD>

jwt:
  secret: <YOUR_JWT_SECRET>
```

## ▶️ Chạy Backend

### Cách 1: Maven Wrapper

```powershell
./mvnw spring-boot:run
```

### Cách 2: Build jar

```powershell
./mvnw clean package
java -jar target/*.jar
```

Ứng dụng mặc định:

- Base URL: `http://localhost:8080/hotel_reservation_premium`

## 🖥️ Chạy Frontend

Frontend nằm trong `frontend/` và được cấu hình load từ:

```yaml
spring:
  resources:
    static-locations: classpath:/static/, file:./frontend/
```

Bạn có thể mở trực tiếp `frontend/login.html` bằng trình duyệt để demo,
hoặc truy cập qua backend nếu có mapping.

## 🧪 Test API

- Import các file Postman collections:
  - `Hotel_Reservation_Full_Flow.postman_collection.json`
  - `Hotel_Reservation_JWT_Auth.postman_collection.json`

## 🔐 Lưu ý về dữ liệu nhạy cảm

Trong repo có/đã từng có các file SQL kiểu “reset password / backup user”. Những file dạng:

- `user_backup.sql`
- `update_bcrypt_password.sql`
- `update_correct_password.sql`

**không nên push lên GitHub** (dễ lộ dữ liệu/ý đồ reset mật khẩu). Repo đã được tối ưu `.gitignore` để bỏ qua các file này.

Nếu bạn đã lỡ commit/push thông tin nhạy cảm (DB password, JWT secret), cần:

- Rotate (đổi) password DB/JWT secret
- Và cân nhắc sửa lịch sử git (BFG / git filter-repo) nếu bắt buộc xóa khỏi lịch sử.

## 📄 Tài liệu tham khảo trong repo

- `DEPLOYMENT_CHECKLIST.md`
- `INTEGRATION_GUIDE.md`
- `EMPLOYEE_API_INTEGRATION.md`
- `Danh_sach_API.md`

---

### License

Chưa khai báo.
