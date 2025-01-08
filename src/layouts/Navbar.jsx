
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { logout } from "../reducers/userSlice";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

import CartDetail from "../components/Pagination/CartDetail";
import useDarkMode from "../utils/useDarkMode";

const Navbar = () => {
    const [modalCart, setModalCart] = useState(false);
    const [isDarkMode, toggleDarkMode] = useDarkMode();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userCart = useSelector((state) => state.cart);
    const userLogin = JSON.parse(localStorage.getItem("currentUser")) || null;

    const hdlLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <nav className="flex bg-gray-700 text-white justify-between items-center py-4 px-20">
                <div>
                    <Link to="/">Knacx</Link>
                </div>
                <div className="flex gap-10">
                    <Link to="/shop">สินค้า</Link>
                    {userLogin && userLogin.role === "admin" && (
                        <Link to="/admin-create">จัดการสินค้า</Link>
                    )}
                </div>
                <div className="flex gap-10 items-center">
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
                                            {userCart
                                                ?.find((cart) => cart.userId === userLogin?.id)
                                                ?.totalQuantity || 0}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button onClick={hdlLogout}>ออกจากระบบ</button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center gap-10">
                            <Link to="/register">
                                <button>ลงทะเบียน</button>
                            </Link>
                            <Link to="/login">
                                <button>เข้าสู่ระบบ</button>
                            </Link>
                        </div>
                    )}
                    <div className="form-control flex flex-row items-center gap-1">
                        <label
                            className="label cursor-pointer"
                            aria-label="Toggle Dark Mode"
                            onClick={toggleDarkMode}
                        >
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={isDarkMode}
                                readOnly
                            />
                        </label>
                        <span className="text-xs md:text-sm">
                            {isDarkMode ? (
                                <FaMoon className="w-3 h-3 text-yellow-500" />
                            ) : (
                                <IoSunnyOutline className="w-5 h-5 text-yellow-500" />
                            )}
                        </span>
                    </div>

                </div>

            </nav>
            {modalCart && <CartDetail setModalCart={setModalCart} />}
        </div>
    );
};

export default Navbar;
