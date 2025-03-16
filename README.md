# registerExpress

## 📌 متطلبات التشغيل
- **Node.js** مثبت على الجهاز
- **MySQL** مثبت مع قاعدة البيانات مهيأة

## 🚀 خطوات تشغيل المشروع

### 1️⃣ استنساخ المشروع
```sh
git clone https://github.com/RAMADAN-MAHDY/registerExpress.git
cd registerExpress
```

### 2️⃣ تثبيت الحزم المطلوبة
```sh
npm install
```

### 3️⃣ إعداد قاعدة البيانات
- افتح MySQL أو phpMyAdmin ونفذ الكود التالي لإنشاء قاعدة البيانات والجداول:

```sql
CREATE DATABASE IF NOT EXISTS registerExpress;
USE registerExpress;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- قم بتحديث ملف `db.js` ببيانات قاعدة البيانات الخاصة بك.

### 4️⃣ تشغيل السيرفر
```sh
npm run dev
```
🔗 **السيرفر يعمل على:** `http://localhost:3000`

## 🛠️ اختبار الـ API

### 🔹 تسجيل مستخدم جديد
**POST** `/api/auth/register`
```json
{
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "password": "123456"
}
```

### 🔹 تسجيل الدخول
**POST** `/api/auth/login`
```json
{
    "email": "ahmed@example.com",
    "password": "123456"
}
```

