import express from "express";
import bcrypt from 'bcryptjs';
import connection from "../db.js"; 

const router = express.Router();

// 📝 إنشاء مستخدم جديد
router.post("", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ التحقق من إدخال جميع البيانات المطلوبة
        if (!name || !email || !password) {
            return res.status(400).json({ message: "يرجى إدخال جميع البيانات المطلوبة" });
        }

        // 🔍 التأكد من عدم وجود البريد الإلكتروني مسبقًا
        const [existingUser] = await connection.promise().query(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
        }

        // 🔒 تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ إدخال المستخدم الجديد إلى قاعدة البيانات
        await connection.promise().query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
    } catch (error) {
        console.error("❌ خطأ أثناء إنشاء الحساب:", error);
        res.status(500).json({ message: "حدث خطأ أثناء إنشاء الحساب" });
    }
});

export default router;
