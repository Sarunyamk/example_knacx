import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <div className="max-w-lg p-8 bg-white shadow-xl rounded-lg">
                <h1 className="text-6xl font-bold text-blue-500">404</h1>
                <p className="mt-4 text-xl font-medium text-gray-700">
                    Oops! The page you're looking for isn't here.
                </p>
                <p className="mt-2 text-gray-500">
                    It might have been moved or deleted. Go back to the homepage to continue browsing.
                </p>

                <Link to="/">
                    <button className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Back to Homepage
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default NotFound