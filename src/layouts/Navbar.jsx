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
    console.log(userLogin, "user loginn");

    return (
        <div>
            <nav className="flex bg-gray-700 text-white justify-between items-center py-4 px-20">
                <Link to={'/'}>Knacx</Link>
                {
                    userLogin ?
                        <div className="flex gap-10">
                            <h1>Hello User</h1>
                            <button onClick={hdlLogout}>Logout</button>
                        </div>

                        : <div className="flex justify-between items-center gap-10">
                            <Link to={'/register'}><button>Register</button></Link>
                            <Link to={'/login'}><button>Login</button></Link>
                        </div>

                }
            </nav>
        </div>
    )
}
export default Navbar