import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import DashboardLayout from "./components/mainViewComponents/DashboardLayout";

import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import MainPage from "./views/MainPage";
import PrintPage from "./views/PrintPage";
import FilePage from "./views/FilePage";
import HistoryPage from "./views/HistoryPage";

import { useEffect } from "react";
import { usePrint } from "./context/PrintContext"; 
import { usePrinter } from "./context/PrinterContext"; 
import { useFile } from "./context/FileContext";
import { useUser } from "./context/UserContext";


const ProtectedRoute = ({ children }) => {
    const { statusLoggedIn } = useAuth();
    const { refreshUser } = useUser();
    const { resetState: resetPrint } = usePrint();
    const { resetState: resetPrinter } = usePrinter();
    const { resetState: resetFile } = useFile();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname != "/print") {
            resetFile();
            resetPrint();
            resetPrinter();
            refreshUser();
        }

    }, [location.pathname])

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

                <Route path="/print" element={
                    <ProtectedRoute>
                        <PrintPage />
                    </ProtectedRoute>
                } />

                <Route path="/files" element={
                    <ProtectedRoute>
                        <FilePage />
                    </ProtectedRoute>
                } />

                <Route path="/history" element={
                    <ProtectedRoute>
                        <HistoryPage />
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
