import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaShoppingCart } from "react-icons/fa";
import { logout } from "../reducers/userSlice";
import { useState } from "react";
import CartDetail from "../components/Pagination/CartDetail";

const Navbar = () => {
    const [modalCart, setModalCart] = useState(false);
    const navigate = useNavigate();

    const userLogin = JSON.parse(localStorage.getItem("currentUser"));
    const dispatch = useDispatch();

    // Parse cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const userCart = cartData.find((cart) => cart.userId === userLogin?.id) || { totalQuantity: 0 };
    const count = userCart.totalQuantity;

    const hdlLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <nav className="flex bg-gray-700 text-white justify-between items-center py-4 px-20">
                <div>
                    <Link to={'/'}>Knacx</Link>
                </div>
                <div className="flex gap-10">
                    <Link to={'/shop'}>สินค้า</Link>
                    {userLogin && userLogin.role === "admin" && <Link to={'/admin-create'}>จัดการสินค้า</Link>}
                </div>
                <div>
                    {userLogin ? (
                        <div className="flex gap-10">
                            {userLogin.role === "admin" ? (
                                <h1>ยินดีต้อนรับ Admin</h1>
                            ) : (
                                <div className="flex gap-10">
                                    <h1>ยินดีต้อนรับ User</h1>
                                    <div className="cursor-pointer flex justify-center items-center relative">
                                        <FaShoppingCart onClick={() => setModalCart(true)} />
                                        <div className="absolute text-sm -top-2 -right-4 w-5 h-5 bg-red-500 rounded-full flex justify-center items-center">
                                            {count}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button onClick={hdlLogout}>ออกจากระบบ</button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center gap-10">
                            <Link to={'/register'}><button>ลงทะเบียน</button></Link>
                            <Link to={'/login'}><button>เข้าสู่ระบบ</button></Link>
                        </div>
                    )}
                </div>
            </nav>
            {modalCart && <CartDetail setModalCart={setModalCart} />}
        </div>
    );
};

export default Navbar;
