import { createSlice } from "@reduxjs/toolkit";
import Joi from "joi";

const storeUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

const userSchemaRegister = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.empty": "กรุณากรอก Email",
        "string.email": "กรุณากรอกอีเมลให้ถูกต้อง",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "กรุณากรอกรหัสผ่าน",
        "string.min": "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    }),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "รหัสผ่านไม่ตรงกัน",
            "string.empty": "กรุณากรอกรหัสผ่านยืนยัน",
        }),
    role: Joi.string().valid("admin", "user").required().messages({
        "string.empty": "กรุณาเลือกสิทธิ์ผู้ใช้",
        "any.only": "สิทธิ์ผู้ใช้ไม่ถูกต้อง",
    }),
});
const userSchemaLogin = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.empty": "กรุณากรอก Email",
        "string.email": "กรุณากรอกอีเมลให้ถูกต้อง",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "กรุณากรอกรหัสผ่าน",
        "string.min": "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    }),

});


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: storeUsers,
        user: currentUser,
        error: null,
    },
    reducers: {
        registerUser: (state, action) => {
            const { error } = userSchemaRegister.validate(action.payload);

            if (error) {
                // หาก Validation ล้มเหลว ให้ตั้งค่า error
                state.error = error.details[0].message;
                return;
            }

            const { email, password, role } = action.payload;
            const userExists = state.users.find((user) => user.email === email);

            if (userExists) {
                state.error = "Email already exists"; // หากอีเมลซ้ำ
                return;
            }
            const newId = state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 1;

            const newUser = { id: newId, email, password, role };
            state.users.push(newUser); // เพิ่มผู้ใช้ใหม่ใน Redux
            localStorage.setItem("users", JSON.stringify(state.users)); // บันทึกผู้ใช้ใน Local Storage
            state.error = null; // ล้างข้อผิดพลาด


        },
        login: (state, action) => {
            const { error } = userSchemaLogin.validate(action.payload);

            if (error) {
                // หาก Validation ล้มเหลว ให้ตั้งค่า error
                state.error = error.details[0].message;
                return;
            }
            const { email, password } = action.payload;
            const foundUser = state.users.find((user) => user.email === email && user.password === password);

            if (foundUser) {
                state.user = foundUser; // อัปเดต Redux State
                localStorage.setItem("currentUser", JSON.stringify(foundUser)); // บันทึกผู้ใช้ที่ล็อกอินใน Local Storage
                state.error = null; // ล้างข้อผิดพลาด

            } else {
                state.error = "Invalid email or password"; // ข้อผิดพลาดหากไม่พบผู้ใช้
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("currentUser"); // ลบผู้ใช้ที่ล็อกอินออกจาก Local Storage

        },
    },

})
export const { registerUser, login, logout } = userSlice.actions;
export default userSlice.reducer