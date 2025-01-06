import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav className="flex bg-gray-700 justify-between items-center py-4 px-20">
                <Link to={'/'}><a>Knacx</a></Link>
                <div className="flex justify-between items-center gap-10">
                    <Link to={'/register'}><button>Register</button></Link>
                    <Link to={'/login'}><button>Login</button></Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar