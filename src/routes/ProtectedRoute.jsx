import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    // const user = useSelector((state) => state.userStore.user); // ดึงข้อมูลผู้ใช้จาก Redux
    const userLogin = JSON.parse(localStorage.getItem("currentUser"));

    if (!userLogin || !allowedRoles.includes(userLogin.role)) {
        return <Navigate to="/login" replace />;
    }

    return children; // แสดงหน้าเนื้อหาเมื่อ role ตรง
};

export default ProtectedRoute;
