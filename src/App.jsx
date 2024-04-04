import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import React, {Suspense, useEffect} from "react";
import './index.css'
import LoadinMountComponent from "./components/LoadinMountComponent.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import useStudentsStore from "./store/StudentsStore.js";

const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const DetailStudentPage = React.lazy(() => import('./pages/DetailStudentPage.jsx'));
const LoginPage = React.lazy(() => import('./pages/LoginPage.jsx'));

const App = () => {
    const {getStudents} = useStudentsStore()
    useEffect(() => {
        getStudents()
    }, [])
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<LoadinMountComponent/>}>
                        <HomePage />
                    </Suspense>
                </ProtectedRoute>
            )
        },
        {
            path: '/detail/:id',
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<LoadinMountComponent/>}>
                        <DetailStudentPage/>
                    </Suspense>
                </ProtectedRoute>
            )
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<LoadinMountComponent/>}>
                    <LoginPage/>
                </Suspense>
            )
        },
        {
            path: '*',
            element: <PageNotFound/>
        }
    ])
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default App;