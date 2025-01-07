import { createSlice } from "@reduxjs/toolkit";
import Joi from "joi";

const storeUsers = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;

const userSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.empty": "Email is required",
        "string.email": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
    }),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Confirm Password does not match Password",
            "string.empty": "Confirm Password is required",
        }),
    role: Joi.string().valid("admin", "user").required().messages({
        "string.empty": "Role is required",
        "any.only": "Invalid role",
    }),
});


const userSlice = createSlice({
    name: "user",
    initialState: {
        users: storeUsers, // ผู้ใช้ทั้งหมดในระบบ
        user: currentUser, // ผู้ใช้ที่ล็อกอินอยู่
        error: null, // เก็บข้อความแสดงข้อผิดพลาด
    },
    reducers: {
        registerUser: (state, action) => {
            const { error } = userSchema.validate(action.payload);

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

            const newUser = { email, password, role };
            state.users.push(newUser); // เพิ่มผู้ใช้ใหม่ใน Redux
            localStorage.setItem("users", JSON.stringify(state.users)); // บันทึกผู้ใช้ใน Local Storage
            state.error = null; // ล้างข้อผิดพลาด


        },
        login: (state, action) => {
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