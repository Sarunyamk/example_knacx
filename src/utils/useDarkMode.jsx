import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedMode = localStorage.getItem("darkMode");
        return storedMode === "true"; // อ่านค่าจาก Local Storage
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark"); // เพิ่ม class `dark`
        } else {
            document.body.classList.remove("dark"); // ลบ class `dark`
        }
        localStorage.setItem("darkMode", isDarkMode); // บันทึกสถานะลง Local Storage
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

    return [isDarkMode, toggleDarkMode];
};


export default useDarkMode;
