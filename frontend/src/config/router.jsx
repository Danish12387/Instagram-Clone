import Home from '@/views/Home';
import EditProfile from '@/views/EditProfile';
import ChatPage from '@/views/ChatPage';
import Login from '@/views/Login';
import MainLayout from '@/views/MainLayout';
import Profile from '@/views/Profile';
import Signup from '@/views/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoutes from '../components/ProtectedRoutes';

const browserRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
        children: [
            {
                path: '/',
                element: <ProtectedRoutes><Home /></ProtectedRoutes>
            },
            {
                path: '/profile/:id',
                element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
            },
            {
                path: '/account/edit',
                element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
            },
            {
                path: '/chat',
                element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
])

const Router = () => {
    return (
        <RouterProvider router={browserRouter} />
    )
}

export default Router;