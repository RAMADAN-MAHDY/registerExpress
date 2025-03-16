import express from "express";
import bcrypt from "bcryptjs";
import connection from "../db.js";

const router = express.Router();

//  تسجيل الدخول
router.post("", async (req, res) => {
    try {
        const { email, password } = req.body;

        //  التحقق من إدخال جميع البيانات المطلوبة
        if (!email || !password) {
            return res.status(400).json({ message: "يرجى إدخال البريد الإلكتروني وكلمة المرور" });
        }

        // 🔍 البحث عن المستخدم في قاعدة البيانات
        const [user] = await connection.promise().query(
            "SELECT id, name, email, password FROM users WHERE email = ?",
            [email]
        );

        if (user.length === 0) {
            return res.status(401).json({ message: "البريد الإلكتروني غير مسجل" });
        }

        const storedUser = user[0];

        //  مقارنة كلمة المرور المدخلة مع المخزنة
        const isMatch = await bcrypt.compare(password, storedUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
        }

        //  إرجاع بيانات المستخدم بدون كلمة المرور
        res.status(200).json({
            message: "تم تسجيل الدخول بنجاح",
            user: {
                id: storedUser.id,
                name: storedUser.name,
                email: storedUser.email
            }
        });
    } catch (error) {
        console.error(" خطأ أثناء تسجيل الدخول:", error);
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
    }
});

export default router;
