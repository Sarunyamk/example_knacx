import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import HomePage from './../layouts/HomePage';
import Register from './../components/users/Register';
import Login from './../components/users/Login';
import Layout from '../layouts/Layout';
import Pagination from '../components/Pagination/Pagination';
import Shop from '../components/admin/shop';

import ProtectedRoute from '../routes/ProtectedRoute';
import NotFound from '../layouts/NotFound';



const pageRouter = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            {
                path: "admin",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <Shop />
                    </ProtectedRoute>
                ),
            },
            { path: "shop", element: <Pagination /> },
        ],
    }, {
        path: "*",
        element: <NotFound />
    }

])

export default function AppRouter() {
    return (
        <div>
            <RouterProvider router={pageRouter} />
        </div>
    )
}