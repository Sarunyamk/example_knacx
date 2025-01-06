import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import HomePage from './../layouts/HomePage';
import Register from './../components/users/Register';
import Login from './../components/users/Login';


const pageRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
        ]
    }
])

export default function AppRouter() {
    return (
        <div>
            <RouterProvider router={pageRouter} />
        </div>
    )
}