import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/patient/Dashboard";
import Reports from "./pages/patient/Reports";
import ReportDetails from "./pages/patient/ReportDetails";
import UploadReport from "./components/report/UploadReport";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/patient/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/patient/reports"
                    element={<Reports />}
                />

                <Route
                    path="/patient/reports/:id"
                    element={<ReportDetails />}
                />

                <Route
                    path="/patient/upload-report"
                    element={<UploadReport />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;