import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userSlice";

const Navbar = () => {

    const userLogin = JSON.parse(localStorage.getItem("currentUser"));
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const hdlLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div>
            <nav className="flex bg-gray-700 text-white justify-between items-center py-4 px-20">
                <div>
                    <Link to={'/'}>Knacx</Link>
                </div>
                <div>
                    <Link to={'/shop'}>Shop</Link>
                </div>
                <div>
                    {
                        userLogin ?
                            <div className="flex gap-10">
                                {
                                    userLogin.role === "admin" ?
                                        <h1>Hello Admin</h1>
                                        :
                                        <h1>Hello User</h1>
                                }
                                <button onClick={hdlLogout}>Logout</button>
                            </div>

                            : <div className="flex justify-between items-center gap-10">
                                <Link to={'/register'}><button>Register</button></Link>
                                <Link to={'/login'}><button>Login</button></Link>
                            </div>

                    }
                </div>
            </nav>
        </div>
    )
}
export default Navbar