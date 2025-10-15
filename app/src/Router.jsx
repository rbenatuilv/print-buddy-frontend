import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import DashboardLayout from "./components/DashboardLayout";

import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import MainPage from "./views/MainPage";


const ProtectedRoute = ({ children }) => {
    const { statusLoggedIn } = useAuth();

    if (statusLoggedIn == "loggedOut") {
        return (
            <Navigate to="/login" replace />    
        )
    }

    return (
        <DashboardLayout>
            { children }
        </DashboardLayout>
    );
}


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />

                <Route path="*" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />
                
            </Routes>
        </BrowserRouter>
    )
}
