import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DetailStudentPage from "./pages/DetailStudentPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const App = () => {
const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            )
        },
        {
            path: '/detail/:id',
            element: (
                <ProtectedRoute>
                    <DetailStudentPage/>
                </ProtectedRoute>
            )
        },
        {
            path: '/login',
            element: <LoginPage/>
        }
    ])
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
