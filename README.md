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
- `pom.xml`: cấu hình Maven

## ✅ Yêu cầu

- Java (khuyến nghị 17+ nếu project đang dùng Spring Boot 3.x; nếu Spring Boot 2.x thì Java 8/11/17 đều ổn)
- MySQL

## ⚙️ Cấu hình (Quan trọng)

Vì repo là **public**, `src/main/resources/application.yaml` được cấu hình theo kiểu **template** và KHÔNG hardcode secrets.
Bạn cần cung cấp cấu hình thật bằng 1 trong 2 cách dưới.

**Khuyến nghị cho môi trường thật:**

### Cách A (khuyến nghị): tạo file local (không commit)

1. Copy `src/main/resources/application-local.yaml.example` thành `src/main/resources/application-local.yaml`
2. Điền `spring.datasource.password` và `jwt.secret`
3. Chạy với profile `local`

### Cách B: dùng biến môi trường

Bạn có thể set các biến môi trường sau:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION_MS`

> Lưu ý: Nếu bạn chạy mà không set `DB_PASSWORD` / `JWT_SECRET`, app có thể fail kết nối DB hoặc fail validate JWT.

## ▶️ Chạy Backend

### Cách 1: Maven Wrapper

```powershell
./mvnw spring-boot:run
```

Chạy với profile local:

```powershell
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
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

Bạn có thể dùng Postman/Insomnia tùy ý để test API. Repo không giữ collection để tránh lộ dữ liệu demo.

## 📄 Ghi chú

- Các file tài liệu nội bộ/nháp đã được gỡ khỏi GitHub để repo gọn và chuyên nghiệp hơn.

---

### License

Chưa khai báo.
