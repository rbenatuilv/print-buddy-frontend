import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import StartPage from "./views/StartPage";
import RegisterPage from "./views/RegisterPage";
import MainPage from "./views/MainPage";


const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
            <Navigate to="/login" replace />    
        )
    }

    return children;
}


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<StartPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />
                
            </Routes>
        </BrowserRouter>
    )
}
